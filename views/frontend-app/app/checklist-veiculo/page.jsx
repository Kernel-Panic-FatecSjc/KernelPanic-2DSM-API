"use client";

import React, { useState } from "react";
import styles from "./App.module.css";
import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    CPF: "",
    placa: "",
    tipo_veiculo: "",
    nivel_oleo: "",
    vazamento_oleo: "",
    nivel_agua: "",
    pneus: {
      PNE: "",
      PTE: "",
      PTD: "",
      PDD: "",
    },
    observacao: "",
    responsavel: "",
    outro: "",
  });

  const [imagens, setImagens] = useState({
    foto_motor: null,
    foto_troca_oleo: null,
    fotos_pneus: [],
    fotos_gerais: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["PNE", "PTE", "PTD", "PDD"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        pneus: { ...prev.pneus, [name]: value },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length === 1) {
      setImagens((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setImagens((prev) => ({
        ...prev,
        [name]: Array.from(files),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validação simplificada
    if (
      !form.nome.trim() ||
      !form.CPF.trim() ||
      !form.placa.trim() ||
      !form.tipo_veiculo ||
      !form.nivel_oleo ||
      !form.vazamento_oleo ||
      !form.nivel_agua ||
      !form.pneus.PNE ||
      !form.pneus.PTE ||
      !form.pneus.PTD ||
      !form.pneus.PDD ||
      !form.responsavel ||
      !imagens.foto_motor ||
      !imagens.foto_troca_oleo ||
      imagens.fotos_pneus.length === 0 ||
      imagens.fotos_gerais.length === 0
    ) {
      alert("⚠️ Por favor, preencha todos os campos obrigatórios antes de enviar.");
      return;
    }

    if (form.responsavel === "Outro" && !form.outro.trim()) {
      alert("⚠️ Por favor, informe o nome do responsável em 'Outro'.");
      return;
    }

    try {

      console.log("Formulário enviado:", form);
      console.log("Arquivos enviados:", imagens);

      const formData = new FormData();
      const respostas = { ...form };
      formData.append("tipo", "veiculo");
      formData.append("respostas", JSON.stringify(respostas));

      // enviar arquivos
      Object.entries(imagens).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file) => formData.append(key, file));
        } else if (value) {
          formData.append(key, value);
        }
      });

      const response = await fetch("http://localhost:5000/agregado", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao enviar checklist");

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      alert("Checklist de veículo agregado enviado com sucesso!");

      setForm({
        nome: "",
        CPF: "",
        placa: "",
        tipo_veiculo: "",
        nivel_oleo: "",
        vazamento_oleo: "",
        nivel_agua: "",
        pneus: { PNE: "", PTE: "", PTD: "", PDD: "" },
        observacao: "",
        responsavel: "",
        outro: "",
      });
      setImagens({
        foto_motor: null,
        foto_troca_oleo: null,
        fotos_pneus: [],
        fotos_gerais: [],
      });
    } catch (error) {
      console.error("❌ Erro:", error);
      alert("Erro ao enviar checklist. Tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lateral}>
        <Login />
      </div>

      <div className={styles.formularioWrapper}>
        <a className={styles.link} onClick={() => router.push("/pagina-agregado")}>
          <strong>← Voltar</strong>
        </a>

        <div className={styles.formulario}>
          <h1>CHECKLIST de Veículos Agregados</h1>
      <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            <strong>Nome completo do motorista:</strong>
          </label>
          <input
            className={styles.input}
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
          />

          <label className={styles.label}>
            <strong>CPF:</strong>
          </label>
          <input
            className={styles.input}
            type="text"
            name="CPF"
            value={form.CPF}
            onChange={handleChange}
          />

          <label className={styles.label}><strong>Placa do veículo:</strong></label>
          <p>Somente LETRAS e NÚMEROS (sem traço)</p>
          <input
            className={styles.input}
            type="text"
            name="placa"
            value={form.placa}
            onChange={handleChange}
          />

          <label className={styles.label}><strong>Tipo de Veículo:</strong></label>
          <div className={styles.radioGroup}>
            {["FIORINO", "VAN", "VUC", "3/4", "TOCO", "TRUCK", "CARRETA"].map((tipo) => (
              <div key={tipo}>
                <input
                  type="radio"
                  id={tipo}
                  name="tipo_veiculo"
                  value={tipo}
                  checked={form.tipo_veiculo === tipo}
                  onChange={handleChange}
                />
                <label htmlFor={tipo}>{tipo}</label>
              </div>
            ))}
          </div>

          <h2><strong>MOTOR</strong></h2>
          <p>Verificação do vazamento e nível de óleo e água no motor do veículo.</p>

          <label className={styles.label}><strong>VISTORIA</strong></label>
          <p>
            1 - Verifique o nível do óleo usando a vareta.<br />
            2 - Verifique se há poças ou gotas de óleo no motor ou no chão.<br />
            3 - Verifique se a água do reservatório está no nível.
          </p>

          <table className={styles.radioTable}>
            <thead>
              <tr>
                <th></th>
                <th>SIM</th>
                <th>NÃO</th>
                <th>NA</th>
              </tr>
            </thead>
            <tbody>
              {[
                { nome: "nivel_oleo", label: "Nível de ÓLEO está bom?" },
                { nome: "vazamento_oleo", label: "Livre de vazamentos de ÓLEO?" },
                { nome: "nivel_agua", label: "Nível de ÁGUA do reservatório está bom?" },
              ].map((item) => (
                <tr key={item.nome}>
                  <td>{item.label}</td>
                  {["SIM", "NAO", "NA"].map((valor) => (
                    <td key={valor}>
                      <input
                        type="radio"
                        name={item.nome}
                        value={valor}
                        checked={form[item.nome] === valor}
                        onChange={handleChange}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <label className={styles.label}><strong>Foto do motor do veículo</strong></label>
          <input
            className={styles.inputImage}
            type="file"
            name="foto_motor"
            accept="image/*"
            onChange={handleFileChange}
          />

          <label className={styles.label}><strong>Foto etiqueta da última troca de óleo</strong></label>
          <input
            className={styles.inputImage}
            type="file"
            name="foto_troca_oleo"
            accept="image/*"
            onChange={handleFileChange}
          />

          <h2><strong>PNEUS</strong></h2>
          <p>Verificação do estado de conservação dos PNEUS do veículo.</p>
          <table className={styles.radioTable}>
            <thead>
              <tr>
                <th>Pneus estão LISOS?</th>
                <th>SIM</th>
                <th>NÃO</th>
              </tr>
            </thead>
            <tbody>
              {["PNE", "PTE", "PTD", "PDD"].map((pneu) => (
                <tr key={pneu}>
                  <td>
                    {pneu} - Pneu{" "}
                    {pneu === "PNE"
                      ? "Dianteiro Esquerdo"
                      : pneu === "PTE"
                      ? "Traseiro Esquerdo"
                      : pneu === "PTD"
                      ? "Traseiro Direito"
                      : "Dianteiro Direito"}
                  </td>
                  {["SIM", "NAO"].map((valor) => (
                    <td key={valor}>
                      <input type="radio" name={pneu} value={valor} checked={form.pneus[pneu] === valor} onChange={handleChange} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <label className={styles.label}><strong>FOTOS GERAIS - Comprobatórias</strong></label>
          <p>
            1 - PNE - Pneu Dianteiro Esquerdo <br />
            2 - PTE - Pneu Traseiro Esquerdo <br />
            3 - PTD - Pneu Traseiro Direito <br />
            4 - PDD - Pneu Dianteiro Direito
          </p>
          <input
            className={styles.inputImage}
            type="file"
            name="fotos_pneus"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />

          <h2><strong>CONSERVAÇÃO | APARÊNCIA | SEGURANÇA</strong></h2>
          <p>Verifique o estado geral do veículo.</p>

          <label className={styles.label}><strong>FOTOS GERAIS</strong></label>
          <p>
            (Adicione 4 fotos do veículo)<br />
            1 - Frente do veículo<br />
            2 - Lateral Direita<br />
            3 - Lateral Esquerda<br />
            4 - Traseira com a porta ABERTA
          </p>
          <input
            className={styles.inputImage}
            type="file"
            name="fotos_gerais"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />

          <label className={styles.label}><strong>OBSERVAÇÕES SOBRE O VEÍCULO</strong></label>
          <input
            className={styles.input}
            type="text"
            name="observacao"
            value={form.observacao}
            onChange={handleChange}
          />

          <label className={styles.label}><strong>Responsável pela Vistoria</strong></label>
          <div className={styles.radioGroupCircles}>
            {[
              "Diego Sávio",
              "Gabriel Andrade",
              "Igor Carvalho",
              "Junior Pereira",
              "Luis Oliveira",
              "Ruan Hofacher",
              "Samuel Lucas",
              "Tatiane Dias"
            ].map((nome) => (
              <div className={styles.radioItem} key={nome}>
                <input
                  type="radio"
                  name="responsavel"
                  value={nome}
                  checked={form.responsavel === nome}
                  onChange={handleChange}
                />
                <span>{nome}</span>
              </div>
            ))}
            <div className={styles.radioItem}>
              <input
                type="radio"
                name="responsavel"
                value="Outro"
                checked={form.responsavel === "Outro"}
                onChange={handleChange}
              />
              <span>Outro:</span>
              <input
                className={styles.input}
                type="text"
                id="outro"
                name="outro"
                value={form.outro}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className={styles.btn_enviar} type="submit">
            Enviar
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}
