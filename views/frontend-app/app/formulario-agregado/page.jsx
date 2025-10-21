'use client';
import React from 'react';
import Image from 'next/image';
import styles from './App.module.css';
import Login from '../../components/layout/Login/login';

function Page() {
  return (
    <div className={styles.layout}>
      <div className={styles.lateral}>
        <Login />
      </div>

      <div className={styles.right}>
        <div className={styles.formWrapper}>
          <main className={styles.container}>
            <h2>Formulário de agregado</h2>
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

            <div className={styles.checkboxGroup}>
              <label className={styles.inputtitle}>Enviar por e-mail</label>
              <div className={styles.checkboxOption}>
                <input className={styles.inputcheckbox} type="checkbox" id="email" name="email" />
                <label htmlFor="enviar">Registrar (email) como o e-mail a ser incluído na minha resposta</label>
              </div>
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Nome completo do motorista</label>
              <input className={styles.input2} type="text" id="NomeMotorista" name="NomeMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>CPF</label>
              <input  placeholder='12345678909' className={styles.input2} type="text" id="CPFMotorista" name="CPFMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Placa do veículo </label>
              <input  placeholder='ABC1D23' className={styles.input2} type="text" id="PlacaVeículo" name="PlacaVeículo" />
            </div>

            <button type="submit" className={styles.buttonenviar}>Enviar</button>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Page;
