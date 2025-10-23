'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './App.module.css';
import Login from '../../components/layout/Login/login';

export default function Page() {
  const [genero, setGenero] = useState('');
  const [bau, setBau] = useState('');
  const [seguro, setSeguro] = useState('');

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
              Quando você enviar este formulário, o proprietário verá seu nome e
              endereço de email.
            </p>

            <div className={styles.formGroup}>
              <label className={styles.inputtitle}>
                <p>
                  Gênero
                </p>
              </label>

              <div className={styles.radioGroup}>
                <input
                  id="genero_m"
                  className={styles.radioInput}
                  type="radio"
                  name="genero"
                  value="Masculino"
                  checked={genero === 'Masculino'}
                  onChange={(e) => setGenero(e.target.value)}
                />
                <label htmlFor="genero_m" className={styles.radioLabel}>
                  Masculino
                </label>

                <input
                  id="genero_f"
                  className={styles.radioInput}
                  type="radio"
                  name="genero"
                  value="Feminino"
                  checked={genero === 'Feminino'}
                  onChange={(e) => setGenero(e.target.value)}
                />
                <label htmlFor="genero_f" className={styles.radioLabel}>
                  Feminino
                </label>

                <input
                  id="genero_n"
                  className={styles.radioInput}
                  type="radio"
                  name="genero"
                  value="Prefiro não informar"
                  checked={genero === 'Prefiro não informar'}
                  onChange={(e) => setGenero(e.target.value)}
                />
                <label htmlFor="genero_n" className={styles.radioLabel}>
                  Prefiro não informar
                </label>
              </div>
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Nome completo do motorista</label>
              <input className={styles.input1} type="text" id="nomeMotorista" name="nomeMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>CNPJ (Pergunta obrigatória para pessoas jurídicas)</label>
              <input className={styles.input1} type="text" id="CNPJMotorista" name="CNPJMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>CPF</label>
              <input className={styles.input1} type="text" id="CPFMotorista" name="CPFMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Data de nascimento</label>
              <input className={styles.input1} type="date" id="dataMotorista" name="dataMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Cidade de nascimento</label>
              <input className={styles.input1} type="text" id="cidadeMotorista" name="cidadeMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Telefone</label>
              <input className={styles.input1} type="text" id="telefoneMotorista" name="telefoneMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Email</label>
              <input className={styles.input1} type="text" id="emailMotorista" name="emailMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>RG</label>
              <input className={styles.input1} type="text" id="RGMotorista" name="RGMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Data de emissão RG</label>
              <input className={styles.input1} type="date" id="RGEmissãoMotorista" name="RGEmissãoMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Órgão expedidor</label>
              <input className={styles.input1} type="text" id="órgãoMotorista" name="órgãoMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Nome do pai</label>
              <input className={styles.input1} type="text" id="nomePaiMotorista" name="nomePaiMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Nome da mãe</label>
              <input className={styles.input1} type="text" id="nomeMãeMotorista" name="nomeMãeMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Pis/Pasep</label>
              <input className={styles.input1} type="text" id="pisMotorista" name="pisMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>CEP</label>
              <input className={styles.input1} type="text" id="CEPMotorista" name="CEPMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Endereço (Rua, Nº, Bairro, Cidade)</label>
              <input className={styles.input1} type="text" id="enderecoMotorista" name="enderecoMotorista" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Nome completo do proprietário do veículo</label>
              <input className={styles.input1} type="text" id="nomeProprietarioVeiculo" name="nomeProprietarioVeiculo" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Placa</label>
              <input className={styles.input1} type="text" id="placaVeiculo" name="placaVeiculo" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Marca</label>
              <input className={styles.input1} type="text" id="marcaVeiculo" name="marcaVeiculo" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Modelo</label>
              <input className={styles.input1} type="text" id="modeloVeiculo" name="modeloVeiculo" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Cor</label>
              <input className={styles.input1} type="text" id="corVeiculo" name="corVeiculo" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Ano de fabricação</label>
              <input className={styles.input1} type="text" id="anoVeiculo" name="anoVeiculo" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Cilindrada</label>
              <input className={styles.input1} type="text" id="cilindradaVeiculo" name="cilindradaVeiculo" />
            </div>

            <div className={styles.formGroupBau}>
              <label className={styles.inputtitle}>
                <p>Possui baú ou suporte para carga?</p>
              </label>
              <div className={styles.radioGroup}>
                <input
                  id="bau_sim"
                  className={styles.radioInput}
                  type="radio"
                  name="bau"
                  value="Sim"
                  checked={bau === 'Sim'}
                  onChange={(e) => setBau(e.target.value)}
                />
                <label htmlFor="bau_sim" className={styles.radioLabel}>Sim</label>

                <input
                  id="bau_nao"
                  className={styles.radioInput}
                  type="radio"
                  name="bau"
                  value="Não"
                  checked={bau === 'Não'}
                  onChange={(e) => setBau(e.target.value)}
                />
                <label htmlFor="bau_nao" className={styles.radioLabel}>Não</label>
              </div>
            </div>

            <div className={styles.formGroupSeguro}>
              <label className={styles.inputtitle}>
                <p>Possui seguro?</p>
              </label>
              <div className={styles.radioGroup}>
                <input
                  id="seguro_sim"
                  className={styles.radioInput}
                  type="radio"
                  name="seguro"
                  value="Sim"
                  checked={seguro === 'Sim'}
                  onChange={(e) => setSeguro(e.target.value)}
                />
                <label htmlFor="seguro_sim" className={styles.radioLabel}>Sim</label>

                <input
                  id="seguro_nao"
                  className={styles.radioInput}
                  type="radio"
                  name="seguro"
                  value="Não"
                  checked={seguro === 'Não'}
                  onChange={(e) => setSeguro(e.target.value)}
                />
                <label htmlFor="seguro_nao" className={styles.radioLabel}>Não</label>
              </div>
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Qual valor mínimo você cobraria por saída?</label>
              <input className={styles.input1} type="text" id="valorMin" name="valorMin" />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Qual valor mínimo você cobraria por KM rodado?</label>
              <input className={styles.input1} type="text" id="valorMinKM" name="valorMinKM" />
            </div>
            <button type="submit" className={styles.buttonenviar}>Enviar</button>
          </main>
        </div>
      </div>
    </div>
  );
}