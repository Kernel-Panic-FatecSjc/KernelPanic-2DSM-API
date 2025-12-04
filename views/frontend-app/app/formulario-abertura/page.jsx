'use client';
import React, { useState } from 'react';
import styles from './App.module.css';
import ProtectRoute from '../../components/ProtectRoute';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    qmPreenchendo: '',
    dataAberturaEmpresa: '',
    abriuEmpresa: false,
    abriuPortaoSocial: false,
    abriuPortaRolante: false,
    desbloqueouAlarme: false,
    apagouLuzesArmazem: false,
    acendeuLuzesArmazem: false,
    acendeuLuzesOperacional: false,
    ligouArCondicionado: false,
    ligouTVCameras: false,
    ligouTVDashBoard: false,
    coletouChavesChaveiro: false,
    abriuPortaBanheiro: false,
    removeuCadeadoPortao1: false,
    removeuCadeadoPortao2: false,
    colocouConeEstacionamentoPCD: false,
    ligouTomadaTirouPlasticoBebedouro: false,
    colocouTapetesDevidosLugares: false,
    fezCafe: false,
    observacao: '',
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

    const handleSubmit = async (event) => {
      event.preventDefault();

      const dadosParaEnviar = {
      tipo: "abertura",
      respostas: { ...form },
      path_img: null,
      };
      const apiUrl = 'http://52.72.66.96:5000/';
      try {
      const response = await fetch(`${apiUrl}/checklist/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar),
      });

      const data = await response.json();
      console.log('✅ Resposta do servidor:', data);

      alert("Checklist enviado com sucesso!");
      setForm({
        qmPreenchendo: '',
        dataAberturaEmpresa: '',
        abriuEmpresa: false,
        abriuPortaoSocial: false,
        abriuPortaRolante: false,
        desbloqueouAlarme: false,
        apagouLuzesArmazem: false,
        acendeuLuzesArmazem: false,
        acendeuLuzesOperacional: false,
        ligouArCondicionado: false,
        ligouTVCameras: false,
        ligouTVDashBoard: false,
        coletouChavesChaveiro: false,
        abriuPortaBanheiro: false,
        removeuCadeadoPortao1: false,
        removeuCadeadoPortao2: false,
        colocouConeEstacionamentoPCD: false,
        ligouTomadaTirouPlasticoBebedouro: false,
        colocouTapetesDevidosLugares: false,
        fezCafe: false,
        observacao: '',
      });

      } catch (error) {
        console.error('❌ Erro ao enviar checklist:', error);
        alert("Erro ao enviar, tente novamente");
        }
      };

  return (
    <ProtectRoute>
    <div className={styles.container}>
      <button className={styles.buttonvoltar} onClick={() => router.back()}>
        ← Voltar
      </button>
      <h2>Formulário de abertura</h2>
      <p>

        Esse CHECK LIST tem a finalidade de registrar os procedimentos de ABERTURA da
        empresa NEWE LOG para garantir a perfeita execução. 
        <br /><br />
        Atenção: Este checklist contempla os pontos essenciais da operação. No entanto,
        situações excepcionais ou imprevistas devem ser conduzidas com base no bom senso,
        zelo pelo patrimônio da empresa e comunicação imediata com a liderança. O não
        cumprimento de ações que comprometam a segurança, o funcionamento de
        equipamentos ou a integridade da operação poderá ser passível de advertência,
        mesmo que não descritas previamente neste documento.
        <br /><br />
        Quando você enviar este formulário, o proprietário verá seu nome e
        endereço de email.
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Quem está preenchendo?</label>
          <input
            className={styles.input1}
            type="text"
            id="qmPreenchendo"
            name="qmPreenchendo"
            value={form.qmPreenchendo}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Data de abertura da empresa?</label>
          <input
            className={styles.input2}
            type="date"
            id="dataAberturaEmpresa"
            name="dataAberturaEmpresa"
            value={form.dataAberturaEmpresa}
            onChange={handleChange}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Abriu cadeado das correntes? (FRENTE DA EMPRESA)</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="abriuEmpresa" name="abriuEmpresa" checked={form.abriuEmpresa} onChange={handleChange} />
            <label htmlFor="abriuEmpresa">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Abriu o portão? (SOCIAL)</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="abriuPortaoSocial" name="abriuPortaoSocial" checked={form.abriuPortaoSocial} onChange={handleChange} />
            <label htmlFor="abriuPortaoSocial">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Abriu porta rolante de ferro? (ARMAZÉM)</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="abriuPortaRolante" name="abriuPortaRolante" checked={form.abriuPortaRolante} onChange={handleChange} />
            <label htmlFor="abriuPortaRolante">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Desbloqueou o alarme?</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="desbloqueouAlarme" name="desbloqueouAlarme" checked={form.desbloqueouAlarme} onChange={handleChange} />
            <label htmlFor="desbloqueouAlarme">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Apagou luzes? (ARMAZÉM)</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="apagouLuzesArmazem" name="apagouLuzesArmazem" checked={form.apagouLuzesArmazem} onChange={handleChange} />
            <label htmlFor="apagouLuzesArmazem">Sim</label>
          </div>
        </div>

        {/* CAMPO ADICIONADO - Acendeu luzes (ARMAZÉM) */}
        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Acendeu luzes? (ARMAZÉM)</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="acendeuLuzesArmazem" name="acendeuLuzesArmazem" checked={form.acendeuLuzesArmazem} onChange={handleChange} />
            <label htmlFor="acendeuLuzesArmazem">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Acendeu luzes? (OPERACIONAL)</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="acendeuLuzesOperacional" name="acendeuLuzesOperacional" checked={form.acendeuLuzesOperacional} onChange={handleChange} />
            <label htmlFor="acendeuLuzesOperacional">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Ligou ar condicionado?</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="ligouArCondicionado" name="ligouArCondicionado" checked={form.ligouArCondicionado} onChange={handleChange} />
            <label htmlFor="ligouArCondicionado">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Ligou TV (CAMERAS)?</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="ligouTVCameras" name="ligouTVCameras" checked={form.ligouTVCameras} onChange={handleChange} />
            <label htmlFor="ligouTVCameras">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Ligou TV (DASHBORD)?</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="ligouTVDashBoard" name="ligouTVDashBoard" checked={form.ligouTVDashBoard} onChange={handleChange} />
            <label htmlFor="ligouTVDashBoard">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Coletou chaves internas no chaveiro?</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="coletouChavesChaveiro" name="coletouChavesChaveiro" checked={form.coletouChavesChaveiro} onChange={handleChange} />
            <label htmlFor="coletouChavesChaveiro">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Abriu porta do banheiro?</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="abriuPortaBanheiro" name="abriuPortaBanheiro" checked={form.abriuPortaBanheiro} onChange={handleChange} />
            <label htmlFor="abriuPortaBanheiro">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Removeu cadeado portão 1?</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="removeuCadeadoPortao1" name="removeuCadeadoPortao1" checked={form.removeuCadeadoPortao1} onChange={handleChange} />
            <label htmlFor="removeuCadeadoPortao1">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Removeu cadeado portão 2?</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="removeuCadeadoPortao2" name="removeuCadeadoPortao2" checked={form.removeuCadeadoPortao2} onChange={handleChange} />
            <label htmlFor="removeuCadeadoPortao2">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Posicionou cone no estacionamento PCD?</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="colocouConeEstacionamentoPCD" name="colocouConeEstacionamentoPCD" checked={form.colocouConeEstacionamentoPCD} onChange={handleChange} />
            <label htmlFor="colocouConeEstacionamentoPCD">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Ligou tomada e retirou plástico do bebedouro?</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="ligouTomadaTirouPlasticoBebedouro" name="ligouTomadaTirouPlasticoBebedouro" checked={form.ligouTomadaTirouPlasticoBebedouro} onChange={handleChange} />
            <label htmlFor="ligouTomadaTirouPlasticoBebedouro">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Colocou tapetes nos devidos lugares ? (Atividade às segundas-feiras)</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="colocouTapetesDevidosLugares" name="colocouTapetesDevidosLugares" checked={form.colocouTapetesDevidosLugares} onChange={handleChange} />
            <label htmlFor="colocouTapetesDevidosLugares">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Fez café do dia?</label>
          <div className={styles.checkboxOption}>
            <input className={styles.inputcheckbox} type="checkbox" id="fezCafe" name="fezCafe" checked={form.fezCafe} onChange={handleChange} />
            <label htmlFor="fezCafe">Sim</label>
          </div>
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Houve alguma situação atípica que exigiu atenção ou ação fora do previsto
            no checklist?</label>
          <input
            className={styles.input1}
            type="text"
            id="observacao"
            name="observacao"
            value={form.observacao}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.buttonenviar}>Enviar</button>
      </form>
    </div>
    </ProtectRoute>
  );
}

export default Page;