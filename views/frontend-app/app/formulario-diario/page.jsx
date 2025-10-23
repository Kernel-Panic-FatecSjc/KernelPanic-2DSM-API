'use client';
import React, { useState } from 'react';
import styles from './App.module.css';
import ProtectRoute from '../../components/ProtectRoute';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    nomeMotorista: '',
    placaVeiculo: '',
    dataChecklist: '',
    kmInicial: '',
    destino: '',
    kmFinal: '',
    teveAbastecimento: false,
    comprovanteAbastecimentoEnviado: false,
    oleoMotorOk: false,
    reservatorioAguaOk: false,
    sistemaEletricoOk: false,
    estadoPneusOk: false,
    limpezaBauSiderCabineOk: false,
    lubrificacaoSuspensoesOk: false,
    macacoOk: false,
    chaveRodaOk: false,
    documentoVigenteOk: false,
    dataHoraEncerramento: '',
    observacoes: ''
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
      tipo: "diario",
      respostas: { ...form },
      path_img: null,
    };

    try {
      const response = await fetch('http://localhost:5000/checklist/diario', {
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
        nomeMotorista: '',
        placaVeiculo: '',
        dataChecklist: '',
        kmInicial: '',
        destino: '',
        kmFinal: '',
        teveAbastecimento: false,
        comprovanteAbastecimentoEnviado: false,
        oleoMotorOk: false,
        reservatorioAguaOk: false,
        sistemaEletricoOk: false,
        estadoPneusOk: false,
        limpezaBauSiderCabineOk: false,
        lubrificacaoSuspensoesOk: false,
        macacoOk: false,
        chaveRodaOk: false,
        documentoVigenteOk: false,
        dataHoraEncerramento: '',
        observacoes: ''
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
      <h2>Formulário diário</h2>
      <p>
        Quando você enviar este formulário, o proprietário verá seu nome e
        endereço de email.
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Nome e sobrenome do Motorista</label>
          <input
            className={styles.input2}
            type="text"
            id="nomeMotorista"
            name="nomeMotorista"
            value={form.nomeMotorista}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Placa do Veículo</label>
          <input
            className={styles.input2}
            type="text"
            id="placaVeiculo"
            name="placaVeiculo"
            value={form.placaVeiculo}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Data do Check-List</label>
          <input
            className={styles.input2}
            type="date"
            id="dataChecklist"
            name="dataChecklist"
            value={form.dataChecklist}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>KM Inicial</label>
          <input
            className={styles.input2}
            type="text"
            id="kmInicial"
            name="kmInicial"
            value={form.kmInicial}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Destino</label>
          <input
            className={styles.input2}
            type="text"
            id="destino"
            name="destino"
            value={form.destino}
            onChange={handleChange}
          />
        </div>
        
        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>KM Final</label>
          <input
            className={styles.input2}
            type="text"
            id="kmFinal"
            name="kmFinal"
            value={form.kmFinal}
            onChange={handleChange}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Teve Abastecimento?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="teveAbastecimento" 
              name="teveAbastecimento" 
              checked={form.teveAbastecimento} 
              onChange={handleChange} 
            />
            <label htmlFor="teveAbastecimento">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Comprovante de abastecimento Enviado para gerência?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="comprovanteAbastecimentoEnviado" 
              name="comprovanteAbastecimentoEnviado" 
              checked={form.comprovanteAbastecimentoEnviado} 
              onChange={handleChange} 
            />
            <label htmlFor="comprovanteAbastecimentoEnviado">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Óleo do Motor ok?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="oleoMotorOk" 
              name="oleoMotorOk" 
              checked={form.oleoMotorOk} 
              onChange={handleChange} 
            />
            <label htmlFor="oleoMotorOk">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Reservatório de Água ok?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="reservatorioAguaOk" 
              name="reservatorioAguaOk" 
              checked={form.reservatorioAguaOk} 
              onChange={handleChange} 
            />
            <label htmlFor="reservatorioAguaOk">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Sistema Elétrico ok?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="sistemaEletricoOk" 
              name="sistemaEletricoOk" 
              checked={form.sistemaEletricoOk} 
              onChange={handleChange} 
            />
            <label htmlFor="sistemaEletricoOk">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Estado dos Pneus ok?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="estadoPneusOk" 
              name="estadoPneusOk" 
              checked={form.estadoPneusOk} 
              onChange={handleChange} 
            />
            <label htmlFor="estadoPneusOk">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Limpeza Baú/Sider/Cabine ok?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="limpezaBauSiderCabineOk" 
              name="limpezaBauSiderCabineOk" 
              checked={form.limpezaBauSiderCabineOk} 
              onChange={handleChange} 
            />
            <label htmlFor="limpezaBauSiderCabineOk">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Lubrificação de Suspensões ok?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="lubrificacaoSuspensoesOk" 
              name="lubrificacaoSuspensoesOk" 
              checked={form.lubrificacaoSuspensoesOk} 
              onChange={handleChange} 
            />
            <label htmlFor="lubrificacaoSuspensoesOk">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Macaco ok?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="macacoOk" 
              name="macacoOk" 
              checked={form.macacoOk} 
              onChange={handleChange} 
            />
            <label htmlFor="macacoOk">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Chave de Roda ok?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="chaveRodaOk" 
              name="chaveRodaOk" 
              checked={form.chaveRodaOk} 
              onChange={handleChange} 
            />
            <label htmlFor="chaveRodaOk">Sim</label>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Documento Vigente ok?</label>
          <div className={styles.checkboxOption}>
            <input 
              className={styles.inputcheckbox} 
              type="checkbox" 
              id="documentoVigenteOk" 
              name="documentoVigenteOk" 
              checked={form.documentoVigenteOk} 
              onChange={handleChange} 
            />
            <label htmlFor="documentoVigenteOk">Sim</label>
          </div>
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Data/Horário de Encerramento de atividade</label>
          <input
            className={styles.input2}
            type="datetime-local"
            id="dataHoraEncerramento"
            name="dataHoraEncerramento"
            value={form.dataHoraEncerramento}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Observações que sejam pertinentes</label>
          <input
            className={styles.input2}
            type="text"
            id="observacoes"
            name="observacoes"
            value={form.observacoes}
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