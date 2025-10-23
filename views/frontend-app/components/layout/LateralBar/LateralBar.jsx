"use client";
import React, { useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import styles from "./LateralBar.module.css";
import { useRouter } from "next/navigation";

const tab_data = [
  {
    title: "interações",
    id: "interações",
    route: "/interacoes",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconinteracoesbranco.svg"
              : "/images/iconinteracoes.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Interações"
          className={styles.icone}
        />
        <h3>Interações</h3>
      </>
    ),
  },
  {
    title: "vendas",
    id: "vendas",
    route: "/vendas",
    content: (active) => (
      <>
        <Image
          src={
            active ? "/images/iconvendasbranco.svg" : "/images/iconvendas.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Vendas"
          className={styles.icone}
        />
        <h3>Vendas</h3>
      </>
    ),
  },
  {
    title: "cliente",
    id: "cliente",
    route: "/cliente",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconclientebranco.svg"
              : "/images/iconcliente.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Cliente"
          className={styles.icone}
        />
        <h3>Cliente</h3>
      </>
    ),
  },
  {
    title: "gestao",
    id: "gestao",
    route: "/gestao",
    content: (active) => (
      <>
        <Image
          src={
            active ? "/images/icongestaobranco.svg" : "/images/icongestao.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Gestão"
          className={styles.icone}
        />
        <h3>Gestão</h3>
      </>
    ),
  },
  {
    title: "funil",
    id: "funil",
    route: "/funil-vendas",
    content: (active) => (
      <>
        <Image
          src={
            active ? "/images/iconfunilbranco.svg" : "/images/iconfunil.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Funil de Vendas"
          className={styles.icone}
        />
        <h3>Funil de vendas</h3>
      </>
    ),
  },
  {
    title: "agendamento",
    id: "agendamento",
    route: "/agendamento",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconagendamentobranco.svg"
              : "/images/iconagendamento.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Agendamento"
          className={styles.icone}
        />
        <h3>Agendamento</h3>
      </>
    ),
  },
  {
    title: "grafico",
    id: "grafico",
    route: "/grafico",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/icongraficobranco.svg"
              : "/images/icongrafico.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Gráfico"
          className={styles.icone}
        />
        <h3>Gráfico</h3>
      </>
    ),
  },
  {
    title: "gestao",
    id: "gestaoRespostas",
    route: "/GestaoFormularios",
    content: (active) => (
      <>
        <Image
          src={
            active ? "/images/iconfunilbranco.svg" : "/images/iconfunil.svg"
          }
          width={24}
          height={25}
          alt="Gestão de Formularios"
          className={styles.icone}
        />
        <h3>Gestão dos Formulários</h3>
      </>
    ),
  },
   {
    title: "dashboardsFormularios",
    id: "dashboardsFormularios",
    route: "/dashboardsFormularios",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconclientebranco.svg"
              : "/images/iconcliente.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Cliente"
          className={styles.icone}
        />
        <h3>Dashboards Formularios</h3>
      </>
    ),
  },
];

function LateralBar() {
  const [tab, setTab] = useState("interações");
  const router = useRouter();

  const handleTabChange = (id, route) => {
    setTab(id);
    router.push(route);
  };

  return (
    <div className={styles.boxglobal}>
      <div className={styles.barralateral}>
        <Image
          src="/images/logoneweglobal.jpg"
          width={300}
          height={150}
          alt="Logo da Newe"
        />
        <div className={styles.tabButtons}>
          {tab_data.map((t) => (
            <TabButton
              key={t.id}
              selectTab={() => handleTabChange(t.id, t.route)}
              active={tab === t.id}
            >
              {t.content(tab === t.id)}
            </TabButton>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LateralBar;
