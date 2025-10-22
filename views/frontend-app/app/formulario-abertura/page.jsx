'use client';
import React, { useState } from 'react';
import styles from './App.module.css';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    qmPreenchendo: '',
    dataAberturaEmpresa: '',
    abriuEmpresa: false,
    abriuPortaoSocial: false,
    abriuPortaRolante: false,
    desbloqueouAlarme: false,
    apagouLuzesArmazem: false,
    acendeuLuzesOperacional: false,
    ligouArCondicionado: false,
    ligouTVCameras: false,
    ligouTVDashBoard: false,
    coletouChavesChaveiro: false,
    abriuPortaBanheiro: false,
    removeuCadeadoPortao1: false,
    removeuCadeadoPortao2: false,
    colocouConeEstacionamentoPCD: false,
    ligouTomadaTirouPlasticoBebedouro: false,
    colocouTapetesDevidosLugares: false,
    fezCafe: false,
    observacao: '',
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/abertura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Checklist de abertura enviado com sucesso!');
        router.push('/');
      } else {
        alert(`Erro ao enviar: ${data.error}`);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Falha ao conectar com o servidor');
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.buttonvoltar} onClick={() => router.back()}>
        ← Voltar
      </button>

      <h2>Formulário de abertura</h2>
      <p>
        Esse CHECK LIST tem a finalidade de registrar os procedimentos de ABERTURA da
        empresa NEWE LOG para garantir a perfeita execução.
      </p>

      <form onSubmit={handleSubmit} className={styles.formulario}>
        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Quem está preenchendo?</label>
          <input
            className={styles.input1}
            type="text"
            name="qmPreenchendo"
            value={form.qmPreenchendo}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Data de abertura da empresa?</label>
          <input
            className={styles.input2}
            type="date"
            name="dataAberturaEmpresa"
            value={form.dataAberturaEmpresa}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.inputtitle}>Abriu portão social?</label>
          <div className={styles.checkboxOption}>
            <input
              type="checkbox"
              name="abriuPortaoSocial"
              checked={form.abriuPortaoSocial}
              onChange={handleChange}
            />
            <label>Sim</label>
          </div>
        </div>

        <div className={styles.textgroup}>
          <label className={styles.inputtitle}>Observações</label>
          <input
            className={styles.input1}
            type="text"
            name="observacao"
            value={form.observacao}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.buttonenviar}>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Page;