'use client';
import React, { useState } from "react";
import styles from "./App.module.css";
import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";

export default function Page() {
  const router = useRouter();
   const [form, setForm] = useState({
    genero: "",
    nomeMotorista: "",
    CNPJMotorista: "",
    CPFMotorista: "",
    dataMotorista: "",
    cidadeMotorista: "",
    telefoneMotorista: "",
    emailMotorista: "",
    RGMotorista: "",
    RGEmissaoMotorista: "",
    orgaoMotorista: "",
    nomePaiMotorista: "",
    nomeMaeMotorista: "",
    pisMotorista: "",
    CEPMotorista: "",
    enderecoMotorista: "",
    nomeProprietarioVeiculo: "",
    placaVeiculo: "",
    marcaVeiculo: "",
    modeloVeiculo: "",
    corVeiculo: "",
    anoVeiculo: "",
    cilindradaVeiculo: "",
    bau: "",
    seguro: "",
    valorMin: "",
    valorMinKM: "",
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.genero || !form.nomeMotorista || !form.placaVeiculo) {
    alert("⚠️ Preencha todos os campos obrigatórios.");
    return;
  }

  try {
    const payload = {
      tipo: "agregado",
      respostas: form
    };

    const response = await fetch("http://localhost:5000/cadastro_agregado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao enviar checklist: ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Resposta do servidor:", data);
    alert("Checklist enviado com sucesso!");

    // Resetar formulário
    setForm({
      genero: "",
      nomeMotorista: "",
      CNPJMotorista: "",
      CPFMotorista: "",
      dataMotorista: "",
      cidadeMotorista: "",
      telefoneMotorista: "",
      emailMotorista: "",
      RGMotorista: "",
      RGEmissaoMotorista: "",
      orgaoMotorista: "",
      nomePaiMotorista: "",
      nomeMaeMotorista: "",
      pisMotorista: "",
      CEPMotorista: "",
      enderecoMotorista: "",
      nomeProprietarioVeiculo: "",
      placaVeiculo: "",
      marcaVeiculo: "",
      modeloVeiculo: "",
      corVeiculo: "",
      anoVeiculo: "",
      cilindradaVeiculo: "",
      bau: "",
      seguro: "",
      valorMin: "",
      valorMinKM: "",
    });
  } catch (error) {
    console.error("❌ Erro:", error);
    alert(error.message);
  }
};


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
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.inputtitle}>
                <p>
                  Gênero
                </p>
              </label>

              <div className={styles.radioGroup}>
                {["Masculino", "Feminino", "Prefiro não informar"].map((opcao) => (
                  <React.Fragment key={opcao}>
                    <input
                      type="radio"
                      id={`genero_${opcao}`}
                      name="genero"
                      value={opcao}
                      checked={form.genero === opcao}
                      onChange={handleChange}
                      className={styles.radioInput}
                    />
                    <label htmlFor={`genero_${opcao}`} className={styles.radioLabel}>
                      {opcao}
                    </label>
                  </React.Fragment>
                ))}
              </div>

            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Nome completo do motorista</label>
              <input
                className={styles.input1}
                type="text"
                id="nomeMotorista"
                name="nomeMotorista"
                value={form.nomeMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>CNPJ (Pergunta obrigatória para pessoas jurídicas)</label>
              <input
                className={styles.input1}
                type="text"
                id="CNPJMotorista"
                name="CNPJMotorista"
                value={form.CNPJMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>CPF</label>
              <input
                className={styles.input1}
                type="text"
                id="CPFMotorista"
                name="CPFMotorista"
                value={form.CPFMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Data de nascimento</label>
              <input
                className={styles.input1}
                type="date"
                id="dataMotorista"
                name="dataMotorista"
                value={form.dataMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Cidade de nascimento</label>
              <input
                className={styles.input1}
                type="text"
                id="cidadeMotorista"
                name="cidadeMotorista"
                value={form.cidadeMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Telefone</label>
              <input
                className={styles.input1}
                type="text"
                id="telefoneMotorista"
                name="telefoneMotorista"
                value={form.telefoneMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Email</label>
              <input
                className={styles.input1}
                type="text"
                id="emailMotorista"
                name="emailMotorista"
                value={form.emailMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>RG</label>
              <input
                className={styles.input1}
                type="text"
                id="RGMotorista"
                name="RGMotorista"
                value={form.RGMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Data de emissão RG</label>
              <input
                className={styles.input1}
                type="date"
                id="RGEmissaoMotorista"
                name="RGEmissaoMotorista"
                value={form.RGEmissaoMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Órgão expedidor</label>
              <input
                className={styles.input1}
                type="text"
                id="orgaoMotorista"
                name="orgaoMotorista"
                value={form.orgaoMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Nome do pai</label>
              <input
                className={styles.input1}
                type="text"
                id="nomePaiMotorista"
                name="nomePaiMotorista"
                value={form.nomePaiMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Nome da mãe</label>
              <input
                className={styles.input1}
                type="text"
                id="nomeMaeMotorista"
                name="nomeMaeMotorista"
                value={form.nomeMaeMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Pis/Pasep</label>
              <input
                className={styles.input1}
                type="text"
                id="pisMotorista"
                name="pisMotorista"
                value={form.pisMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>CEP</label>
              <input
                className={styles.input1}
                type="text"
                id="CEPMotorista"
                name="CEPMotorista"
                value={form.CEPMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Endereço (Rua, Nº, Bairro, Cidade)</label>
              <input
                className={styles.input1}
                type="text"
                id="enderecoMotorista"
                name="enderecoMotorista"
                value={form.enderecoMotorista}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Nome completo do proprietário do veículo</label>
              <input
                className={styles.input1}
                type="text"
                id="nomeProprietarioVeiculo"
                name="nomeProprietarioVeiculo"
                value={form.nomeProprietarioVeiculo}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Placa</label>
              <input
                className={styles.input1}
                type="text"
                id="placaVeiculo"
                name="placaVeiculo"
                value={form.placaVeiculo}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Marca</label>
              <input
                className={styles.input1}
                type="text"
                id="marcaVeiculo"
                name="marcaVeiculo"
                value={form.marcaVeiculo}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Modelo</label>
              <input
                className={styles.input1}
                type="text"
                id="modeloVeiculo"
                name="modeloVeiculo"
                value={form.modeloVeiculo}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Cor</label>
              <input
                className={styles.input1}
                type="text"
                id="corVeiculo"
                name="corVeiculo"
                value={form.corVeiculo}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Ano de fabricação</label>
              <input
                className={styles.input1}
                type="text"
                id="anoVeiculo"
                name="anoVeiculo"
                value={form.anoVeiculo}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Cilindrada</label>
              <input
                className={styles.input1}
                type="text"
                id="cilindradaVeiculo"
                name="cilindradaVeiculo"
                value={form.cilindradaVeiculo}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroupBau}>
              <label className={styles.inputtitle}>
                <p>Possui baú ou suporte para carga?</p>
              </label>
              <div className={styles.radioGroup}>
                {["Sim", "Não"].map((opcao) => (
                  <React.Fragment key={opcao}>
                    <input
                      type="radio"
                      id={`bau_${opcao}`}
                      name="bau"
                      value={opcao}
                      checked={form.bau === opcao}
                      onChange={handleChange}
                      className={styles.radioInput}
                    />
                    <label htmlFor={`bau_${opcao}`} className={styles.radioLabel}>
                      {opcao}
                    </label>
                  </React.Fragment>
                ))}
              </div>

            </div>

            <div className={styles.formGroupSeguro}>
              <label className={styles.inputtitle}>
                <p>Possui seguro?</p>
              </label>
              <div className={styles.radioGroup}>
                {["Sim", "Não"].map((opcao) => (
                  <React.Fragment key={opcao}>
                    <input
                      type="radio"
                      id={`seguro_${opcao}`}
                      name="seguro"
                      value={opcao}
                      checked={form.seguro === opcao}
                      onChange={handleChange}
                      className={styles.radioInput}
                    />
                    <label htmlFor={`seguro_${opcao}`} className={styles.radioLabel}>
                      {opcao}
                    </label>
                  </React.Fragment>
                ))}
              </div>

            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Qual valor mínimo você cobraria por saída?</label>
              <input
                className={styles.input1}
                type="text"
                id="valorMin"
                name="valorMin"
                value={form.valorMin}
                onChange={handleChange}
              />
            </div>

            <div className={styles.textgroup}>
              <label className={styles.inputtitle}>Qual valor mínimo você cobraria por KM rodado?</label>
              <input
                className={styles.input1}
                type="text"
                id="valorMinKM"
                name="valorMinKM"
                value={form.valorMinKM}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={styles.buttonenviar}>Enviar</button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}