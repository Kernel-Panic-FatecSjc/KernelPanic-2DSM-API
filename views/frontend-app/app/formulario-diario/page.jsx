'use client';
import React from 'react'
import styles from './App.module.css';


function page() {
  return (
    <div className={styles.container}>
      <h2>Formulário de abertura</h2>
      <p>
        Quando você enviar este formulário, o proprietário verá seu nome e
        endereço de email.
      </p>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Nome e sobrenome do Motorista</label>
        <input
          className={styles.input2}
          type="date"
          id="nome"
          name="nome"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Placa do Veículo?</label>
        <input
          className={styles.input2}
          type="text"
          id="placa"
          name="placa"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Data do Check-List</label>
        <input
          className={styles.input2}
          type="date"
          id="dataChecklist"
          name="dataChecklist"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>KM Inicial</label>
        <input
          className={styles.input2}
          type="text"
          id="kmInicial"
          name="kmInicial"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Destino</label>
        <input
          className={styles.input2}
          type="text"
          id="destino"
          name="destino"
        />
    </div>
    
    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>KM Final</label>
        <input
          className={styles.input2}
          type="text"
          id="kmFinal"
          name="kmFinal"
        />
    </div>
   
    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Teve Abastecimento?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim1" name="sim1" />
          <label htmlFor="sim1">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Comprovante de abastecimento Enviado para gerência ?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim2" name="sim2" />
          <label htmlFor="sim2">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Óleo do Motor ok?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim3" name="sim3" />
          <label htmlFor="sim3">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Reservatório de Água ok ?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim4" name="sim4" />
          <label htmlFor="sim4">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Sistema Elétrico ok ?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim5" name="sim5" />
          <label htmlFor="sim5">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Estado dos Pneus ok ?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim6" name="sim6" />
          <label htmlFor="sim6">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Limpeza Baú/Sider/Cabine ok ?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim7" name="sim7" />
          <label htmlFor="sim7">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Lubrificação de Suspensões ok ?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim8">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Macaco ok ?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim9" name="sim9" />
          <label htmlFor="sim9">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Chave de Roda ok ?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim10" name="sim10" />
          <label htmlFor="sim10">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Documento Vigente ok?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim11" name="sim11" />
          <label htmlFor="sim11">Sim</label>
        </div>
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Data/Horário de Encerramento de atividade</label>
        <input
          className={styles.input2}
          type="date"
          id="dataEncerramento"
          name="dataEncerramento"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Observações que sejam pertinentes</label>
        <input
          className={styles.input2}
          type="text"
          id="observacoes"
          name="observacoes"
        />
    </div>
    <button type="submit" className={styles.buttonenviar}>Enviar</button>
    </div>
  );
}

export default page