'use client';
import React from 'react'
import styles from './App.module.css';


function page() {
  return (
    <div className={styles.container}>
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

      <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Quem está preenchendo?</label>
        <input
          className={styles.input1}
          type="date"
          id="quemAbertura"
          name="quemAbertura"
        />
      </div>

      <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Data de abertura da empresa?</label>
        <input
          className={styles.input2}
          type="text"
          id="dataAbertura"
          name="dataAbertura"
        />
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Abriu cadeado das correntes? (FRENTE DA EMPRESA)</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim1" name="sim1" />
          <label htmlFor="sim1">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Abriu o portão? (SOCIAL)</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim2" name="sim2" />
          <label htmlFor="sim2">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Abriu porta rolante de ferro? (ARMAZÉM)</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim3" name="sim3" />
          <label htmlFor="sim3">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Desbloqueou o alarme?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim4" name="sim4" />
          <label htmlFor="sim4">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Apagou luzes? (ARMAZÉM)</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim5" name="sim5" />
          <label htmlFor="sim5">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Acendeu luzes? (ARMAZÉM)</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim6" name="sim6" />
          <label htmlFor="sim6">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Acendeu luzes? (OPERACIONAL)</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim7" name="sim7" />
          <label htmlFor="sim7">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Ligou o ar condicionado?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim8">Sim</label>
        </div>
      </div>
      <button type="submit" className={styles.buttonenviar}>Enviar</button>
    </div>
  );
}

export default page
