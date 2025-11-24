import { Response } from "express";
import PDFDocument from "pdfkit";
import { AppDataSource } from "../../DAL/ormconfig";
import { Presenca } from "../../DAL/Models/Presenca";
import { Funcionario } from "../../DAL/Models/Funcionario";
import { EventoTreinamento } from "../../DAL/Models/EventoTreinamento";
import { Lembrete } from "../../DAL/Models/Lembrete";
import { Cliente } from "../../DAL/Models/Cliente";
import { Vendas } from "../../DAL/Models/Vendas";
import { FunilVendas } from "../../DAL/Models/FunilVendas";
import { ChecklistAgregado } from "../../DAL/Models/cadastroAgregado";
import { ChecklistFuncionario } from "../../DAL/Models/ChecklistFuncionario";

type PDFDocInstance = InstanceType<typeof PDFDocument>;

type RenderItemFn = (doc: PDFDocInstance, item: any) => void;

// ========================
// Função genérica para gerar PDF
// ========================
function gerarPDFGenerico(res: Response, titulo: string, dados: any[], renderItem: RenderItemFn) {
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${titulo}.pdf`);
    doc.pipe(res);

    doc.fontSize(18).text(titulo, { align: "center" });
    doc.moveDown();

    dados.forEach(item => renderItem(doc, item));

    doc.end();
}

// ========================
// Relatório Avaliação de Eventos
// ========================
export const relatorioPresencaPorEvento = async (res: Response, params: any) => {
    const presencaRepo = AppDataSource.getRepository(Presenca);

    const presencas = await presencaRepo
        .createQueryBuilder("p")
        .leftJoinAndSelect("p.funcionarioConvidado", "fc")
        .leftJoinAndSelect("fc.funcionario", "f") // join com o funcionário real
        .leftJoinAndSelect("fc.evento", "e")
        .where(params.evento_ID ? "e.evento_ID = :eventoID" : "1=1", { eventoID: params.evento_ID })
        .orderBy("f.nome", "ASC") // agora ordena pelo nome real
        .getMany();

    const eventosMap: Record<number, any> = {};
    presencas.forEach(p => {
        const eventoID = p.funcionarioConvidado.evento.evento_ID;
        if (!eventosMap[eventoID]) {
            eventosMap[eventoID] = {
                evento_ID: eventoID,
                nome_evento: p.funcionarioConvidado.evento.titulo || `Evento ${eventoID}`,
                presencas: [],
            };
        }
        eventosMap[eventoID].presencas.push(p);
    });

    const eventos = Object.values(eventosMap);

    gerarPDFGenerico(res, "Avaliação de Eventos", eventos, (doc, evento) => {
        doc.fontSize(14).text(`Evento: ${evento.nome_evento} (ID: ${evento.evento_ID})`, { underline: true });
        doc.moveDown(0.5);
        evento.presencas.forEach((p: any) => {
            const status = p.presente ? "Presente" : "Ausente";
            doc.fontSize(12).text(`Funcionário: ${p.funcionarioConvidado.funcionario.nome}`); // pega do join
            doc.text(`Status: ${status}`);
            if (p.data_termino) doc.text(`Data Término: ${p.data_termino.toLocaleString()}`);
            if (p.link_feedback) doc.text(`Feedback: ${p.link_feedback}`);
            doc.moveDown(0.5);
        });
        doc.moveDown();
    });
};


// ========================
// Relatório Geral de Funcionários
// ========================
export const relatorioFuncionarios = async (res: Response, params: any) => {
    const funcionarioRepo = AppDataSource.getRepository(Funcionario);

    const funcionarios = await funcionarioRepo
        .createQueryBuilder("f")
        .leftJoinAndSelect("f.perfis", "p")
        .leftJoinAndSelect("f.gerente_ID", "g")
        .orderBy("f.nome", "ASC")
        .getMany();

    gerarPDFGenerico(res, "Relatório Geral de Funcionários", funcionarios, (doc, f) => {
        doc.fontSize(14).text(`Nome: ${f.nome}`, { underline: true });
        doc.fontSize(12)
            .text(`Cargo: ${f.cargo}`)
            .text(`Email: ${f.email}`)
            .text(`Telefone: ${f.numero_telefone}`)
            .text(`Localização: ${f.localizacao_funcionario}`)
            .text(`Gênero: ${f.genero}`);

        if (f.gerente_ID) {
            doc.text(`Gerente: ${f.gerente_ID.nome}`);
        }

        if (f.perfis && f.perfis.length > 0) {
            const nomesPerfis = f.perfis.map((p: any) => p.nome).join(", ");
            doc.text(`Perfis: ${nomesPerfis}`);
        }

        doc.moveDown();
    });
};

export const relatorioEventos = async (res: Response, params: any) => {
    const eventoRepo = AppDataSource.getRepository(EventoTreinamento);

    const eventos = await eventoRepo
        .createQueryBuilder("e")
        .leftJoinAndSelect("e.organizador_ID", "org") // Organizador
        .leftJoinAndSelect("e.convidados", "c")      // Convidados
        .leftJoinAndSelect("c.funcionario", "f")     // Dados do funcionário convidado
        .orderBy("e.dataHora", "ASC")
        .getMany();

    gerarPDFGenerico(res, "Relatório de Eventos", eventos, (doc, e) => {
        // Proteção contra campos undefined
        const organizadorNome = e.organizador_ID?.nome || "Não informado";

        // Cabeçalho do evento
        doc.fontSize(14).text(`Evento: ${e.titulo} (ID: ${e.evento_ID})`, { underline: true });
        doc.fontSize(12)
            .text(`Descrição: ${e.descricao || "Sem descrição"}`)
            .text(`Data/Hora: ${e.dataHora.toLocaleString()}`)
            .text(`Duração: ${e.duracao_horas} horas`)
            .text(`Status: ${e.status}`)
            .text(`Organizador: ${organizadorNome}`)
            .text(`Link do evento: ${e.evento_link || "Não informado"}`);

        // Lista de convidados
        if (e.convidados && e.convidados.length > 0) {
            doc.moveDown(0.2);
            doc.text("Convidados:", { underline: true });
            e.convidados.forEach((c, i) => {
                const nomeFuncionario = c.funcionario?.nome || "Não informado";
                const statusPresenca = c.presenca ? "Presente" : "Ausente";
                doc.text(` ${i + 1}. ${nomeFuncionario} - ${statusPresenca}`);
            });
        }

        doc.moveDown(1);
    });
};


export const relatorioLocalizacaoFuncionarios = async (res: Response, params: any) => {
    const funcionarioRepo = AppDataSource.getRepository(Funcionario);

    const funcionarios = await funcionarioRepo
        .createQueryBuilder("f")
        .orderBy("f.nome", "ASC")
        .getMany();

    gerarPDFGenerico(res, "Localização dos Funcionários", funcionarios, (doc, f) => {
        doc.fontSize(14).text(`Nome: ${f.nome}`, { underline: true });
        doc.fontSize(12).text(`Localização: ${f.localizacao_funcionario}`);
        doc.moveDown();
    });
};

export const relatorioCalendario = async (res: Response, params: any) => {
    const lembreteRepo = AppDataSource.getRepository(Lembrete);

    const lembretes = await lembreteRepo
        .createQueryBuilder("l")
        .orderBy("l.dataHora", "ASC")
        .getMany();

    // Agrupar por ano, mês e semana
    const calendarioMap: Record<string, any[]> = {};

    lembretes.forEach(l => {
        const data = new Date(l.dataHora);
        const ano = data.getFullYear();
        const mes = data.getMonth() + 1; // Janeiro = 0
        const semana = getWeekNumber(data); // função auxiliar para número da semana

        const chave = `Ano ${ano} - Mês ${mes} - Semana ${semana}`;
        if (!calendarioMap[chave]) {
            calendarioMap[chave] = [];
        }
        calendarioMap[chave].push(l);
    });

    const agrupados = Object.entries(calendarioMap).map(([periodo, items]) => ({
        periodo,
        lembretes: items,
    }));

    gerarPDFGenerico(res, "Relatório de Calendário", agrupados, (doc, grupo) => {
        doc.fontSize(14).text(grupo.periodo, { underline: true });
        doc.moveDown(0.2);
        grupo.lembretes.forEach((l: any) => {
            doc.fontSize(12)
                .text(`Título: ${l.titulo}`)
                .text(`Email: ${l.email}`)
                .text(`Categoria: ${l.categoria}`)
                .text(`Data/Hora: ${l.dataHora.toLocaleString()}`);
            doc.moveDown(0.5);
        });
        doc.moveDown();
    });
};

// ===== Função auxiliar para calcular número da semana do ano =====
function getWeekNumber(d: Date): number {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export const relatorioDashboardAdministrativo = async (res: Response, params: any) => {
    const funcionarioRepo = AppDataSource.getRepository(Funcionario);
    const eventoRepo = AppDataSource.getRepository(EventoTreinamento);
    const lembreteRepo = AppDataSource.getRepository(Lembrete);
    const presencaRepo = AppDataSource.getRepository(Presenca);

    // Buscar últimos registros (limitando)
    const funcionarios = await funcionarioRepo
        .createQueryBuilder("f")
        .orderBy("f.funcionario_ID", "DESC")
        .limit(10)
        .getMany();

    const eventos = await eventoRepo
        .createQueryBuilder("e")
        .orderBy("e.dataHora", "DESC")
        .limit(10)
        .getMany();

    const lembretes = await lembreteRepo
        .createQueryBuilder("l")
        .orderBy("l.dataHora", "DESC")
        .limit(10)
        .getMany();

    const presencas = await presencaRepo
        .createQueryBuilder("p")
        .leftJoinAndSelect("p.funcionarioConvidado", "fc")
        .orderBy("p.presenca_ID", "DESC")
        .limit(10)
        .getMany();

    const dashboardData = [
        { titulo: "Últimos Funcionários", dados: funcionarios },
        { titulo: "Últimos Eventos", dados: eventos },
        { titulo: "Últimos Lembretes", dados: lembretes },
        { titulo: "Últimas Presenças", dados: presencas },
    ];

    gerarPDFGenerico(res, "Dashboard Administrativo", dashboardData, (doc, item) => {
        doc.fontSize(14).text(item.titulo, { underline: true });
        doc.moveDown(0.2);

        item.dados.forEach((d: any) => {
            if (d.nome) doc.text(`Funcionário: ${d.nome}`);
            else if (d.titulo && d.dataHora) doc.text(`Evento/Lembrete: ${d.titulo} (${d.dataHora.toLocaleString()})`);
            else if (d.presente !== undefined && d.funcionarioConvidado) {
                doc.text(`Presença: ${d.funcionarioConvidado.nome} - ${d.presente ? "Presente" : "Ausente"}`);
            }
            doc.moveDown(0.2);
        });

        doc.moveDown();
    });
};

export const relatorioFunilVendas = async (res: Response, params: any) => {
    const clienteRepo = AppDataSource.getRepository(Cliente);

    // Buscar clientes com suas movimentações do funil
    const clientes = await clienteRepo
        .createQueryBuilder("c")
        .leftJoinAndSelect("c.funil", "f")
        .leftJoinAndSelect("c.historico", "h")
        .orderBy("c.nome", "ASC")
        .getMany();

    // Organizar os dados: cada cliente com o número de movimentações
    const dados = clientes.map(c => ({
        cliente: c.nome,
        funil: c.funil?.estagio_nome || "Não definido",
        movimentacoes: c.historico?.length || 0,
    }));

    gerarPDFGenerico(res, "Relatório Funil de Vendas", dados, (doc, item) => {
        doc.fontSize(12).text(`Cliente: ${item.cliente}`);
        doc.text(`Estágio do Funil: ${item.funil}`);
        doc.text(`Movimentações: ${item.movimentacoes}`);
        doc.moveDown();
    });
};

export const relatorioFuncionariosInteracoes = async (res: Response, params: any) => {
    const funcionarioRepo = AppDataSource.getRepository(Funcionario);

    // Buscar todos os funcionários com as interações
    const funcionarios = await funcionarioRepo
        .createQueryBuilder("f")
        .leftJoinAndSelect("f.interacoes", "i")
        .orderBy("f.nome", "ASC")
        .getMany();

    // Organizar dados: funcionário e número de interações
    const dados = funcionarios.map(f => ({
        nome: f.nome,
        cargo: f.cargo,
        email: f.email,
        numeroInteracoes: f.interacoes?.length || 0,
    }));

    gerarPDFGenerico(res, "Relatório Funcionários - Interações", dados, (doc, item) => {
        doc.fontSize(12).text(`Funcionário: ${item.nome}`);
        doc.text(`Cargo: ${item.cargo}`);
        doc.text(`Email: ${item.email}`);
        doc.text(`Número de Interações: ${item.numeroInteracoes}`);
        doc.moveDown();
    });
};

export const relatorioDesempenhoVendedores = async (res: Response, params: any) => {
    const funcionarioRepo = AppDataSource.getRepository(Funcionario);

    // Buscar vendedores com clientes e seus estágios no funil
    const vendedores = await funcionarioRepo
        .createQueryBuilder("f")
        .leftJoinAndSelect("f.clientes", "c")
        .leftJoinAndSelect("c.funil", "funil")
        .orderBy("f.nome", "ASC")
        .getMany();

    // Organizar dados: cada vendedor com os clientes e estágio atual
    const dados = vendedores.map(v => ({
        nome: v.nome,
        cargo: v.cargo,
        email: v.email,
        clientes: v.clientes?.map(c => ({
            nomeCliente: c.nome,
            estagioFunil: c.funil?.estagio_nome || "Não definido",
        })) || [],
    }));

    gerarPDFGenerico(res, "Desempenho dos Vendedores", dados, (doc, vendedor) => {
        doc.fontSize(14).text(`Vendedor: ${vendedor.nome}`, { underline: true });
        doc.text(`Cargo: ${vendedor.cargo}`);
        doc.text(`Email: ${vendedor.email}`);
        doc.moveDown(0.2);

        if (vendedor.clientes.length > 0) {
            vendedor.clientes.forEach((c: any) => {
                doc.fontSize(12).text(`Cliente: ${c.nomeCliente}`);
                doc.text(`Estágio do Funil: ${c.estagioFunil}`);
                doc.moveDown(0.2);
            });
        } else {
            doc.text("Nenhum cliente atribuído");
        }

        doc.moveDown();
    });
};

export const relatorioGestaoVendas = async (res: Response, params: any) => {
    const vendasRepo = AppDataSource.getRepository(Vendas);

    // Buscar vendas com cliente e funcionário responsável
    const vendas = await vendasRepo
        .createQueryBuilder("v")
        .leftJoinAndSelect("v.cliente", "c")
        .leftJoinAndSelect("v.funcionario", "f")
        .orderBy("v.data_venda", "DESC")
        .getMany();

    // Organizar dados para PDF
    const dados = vendas.map(v => ({
        funcionario: v.funcionario.nome,
        cliente: v.cliente.nome,
        dataVenda: v.data_venda,
        valorTotal: v.valor_total,
        status: v.status,
    }));

    gerarPDFGenerico(res, "Gestão de Vendas", dados, (doc, item) => {
        doc.fontSize(12).text(`Funcionário: ${item.funcionario}`);
        doc.text(`Cliente: ${item.cliente}`);
        doc.text(`Data da Venda: ${item.dataVenda.toLocaleString()}`);
        doc.text(`Valor Total: R$ ${item.valorTotal}`);
        doc.text(`Status: ${item.status}`);
        doc.moveDown();
    });
};

export const relatorioAgendamentos = async (res: Response, params: any) => {
    const vendasRepo = AppDataSource.getRepository(Vendas);

    // Buscar apenas vendas com status pendente
    const vendasPendentes = await vendasRepo
        .createQueryBuilder("v")
        .leftJoinAndSelect("v.cliente", "c")
        .leftJoinAndSelect("v.funcionario", "f")
        .where("v.status = :status", { status: "pendente" })
        .orderBy("v.data_venda", "ASC")
        .getMany();

    // Organizar dados para o PDF
    const dados = vendasPendentes.map(v => ({
        funcionario: v.funcionario.nome,
        cliente: v.cliente.nome,
        dataVenda: v.data_venda,
        valorTotal: v.valor_total,
    }));

    gerarPDFGenerico(res, "Agendamentos Pendentes", dados, (doc, item) => {
        doc.fontSize(12).text(`Funcionário: ${item.funcionario}`);
        doc.text(`Cliente: ${item.cliente}`);
        doc.text(`Data da Venda: ${item.dataVenda.toLocaleString()}`);
        doc.text(`Valor: R$ ${item.valorTotal}`);
        doc.moveDown();
    });
};

export const relatorioDashboardComercial = async (res: Response, params: any) => {
    const funcionarioRepo = AppDataSource.getRepository(Funcionario);
    const funilRepo = AppDataSource.getRepository(FunilVendas);

    // Buscar vendedores
    const vendedores = await funcionarioRepo
        .createQueryBuilder("f")
        .leftJoinAndSelect("f.clientes", "c")
        .leftJoinAndSelect("f.vendas", "v")
        .orderBy("f.nome", "ASC")
        .getMany();

    // Buscar funil resumido
    const funil = await funilRepo.find({ relations: ["clientes"] });

    // Preparar dados resumidos
    const dados = vendedores.map(v => {
        const vendasPendentes = v.vendas?.filter(venda => venda.status === "pendente").length || 0;
        return {
            nome: v.nome,
            totalClientes: v.clientes?.length || 0,
            totalVendas: v.vendas?.length || 0,
            vendasPendentes,
        };
    });

    gerarPDFGenerico(res, "Dashboard Comercial", dados, (doc, item) => {
        doc.fontSize(14).text(`Vendedor: ${item.nome}`, { underline: true });
        doc.fontSize(12).text(`Total de Clientes: ${item.totalClientes}`);
        doc.text(`Total de Vendas: ${item.totalVendas}`);
        doc.text(`Vendas Pendentes: ${item.vendasPendentes}`);
        doc.moveDown();
        doc.addPage();
        doc.fontSize(16).text("Resumo do Funil de Vendas", { align: "center" });
        funil.forEach(f => {
             doc.fontSize(12).text(`Estágio: ${f.estagio_nome} - Clientes: ${f.clientes?.length || 0}`);
        });
    });

};

function renderJSON(doc: any, obj: any, indent = 0) {
  const prefix = " ".repeat(indent);
  for (const key in obj) {
    const value = obj[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      doc.text(`${prefix}${key}:`);
      renderJSON(doc, value, indent + 2); // recursivo
    } else {
      doc.text(`${prefix}${key}: ${value}`);
    }
  }
}

export const relatorioFormulariosAgregados = async (res: Response, params: any) => {
  const agreRepo = AppDataSource.getRepository(ChecklistAgregado);

  const agregados = await agreRepo
      .createQueryBuilder("a")
      .orderBy("a.check_agre_ID", "DESC")
      .getMany();

  const dados = agregados.map(a => ({
      tipo: a.tipo,
      respostas: a.respostas,
      imagem: a.pathImg,
      categoria: "Agregado"
  }));

  gerarPDFGenerico(res, "Respostas de Formulários - Agregados", dados, (doc, item) => {
      doc.fontSize(12).text(`Categoria: ${item.categoria}`);
      doc.text(`Tipo: ${item.tipo}`);
      renderJSON(doc, item.respostas, 2);
      if (item.imagem) doc.text(`Imagem: ${item.imagem}`);
      doc.moveDown();
  });
};


export const relatorioFormulariosFuncionarios = async (res: Response, params: any) => {
  const funcRepo = AppDataSource.getRepository(ChecklistFuncionario);

  const funcionarios = await funcRepo
      .createQueryBuilder("f")
      .orderBy("f.check_func_ID", "DESC")
      .getMany();

  const dados = funcionarios.map(f => ({
      tipo: f.tipo,
      respostas: f.respostas,
      imagem: f.pathImg,
      categoria: "Funcionário"
  }));

  gerarPDFGenerico(res, "Respostas de Formulários - Funcionários", dados, (doc, item) => {
      doc.fontSize(12).text(`Categoria: ${item.categoria}`);
      doc.text(`Tipo: ${item.tipo}`);
      renderJSON(doc, item.respostas, 2); // renderiza JSON dinamicamente
      if (item.imagem) doc.text(`Imagem: ${item.imagem}`);
      doc.moveDown();
  });
};

export const dashboardOperacional = async (res: Response, params: any) => {
  const funcRepo = AppDataSource.getRepository(ChecklistFuncionario);
  const agreRepo = AppDataSource.getRepository(ChecklistAgregado);

  // Busca todos
  const totalFuncionarios = await funcRepo.count();
  const totalAgregados = await agreRepo.count();

  // Dados resumidos para PDF
  const dados = [
    { categoria: "Funcionário", total: totalFuncionarios },
    { categoria: "Agregado", total: totalAgregados }
  ];

  gerarPDFGenerico(res, "Dashboard Operacional", dados, (doc, item) => {
    doc.fontSize(14).text(`Categoria: ${item.categoria}`);
    doc.fontSize(12).text(`Total de formulários: ${item.total}`);
    doc.moveDown();
  });
};