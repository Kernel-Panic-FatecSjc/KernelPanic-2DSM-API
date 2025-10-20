'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react'
import styles from './App.module.css';


function page() {
  return (
    <div className={styles.container}>
      <h2>Formulário de abertura</h2>
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

      <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Quem está preenchendo?</label>
        <input
          className={styles.input1}
          type="text"
          id="quem"
          name="quem"
        />
      </div>

      <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Data de fechamento da empresa?</label>
        <input
          className={styles.input2}
          type="text"
          id="data"
          name="data"
        />
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Tirou lixo organico da cozinha e trocou o cestinho lixo com saco limpo orgânico?(FRENTE DA EMPRESA)</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim1" name="sim1" />
          <label htmlFor="sim1">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Se for SEXTA-FEIRA Colocou o lixo reciclável no cesto de lixo fora da empresa?(ATIVIDADE PARA SEXTA-FEIRAS)</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim2" name="sim2" />
          <label htmlFor="sim2">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Deixou a cozinha organizada?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim3" name="sim3" />
          <label htmlFor="sim3">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Apagou as luzes e fechou a porta da cozinha?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim4" name="sim4" />
          <label htmlFor="sim4">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Trancou cadeado da porta 1?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim5" name="sim5" />
          <label htmlFor="sim5">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Trancou cadeado da porta 2?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim6" name="sim6" />
          <label htmlFor="sim6">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificou se torneiras estão fechadas e se a válvula do mictório não está pressionada?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim7" name="sim7" />
          <label htmlFor="sim7">Sim</label>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Tirou o lixo do Banheiro e colocou no cesto fora da empresa?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim8">Sim</label>
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Trancou a porta do banheiro?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim9">Sim</label>
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Desligou da tomada e colocou o plástico do bebedouro?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim9">Sim</label>
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Deixou as chaves internas no chaveiro do operacional?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim9">Sim</label>
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Desligou a TV das CAMERAS?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim9">Sim</label>
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Desligou a TV do DASHBOARD?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim9">Sim</label>
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Desligou o Ar condicionado?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim9">Sim</label>
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Desligou as luzes do escritório?(OPERACIONAL)</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim9">Sim</label>
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Acendeu as luzes do ARMAZÉM?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim9">Sim</label>
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Retirou o cone do estacionamento PCD? </label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim9">Sim</label>
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Acionou o ALARME?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim9">Sim</label>
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Fechou a porta de entrada do ARMAZÉM</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim9">Sim</label>
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Trancou o cadeado das correntes?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim9">Sim</label>
        </div>
      </div>
      <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Algum dos motores dos portões apresenta ruídos ou travamentos?
        <br></br>
        Verifique ao menos uma vez no dia, e se caso algum dos portões for
        selecionado reporte imediatamente a gestão.</label>
        <input
          className={styles.input2}
          type="text"
          id="portoes"
          name="portoes"
        />
      </div>
      <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Houve alguma situação atípica que exigiu atenção ou ação fora do previsto
        no checklist?
        <br></br>
        Descreva brevemente
        </label>
        <input
          className={styles.input2}
          type="text"
          id="portoes"
          name="portoes"
        />
      </div>
      <button className={styles.buttonenviar}>Enviar</button>
    </div>
  );
}

export default page
