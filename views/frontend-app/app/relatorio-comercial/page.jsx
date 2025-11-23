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
          <img src="/images/iconfunilbranco.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Funil Vendas</p>
          <button onClick={() => go("http://localhost:5000/relatorios/comercial/funil-vendas")} className={styles.btn}>Visualizar</button>
        </div>

        
        <div className={styles.card}>
          <img src="/images/funcionario.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Funcionários</p>
          <button onClick={() => go("http://localhost:5000/relatorios/comercial/funcionarios")} className={styles.btn}>Funcionários</button>
        </div>

        
        <div className={styles.card}>
          <img src="/images/icongraficobranco.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Eventos</p>
          <button onClick={() => go("http://localhost:5000/relatorios/comercial/desempenho-vendedores")} className={styles.btn}>Desempenho Vendedores</button>
        </div>

        
        <div className={styles.card}>
          <img src="/images/icongestaoVendas.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Localização</p>
          <button onClick={() => go("http://localhost:5000/relatorios/comercial/gestao-vendas")} className={styles.btn}>Gestão Vendas</button>
        </div>

       
        <div className={styles.card}>
          <img src="/images/iconecalendariobranco.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Calendário</p>
          <button onClick={() => go("http://localhost:5000/relatorios/comercial/agendamentos")} className={styles.btn}>Agendamentos</button>
        </div>

       
        <div className={styles.card}>
          <img src="/images/iconedashboard.svg" className={styles.icon} />
          <p className={styles.cardTitle}>Dashboard</p>
          <button onClick={() => go("http://localhost:5000/relatorios/comercial/dashboard")} className={styles.btn}>Dashboard</button>
        </div>

      </div>
    </div>
  );
}
