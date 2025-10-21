'use client';
import React from 'react';
import Image from 'next/image';
import styles from './App.module.css';

function Page() {
  return (
    <div className={styles.layout}>
      <div className={styles.lateral}>
        <Image
          className={styles.logo}
          src="/images/logoneweglobal.jpg"
          width={400}
          height={200}
          alt="Logo da Newe"
        />
      </div>

      <div className={styles.right}>
        <div className={styles.formWrapper}>
          <main className={styles.container}>
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
              <input className={styles.input1} type="date" id="quemAbertura" name="quemAbertura" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Data de abertura da empresa?</label>
              <input className={styles.input2} type="text" id="dataAbertura" name="dataAbertura" />
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.inputtitle}>Abriu cadeado das correntes? (FRENTE DA EMPRESA)</label>
              <div className={styles.checkboxOption}>
                <input className={styles.inputcheckbox} type="checkbox" id="sim1" name="sim1" />
                <label htmlFor="sim1">Sim</label>
              </div>
            </div>

            <button type="submit" className={styles.buttonenviar}>Enviar</button>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Page;
