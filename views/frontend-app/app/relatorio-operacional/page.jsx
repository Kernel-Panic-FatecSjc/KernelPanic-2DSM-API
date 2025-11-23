"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./App.module.css";

export default function Page() {
  const router = useRouter();

  const go = (rota) => router.push(rota);

  return (
    <div className={styles.rightContainer}>
      <h1 className={styles.title}>Relatórios Operacionais</h1>

      <div className={styles.cardsGrid}>

        
        <div className={styles.card}>
          <img src="/images/iconechecklist (2).svg" className={styles.icon} />
          <p className={styles.cardTitle}>Respostas de Formularios</p>
          <button onClick={() => go("http://localhost:5000/relatorios/operacional/respostas-formularios")} className={styles.btn}>Visualizar</button>
        </div>

        
        <div className={styles.card}>
          <img src="/images/funcionario.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Gestao de Motoristas</p>
          <button onClick={() => go("http://localhost:5000/relatorios/operacional/motoristas")} className={styles.btn}>Visualizar</button>
        </div>

        
        <div className={styles.card}>
          <img src="/images/iconedashboard.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Dashboard</p>
          <button onClick={() => go("http://localhost:5000/relatorios/operacional/dashboard")} className={styles.btn}>Visualizar</button>
        </div>

      </div>
    </div>
  );
}
