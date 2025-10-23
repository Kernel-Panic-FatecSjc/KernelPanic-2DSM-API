'use client';
import React, { useState } from 'react';
import styles from './App.module.css';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    dataDaVerificacao: "",
    condiPisoEscritorioADM_Diretoria_SalaReuniao: "",
    condiPisoOperacional: "",
    condiPisoGalpao: "",
    condiPisoRefeitorio: "",
    condiForroCoberturaEscritorioADM_SalaReuniao: "",
    condiForroCoberturaOperacional: "",
    condiForroCoberturaGalpao: "",
    condiForroCoberturaRefeitorio: "",
    estadoGeralInstalacoesEletricas: "",
    estadoGeralProtecoesContraRaio: "",
    verificCargaArCondicionadoSalaAdm: false,
    verificCargaArCondicionadoSalaDiretoria: false,
    verificCargaArCondicionadoSalaReuniao: false,
    verificCargaArCondicionadoSalaOperacional: false,
    verificLampadasSalaAdm: false,
    verificLampadasSalaDiretoria: false,
    verificLampadasSalaReuniao: false,
    verificLampadasOperacional: false,
    verificLampadasGalpao: false,
    verificLampadasRefeitorio: false,
    verificLampadasBanheiroFeminino: false,
    verificLampadasBanheiroMasculino: false,
    macanetaBoasCondicoes: false,
    mesasOperacionalBoasCondicoes: false,
    condiTresPaleteirasCarrinhoHidraulico: "",
    refOrganizacaoDosLocaisDeTrabalho: "",
    verificCamerasDeSeguranca: false,
    condiBalancasPiso: "",
    dataUltimaAfericaoBalanca: "",
    condMictoriosLavatorios: "",
    dataUltimaLimpezaBebedouro: "",
    dataProximaDedetizacao: "",
    dataUltimaRecargaExtintor: "",
    dataProximaRecargaExtintor: "",
    dataUltimaLimpezaCaixaDagua: "",
    dataProximaLimpezaCaixaDagua: "",
    cadeiraMasCondicoes: false,
    setorCadeiraMasCondicoes: "",
    DetalheAdcional: "",
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
      tipo: "manutencao_predial",
      respostas: { ...form },
      path_img: null,
    };

    try {
      const response = await fetch('http://localhost:5000/checklist/manutencao-predial', {
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
        dataDaVerificacao: "",
        condiPisoEscritorioADM_Diretoria_SalaReuniao: "",
        condiPisoOperacional: "",
        condiPisoGalpao: "",
        condiPisoRefeitorio: "",
        condiForroCoberturaEscritorioADM_SalaReuniao: "",
        condiForroCoberturaOperacional: "",
        condiForroCoberturaGalpao: "",
        condiForroCoberturaRefeitorio: "",
        estadoGeralInstalacoesEletricas: "",
        estadoGeralProtecoesContraRaio: "",
        verificCargaArCondicionadoSalaAdm: false,
        verificCargaArCondicionadoSalaDiretoria: false,
        verificCargaArCondicionadoSalaReuniao: false,
        verificCargaArCondicionadoSalaOperacional: false,
        verificLampadasSalaAdm: false,
        verificLampadasSalaDiretoria: false,
        verificLampadasSalaReuniao: false,
        verificLampadasOperacional: false,
        verificLampadasGalpao: false,
        verificLampadasRefeitorio: false,
        verificLampadasBanheiroFeminino: false,
        verificLampadasBanheiroMasculino: false,
        macanetaBoasCondicoes: false,
        mesasOperacionalBoasCondicoes: false,
        condiTresPaleteirasCarrinhoHidraulico: "",
        refOrganizacaoDosLocaisDeTrabalho: "",
        verificCamerasDeSeguranca: false,
        condiBalancasPiso: "",
        dataUltimaAfericaoBalanca: "",
        condMictoriosLavatorios: "",
        dataUltimaLimpezaBebedouro: "",
        dataProximaDedetizacao: "",
        dataUltimaRecargaExtintor: "",
        dataProximaRecargaExtintor: "",
        dataUltimaLimpezaCaixaDagua: "",
        dataProximaLimpezaCaixaDagua: "",
        cadeiraMasCondicoes: false,
        setorCadeiraMasCondicoes: "",
        DetalheAdcional: "",
      });

    } catch (error) {
      console.error('❌ Erro ao enviar checklist:', error);
      alert("Erro ao enviar, tente novamente");
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.buttonvoltar} onClick={() => router.back()}>
        ← Voltar
      </button>
      <h2>Formulário de manutenção predial</h2>
      <p>
        Esse formulário tem o objetivo de verificar as condições do local afim de manter
        segurança, funcionalidade e conservação do ambiente de trabalho.
        <br /><br />
        Quando você enviar este formulário, o proprietário verá seu nome e
        endereço de email.
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Data da verificação</label>
          <input
            className={styles.input2}
            type="date"
            id="dataDaVerificacao"
            name="dataDaVerificacao"
            value={form.dataDaVerificacao}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Quais as condições do piso do escritório (ADM/ Diretoria/ Sala de reunião)?</label>
          <input
            className={styles.input2}
            type="text"
            id="condiPisoEscritorioADM_Diretoria_SalaReuniao"
            name="condiPisoEscritorioADM_Diretoria_SalaReuniao"
            value={form.condiPisoEscritorioADM_Diretoria_SalaReuniao}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Quais as condições do piso da sala?(OPERACIONAL)</label>
          <input
            className={styles.input2}
            type="text"
            id="condiPisoOperacional"
            name="condiPisoOperacional"
            value={form.condiPisoOperacional}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Quais as condições do piso do GALPÃO?</label>
          <input
            className={styles.input2}
            type="text"
            id="condiPisoGalpao"
            name="condiPisoGalpao"
            value={form.condiPisoGalpao}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Quais as condições do piso REFEITÓRIO?</label>
          <input
            className={styles.input2}
            type="text"
            id="condiPisoRefeitorio"
            name="condiPisoRefeitorio"
            value={form.condiPisoRefeitorio}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Quais as condições do forro/cobertura do escritório?(ADM/ Sala de reunião)</label>
          <input
            className={styles.input2}
            type="text"
            id="condiForroCoberturaEscritorioADM_SalaReuniao"
            name="condiForroCoberturaEscritorioADM_SalaReuniao"
            value={form.condiForroCoberturaEscritorioADM_SalaReuniao}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Quais as condições do forro/cobertura do OPERACIONAL?</label>
          <input
            className={styles.input2}
            type="text"
            id="condiForroCoberturaOperacional"
            name="condiForroCoberturaOperacional"
            value={form.condiForroCoberturaOperacional}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Quais as condições do forro/cobertura do GALPÃO?</label>
          <input
            className={styles.input2}
            type="text"
            id="condiForroCoberturaGalpao"
            name="condiForroCoberturaGalpao"
            value={form.condiForroCoberturaGalpao}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Quais as condições do forro/cobertura do REFEITÓRIO?</label>
          <input
            className={styles.input2}
            type="text"
            id="condiForroCoberturaRefeitorio"
            name="condiForroCoberturaRefeitorio"
            value={form.condiForroCoberturaRefeitorio}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Qual estado geral das instalações elétricas?</label>
          <input
            className={styles.input2}
            type="text"
            id="estadoGeralInstalacoesEletricas"
            name="estadoGeralInstalacoesEletricas"
            value={form.estadoGeralInstalacoesEletricas}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Qual estado geral de proteções contra raios?</label>
          <input
            className={styles.input2}
            type="text"
            id="estadoGeralProtecoesContraRaio"
            name="estadoGeralProtecoesContraRaio"
            value={form.estadoGeralProtecoesContraRaio}
            onChange={handleChange}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificação de carga ar condicionado - Sala Administrativo</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificCargaArCondicionadoSalaAdm" 
              name="verificCargaArCondicionadoSalaAdm" 
              checked={form.verificCargaArCondicionadoSalaAdm} 
              onChange={handleChange} 
            />
            <label htmlFor="verificCargaArCondicionadoSalaAdm">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificação de carga ar condicionado - Sala Diretoria</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificCargaArCondicionadoSalaDiretoria" 
              name="verificCargaArCondicionadoSalaDiretoria" 
              checked={form.verificCargaArCondicionadoSalaDiretoria} 
              onChange={handleChange} 
            />
            <label htmlFor="verificCargaArCondicionadoSalaDiretoria">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificação de carga ar condicionado - Sala Reunião</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificCargaArCondicionadoSalaReuniao" 
              name="verificCargaArCondicionadoSalaReuniao" 
              checked={form.verificCargaArCondicionadoSalaReuniao} 
              onChange={handleChange} 
            />
            <label htmlFor="verificCargaArCondicionadoSalaReuniao">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificação de carga ar condicionado - Sala Operacional</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificCargaArCondicionadoSalaOperacional" 
              name="verificCargaArCondicionadoSalaOperacional" 
              checked={form.verificCargaArCondicionadoSalaOperacional} 
              onChange={handleChange} 
            />
            <label htmlFor="verificCargaArCondicionadoSalaOperacional">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificação das lâmpadas - Sala Administrativo</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificLampadasSalaAdm" 
              name="verificLampadasSalaAdm" 
              checked={form.verificLampadasSalaAdm} 
              onChange={handleChange} 
            />
            <label htmlFor="verificLampadasSalaAdm">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificação das lâmpadas - Sala Diretoria</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificLampadasSalaDiretoria" 
              name="verificLampadasSalaDiretoria" 
              checked={form.verificLampadasSalaDiretoria} 
              onChange={handleChange} 
            />
            <label htmlFor="verificLampadasSalaDiretoria">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificação das lâmpadas - Sala Reunião</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificLampadasSalaReuniao" 
              name="verificLampadasSalaReuniao" 
              checked={form.verificLampadasSalaReuniao} 
              onChange={handleChange} 
            />
            <label htmlFor="verificLampadasSalaReuniao">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificação das lâmpadas - Sala Operacional</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificLampadasOperacional" 
              name="verificLampadasOperacional" 
              checked={form.verificLampadasOperacional} 
              onChange={handleChange} 
            />
            <label htmlFor="verificLampadasOperacional">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificação das lâmpadas - Galpão</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificLampadasGalpao" 
              name="verificLampadasGalpao" 
              checked={form.verificLampadasGalpao} 
              onChange={handleChange} 
            />
            <label htmlFor="verificLampadasGalpao">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificação das lâmpadas - Refeitório</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificLampadasRefeitorio" 
              name="verificLampadasRefeitorio" 
              checked={form.verificLampadasRefeitorio} 
              onChange={handleChange} 
            />
            <label htmlFor="verificLampadasRefeitorio">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificação das lâmpadas - Banheiro Masculino</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificLampadasBanheiroMasculino" 
              name="verificLampadasBanheiroMasculino" 
              checked={form.verificLampadasBanheiroMasculino} 
              onChange={handleChange} 
            />
            <label htmlFor="verificLampadasBanheiroMasculino">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Maçaneta de todas portas estão em boas condições?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="macanetaBoasCondicoes" 
              name="macanetaBoasCondicoes" 
              checked={form.macanetaBoasCondicoes} 
              onChange={handleChange} 
            />
            <label htmlFor="macanetaBoasCondicoes">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Mesas do operacional estão com todas proteções no pé?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="mesasOperacionalBoasCondicoes" 
              name="mesasOperacionalBoasCondicoes" 
              checked={form.mesasOperacionalBoasCondicoes} 
              onChange={handleChange} 
            />
            <label htmlFor="mesasOperacionalBoasCondicoes">Sim</label>
          </div>
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Quais condições das três paleteiras e do carrinho hidráulico?</label>
          <input
            className={styles.input2}
            type="text"
            id="condiTresPaleteirasCarrinhoHidraulico"
            name="condiTresPaleteirasCarrinhoHidraulico"
            value={form.condiTresPaleteirasCarrinhoHidraulico}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Referente a organização dos locais de trabalho estão corretas de modo a não oferecer riscos aos funcionários e aos produtos/serviços?</label>
          <input
            className={styles.input2}
            type="text"
            id="refOrganizacaoDosLocaisDeTrabalho"
            name="refOrganizacaoDosLocaisDeTrabalho"
            value={form.refOrganizacaoDosLocaisDeTrabalho}
            onChange={handleChange}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Verificação das câmeras de segurança, as 11 estão funcionando corretamente e bem posicionadas? (se não - informar imediatamente o gestor)</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="verificCamerasDeSeguranca" 
              name="verificCamerasDeSeguranca" 
              checked={form.verificCamerasDeSeguranca} 
              onChange={handleChange} 
            />
            <label htmlFor="verificCamerasDeSeguranca">Sim</label>
          </div>
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Quais as condições da balança de piso?</label>
          <input
            className={styles.input2}
            type="text"
            id="condiBalancasPiso"
            name="condiBalancasPiso"
            value={form.condiBalancasPiso}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Favor informar data da última aferição da balança</label>
          <input
            className={styles.input2}
            type="date"
            id="dataUltimaAfericaoBalanca"
            name="dataUltimaAfericaoBalanca"
            value={form.dataUltimaAfericaoBalanca}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Condições dos mictórios e lavatórios?</label>
          <input
            className={styles.input2}
            type="text"
            id="condMictoriosLavatorios"
            name="condMictoriosLavatorios"
            value={form.condMictoriosLavatorios}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Bebedouro - Informar data da última limpeza e troca de filtro (validade de 6 em 6 meses)</label>
          <input
            className={styles.input2}
            type="date"
            id="dataUltimaLimpezaBebedouro"
            name="dataUltimaLimpezaBebedouro"
            value={form.dataUltimaLimpezaBebedouro}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Data da próxima dedetização *</label>
          <input
            className={styles.input2}
            type="date"
            id="dataProximaDedetizacao"
            name="dataProximaDedetizacao"
            value={form.dataProximaDedetizacao}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>EXTINTORES - Informar data da última recarga dos extintores</label>
          <input
            className={styles.input2}
            type="date"
            id="dataUltimaRecargaExtintor"
            name="dataUltimaRecargaExtintor"
            value={form.dataUltimaRecargaExtintor}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Data da próxima recarga dos extintores</label>
          <input
            className={styles.input2}
            type="date"
            id="dataProximaRecargaExtintor"
            name="dataProximaRecargaExtintor"
            value={form.dataProximaRecargaExtintor}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Caixa D'água- Informar data da última limpeza (validade de 6 em 6 meses)</label>
          <input
            className={styles.input2}
            type="date"
            id="dataUltimaLimpezaCaixaDagua"
            name="dataUltimaLimpezaCaixaDagua"
            value={form.dataUltimaLimpezaCaixaDagua}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Data da próxima limpeza</label>
          <input
            className={styles.input2}
            type="date"
            id="dataProximaLimpezaCaixaDagua"
            name="dataProximaLimpezaCaixaDagua"
            value={form.dataProximaLimpezaCaixaDagua}
            onChange={handleChange}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Alguma cadeira está em má condição para uso?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="cadeiraMasCondicoes" 
              name="cadeiraMasCondicoes" 
              checked={form.cadeiraMasCondicoes} 
              onChange={handleChange} 
            />
            <label htmlFor="cadeiraMasCondicoes">Sim</label>
          </div>
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Se a resposta da pergunta acima for 'sim' descreva de qual setor é a cadeira, e qual posição ela se encontra</label>
          <input
            className={styles.input2}
            type="text"
            id="setorCadeiraMasCondicoes"
            name="setorCadeiraMasCondicoes"
            value={form.setorCadeiraMasCondicoes}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Algum detalhe adicional? descreva abaixo.</label>
          <input
            className={styles.input2}
            type="text"
            id="DetalheAdcional"
            name="DetalheAdcional"
            value={form.DetalheAdcional}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.buttonenviar}>Enviar</button>
      </form>
    </div>
  );
}

export default Page;