"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./App.module.css";
import ProtectRoute from "../../components/ProtectRoute";
export default function Page() {
  const router = useRouter();

  const go = (rota) => router.push(rota);

  const apiUrl = 'http://52.72.66.96:5000/';

  return (
    <ProtectRoute perfisPermitidos={["Operacional"]}>
    <div className={styles.rightContainer}>
      <h1 className={styles.title}>Relatórios Operacionais</h1>

      <div className={styles.cardsGrid}>

        
        <div className={styles.card}>
          <img src="/images/iconechecklist (2).svg" className={styles.icon} />
          <p className={styles.cardTitle}>Respostas de Formularios</p>
          <button onClick={() => go(`${apiUrl}/relatorios/operacional/respostas-formularios`)} className={styles.btn}>Visualizar</button>
        </div>

        
        <div className={styles.card}>
          <img src="/images/funcionario.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Gestao de Motoristas</p>
          <button onClick={() => go(`${apiUrl}/relatorios/operacional/motoristas`)} className={styles.btn}>Visualizar</button>
        </div>

        
        <div className={styles.card}>
          <img src="/images/iconedashboard.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Dashboard</p>
          <button onClick={() => go(`${apiUrl}/relatorios/operacional/dashboard`)} className={styles.btn}>Visualizar</button>
        </div>

      </div>
    </div>
    </ProtectRoute>

  );
}
