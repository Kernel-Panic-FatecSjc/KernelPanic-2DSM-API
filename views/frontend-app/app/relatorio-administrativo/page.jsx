"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./App.module.css";

export default function Page() {
  const router = useRouter();

  const go = (rota) => router.push(rota);

  return (
    <div className={styles.rightContainer}>
      <h1 className={styles.title}>Relatórios Administrativo</h1>

      <div className={styles.cardsGrid}>

        
        <div className={styles.card}>
          <img src="/images/estrela.png" className={styles.icon} />
          <p className={styles.cardTitle}>Avaliação Eventos</p>
          <button onClick={() => go("http://localhost:5000/relatorios/administrativo/avaliacao-eventos")} className={styles.btn}>Visualizar</button>
        </div>
   
        
    

        <div className={styles.card}>
          <img src="/images/funcionario.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Funcionários</p>
          <button onClick={() => go("http://localhost:5000/relatorios/administrativo/funcionarios")} className={styles.btn}>Visualizar</button>
        </div>

        
        <div className={styles.card}>
          <img src="/images/calendarioestrela.png" className={styles.icon} />
          <p className={styles.cardTitle}>Eventos</p>
          <button onClick={() => go("http://localhost:5000/relatorios/administrativo/eventos")} className={styles.btn}>Visualizar</button>
        </div>

        
        <div className={styles.card}>
          <img src="/images/iconelocalizacao.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Localização</p>
          <button onClick={() => go("http://localhost:5000/relatorios/administrativo/localizacao")} className={styles.btn}>Visualizar</button>
        </div>

       
        <div className={styles.card}>
          <img src="/images/iconecalendariobranco.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Calendário</p>
          <button onClick={() => go("http://localhost:5000/relatorios/administrativo/calendario")} className={styles.btn}>Visualizar</button>
        </div>

       
        <div className={styles.card}>
          <img src="/images/iconedashboard.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Dashboard</p>
          <button onClick={() => go("http://localhost:5000/relatorios/administrativo/dashboard")} className={styles.btn}>Visualizar</button>
        </div>

      </div>
    </div>
  );
}
