'use client';
import React, { useState } from 'react';
import styles from './App.module.css';
import ProtectRoute from '../../components/ProtectRoute';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    qmPreenchendo: '',
    dataFechamento: '',
    lixoOrganicoTrocado: false,
    lixoColocouParaFora: false,
    deixouCozinhaOrganizada: false,
    apagouAsLuzesFxPortaCozinha: false,
    trancouPortao2: false,
    trancouPortao1: false,
    verificTorneirasFechadas: false,
    tirooBanheiroCesto: false,
    trancouPortaBanheiro: false,
    desligouTomadaPutPlasticoBebedouro: false,
    deixouChavesInternasChaveiro: false,
    desligouTVdasCameras: false,
    desligouTVDashBoard: false,
    desligouArCondicionado: false,
    desligouLuzesEscritorioOp: false,
    luzesArmazem: false,
    retirouConeEstacionamentoPCD: false,
    acionouAlarme: false,
    fechouPortaArmazem: false,
    trancouCadeadoCorrentes: false,
    estadoMotorDoPortao: '',
    comentario: ''
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
      tipo: "fechamento",
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
        dataFechamento: '',
        lixoOrganicoTrocado: false,
        lixoColocouParaFora: false,
        deixouCozinhaOrganizada: false,
        apagouAsLuzesFxPortaCozinha: false,
        trancouPortao2: false,
        trancouPortao1: false,
        verificTorneirasFechadas: false,
        tirooBanheiroCesto: false,
        trancouPortaBanheiro: false,
        desligouTomadaPutPlasticoBebedouro: false,
        deixouChavesInternasChaveiro: false,
        desligouTVdasCameras: false,
        desligouTVDashBoard: false,
        desligouArCondicionado: false,
        desligouLuzesEscritorioOp: false,
        luzesArmazem: false,
        retirouConeEstacionamentoPCD: false,
        acionouAlarme: false,
        fechouPortaArmazem: false,
        trancouCadeadoCorrentes: false,
        estadoMotorDoPortao: '',
        comentario: ''
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
      <h2>Formulário de fechamento</h2>
      <p>
        Esse CHECK LIST tem a finalidade de registrar os procedimentos de FECHAMENTO da
        empresa NEWE para garantir a perfeita execução e evitar custos desnecessários com
        água e energia elétrica.
        <br /><br />
        Atenção: Este checklist contempla os pontos essenciais da operação. No entanto,
        situações excepcionais ou imprevistas devem ser conduzidas com base no bom senso,
        zelo pelo patrimônio da empresa e comunicação imediata com a liderança.
        O não cumprimento de ações que comprometam a segurança, o funcionamento de
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
          <label className={styles.inputtitle}>Data de fechamento da empresa?</label>
          <input
            className={styles.input2}
            type="date"
            id="dataFechamento"
            name="dataFechamento"
            value={form.dataFechamento}
            onChange={handleChange}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Tirou lixo organico da cozinha e trocou o cestinho lixo com saco limpo orgânico?(FRENTE DA EMPRESA)</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="lixoOrganicoTrocado" 
              name="lixoOrganicoTrocado" 
              checked={form.lixoOrganicoTrocado} 
              onChange={handleChange} 
            />
            <label htmlFor="lixoOrganicoTrocado">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Se for SEXTA-FEIRA Colocou o lixo reciclável no cesto de lixo fora da empresa?(ATIVIDADE PARA SEXTA-FEIRAS)</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="lixoColocouParaFora" 
              name="lixoColocouParaFora" 
              checked={form.lixoColocouParaFora} 
              onChange={handleChange} 
            />
            <label htmlFor="lixoColocouParaFora">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Deixou a cozinha organizada?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="deixouCozinhaOrganizada" 
              name="deixouCozinhaOrganizada" 
              checked={form.deixouCozinhaOrganizada} 
              onChange={handleChange} 
            />
            <label htmlFor="deixouCozinhaOrganizada">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Apagou as luzes e fechou a porta da cozinha?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="apagouAsLuzesFxPortaCozinha" 
              name="apagouAsLuzesFxPortaCozinha" 
              checked={form.apagouAsLuzesFxPortaCozinha} 
              onChange={handleChange} 
            />
            <label htmlFor="apagouAsLuzesFxPortaCozinha">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Trancou cadeado da porta 1?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="trancouPortao1" 
              name="trancouPortao1" 
              checked={form.trancouPortao1} 
              onChange={handleChange} 
            />
            <label htmlFor="trancouPortao1">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Trancou cadeado da porta 2?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="trancouPortao2" 
              name="trancouPortao2" 
              checked={form.trancouPortao2} 
              onChange={handleChange} 
            />
            <label htmlFor="trancouPortao2">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificou se torneiras estão fechadas e se a válvula do mictório não está pressionada?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificTorneirasFechadas" 
              name="verificTorneirasFechadas" 
              checked={form.verificTorneirasFechadas} 
              onChange={handleChange} 
            />
            <label htmlFor="verificTorneirasFechadas">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Tirou o lixo do Banheiro e colocou no cesto fora da empresa?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="tirooBanheiroCesto" 
              name="tirooBanheiroCesto" 
              checked={form.tirooBanheiroCesto} 
              onChange={handleChange} 
            />
            <label htmlFor="tirooBanheiroCesto">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Trancou a porta do banheiro?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="trancouPortaBanheiro" 
              name="trancouPortaBanheiro" 
              checked={form.trancouPortaBanheiro} 
              onChange={handleChange} 
            />
            <label htmlFor="trancouPortaBanheiro">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Desligou da tomada e colocou o plástico do bebedouro?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="desligouTomadaPutPlasticoBebedouro" 
              name="desligouTomadaPutPlasticoBebedouro" 
              checked={form.desligouTomadaPutPlasticoBebedouro} 
              onChange={handleChange} 
            />
            <label htmlFor="desligouTomadaPutPlasticoBebedouro">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Deixou as chaves internas no chaveiro do operacional?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="deixouChavesInternasChaveiro" 
              name="deixouChavesInternasChaveiro" 
              checked={form.deixouChavesInternasChaveiro} 
              onChange={handleChange} 
            />
            <label htmlFor="deixouChavesInternasChaveiro">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Desligou a TV das CAMERAS?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="desligouTVdasCameras" 
              name="desligouTVdasCameras" 
              checked={form.desligouTVdasCameras} 
              onChange={handleChange} 
            />
            <label htmlFor="desligouTVdasCameras">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Desligou a TV do DASHBOARD?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="desligouTVDashBoard" 
              name="desligouTVDashBoard" 
              checked={form.desligouTVDashBoard} 
              onChange={handleChange} 
            />
            <label htmlFor="desligouTVDashBoard">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Desligou o Ar condicionado?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="desligouArCondicionado" 
              name="desligouArCondicionado" 
              checked={form.desligouArCondicionado} 
              onChange={handleChange} 
            />
            <label htmlFor="desligouArCondicionado">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Desligou as luzes do escritório?(OPERACIONAL)</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="desligouLuzesEscritorioOp" 
              name="desligouLuzesEscritorioOp" 
              checked={form.desligouLuzesEscritorioOp} 
              onChange={handleChange} 
            />
            <label htmlFor="desligouLuzesEscritorioOp">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Acendeu as luzes do ARMAZÉM?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="luzesArmazem" 
              name="luzesArmazem" 
              checked={form.luzesArmazem} 
              onChange={handleChange} 
            />
            <label htmlFor="luzesArmazem">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Retirou o cone do estacionamento PCD?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="retirouConeEstacionamentoPCD" 
              name="retirouConeEstacionamentoPCD" 
              checked={form.retirouConeEstacionamentoPCD} 
              onChange={handleChange} 
            />
            <label htmlFor="retirouConeEstacionamentoPCD">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Acionou o ALARME?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="acionouAlarme" 
              name="acionouAlarme" 
              checked={form.acionouAlarme} 
              onChange={handleChange} 
            />
            <label htmlFor="acionouAlarme">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Fechou a porta de entrada do ARMAZÉM</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="fechouPortaArmazem" 
              name="fechouPortaArmazem" 
              checked={form.fechouPortaArmazem} 
              onChange={handleChange} 
            />
            <label htmlFor="fechouPortaArmazem">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Trancou o cadeado das correntes?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="trancouCadeadoCorrentes" 
              name="trancouCadeadoCorrentes" 
              checked={form.trancouCadeadoCorrentes} 
              onChange={handleChange} 
            />
            <label htmlFor="trancouCadeadoCorrentes">Sim</label>
          </div>
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>
            Algum dos motores dos portões apresenta ruídos ou travamentos?
            <br />
            Verifique ao menos uma vez no dia, e se caso algum dos portões for
            selecionado reporte imediatamente a gestão.
          </label>
          <input
            className={styles.input2}
            type="text"
            id="estadoMotorDoPortao"
            name="estadoMotorDoPortao"
            value={form.estadoMotorDoPortao}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>
            Houve alguma situação atípica que exigiu atenção ou ação fora do previsto
            no checklist?
            <br />
            Descreva brevemente
          </label>
          <input
            className={styles.input2}
            type="text"
            id="comentario"
            name="comentario"
            value={form.comentario}
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