import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { ChecklistAgregado } from "../../DAL/Models/cadastroAgregado";
import { EmailCadastroService } from "./emailAgregadoService"; // Importar o serviço de email

export class ChecklistService {
  private checklistRepo: Repository<ChecklistAgregado>;
  private emailService: EmailCadastroService;

  constructor() {
    this.checklistRepo = AppDataSource.getRepository(ChecklistAgregado);
    this.emailService = new EmailCadastroService(); // Instanciar o serviço de email
  }

  async createChecklist(tipo: string, respostas: any, path_img: string | null) {
    if (!tipo || !respostas) throw new Error("Tipo e respostas são obrigatórios.");

    const checklist = new ChecklistAgregado();
    checklist.tipo = tipo;
    checklist.respostas = respostas;
    
    if (path_img !== null) {
      checklist.pathImg = path_img;
    }

    // Salvar no banco primeiro
    const resultado = await this.checklistRepo.save(checklist);

    // Enviar email em segundo plano (não bloqueia a resposta)
    this.enviarEmailEmSegundoPlano(respostas);

    return resultado;
  }

  private async enviarEmailEmSegundoPlano(respostas: any) {
    try {
      // Verificar se tem email para enviar
      if (respostas.emailMotorista && respostas.emailMotorista.trim() !== '') {
        console.log(`📨 Tentando enviar email para: ${respostas.emailMotorista}`);
        
        // Usar o serviço de email existente
        const resultadoEmail = await this.emailService.enviarEmailCadastroAgregado(respostas);
        
        if (resultadoEmail.success) {
          console.log('✅ Email enviado com sucesso para:', respostas.emailMotorista);
        } else {
          console.log('⚠️ Email não enviado:', resultadoEmail.message);
        }
      } else {
        console.log('ℹ️  Nenhum email informado para envio');
      }
    } catch (error) {
      // Não lançar erro para não afetar o cadastro principal
      console.error('❌ Erro ao enviar email em segundo plano:', error);
    }
  }

  async getChecklists() {
    return await this.checklistRepo.find({
      order: { checkFuncID: "DESC" }
    });
  }

  async getChecklistsByTipo(tipo: string) {
    return await this.checklistRepo.find({
      where: { tipo },
      order: { checkFuncID: "DESC" }
    });
  }
}