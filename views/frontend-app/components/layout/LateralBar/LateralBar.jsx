"use client";
import React, { useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import styles from "./LateralBar.module.css";
import { useRouter } from "next/navigation";

const tab_data = [
  {

    title: "login",
    id: "login",
    route: "/login-inicial",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconeloginbranco.svg"
              : "/images/iconelogin.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Login"
          className={styles.icone}
        />
        <h3>Login</h3>
      </>
    ),
  },
  {
    title: "gerenciar-permissoes",
    id: "gerenciar-permissoes",
    route: "/gerenciar-permissao",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconepermissoes.svg"
              : "/images/iconepermissoesbranco.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Gerenciar Permissões"
          className={styles.icone}
        />
        <h3>Gerenciar Permissões</h3>
      </>
    ),
  },
  {
    title: "agendamento-comercial",
    id: "agendamento-comercial",
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
          alt="Ícone de Agendamento Comercial"
          className={styles.icone}
        />
        <h3>Agendamento Comercial</h3>
      </>
    ),
  },
  {
    title: "area-agregados",
    id: "area-agregados",
    route: "/pagina-agregado",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconagregadobranco.svg"
              : "/images/iconagregado.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Área Agregados"
          className={styles.icone}
        />
        <h3>Área do Agregado</h3>
      </>
    ),
  },
  {
    title: "checklists-formularios",
    id: "checklists-formularios",
    route: "/checklists",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconechecklistbranco.svg"
              : "/images/iconechecklist.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Checklists e Formulários"
          className={styles.icone}
        />
        <h3>Checklists e Formulários</h3>
      </>
    ),
  },
  {
    title: "dashboard-comercial",
    id: "dashboard-comercial",
    route: "/dashboardsFormularios",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconedashboardbranco.svg"
              : "/images/iconedashboard.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Dashboard Comercial"
          className={styles.icone}
        />
        <h3>Dashboard Comercial</h3>
      </>
    ),
  },
  {
    title: "dashboard-vendas",
    id: "dashboard-vendas",
    route: "/grafico",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconedashboardbranco.svg"
              : "/images/iconedashboard.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Dashboard de Vendas"
          className={styles.icone}
        />
        <h3>Dashboard de Vendas</h3>
      </>
    ),
  },
  {
    title: "desempenho-vendedores",
    id: "desempenho-vendedores",
    route: "/vendas",
    content: (active) => (
      <>
        <Image
          src={
            active ? "/images/iconedesempenhobranco.svg" : "/images/iconedesempenho.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Desempenho dos Vendedores"
          className={styles.icone}
        />
        <h3>Desempenho dos Vendedores</h3>
      </>
    ),
  },
  {
    title: "gestao-clientes",
    id: "gestao-clientes",
    route: "/gestao",
    content: (active) => (
      <>
        <Image
          src={
            active ? "/images/icongestaobranco.svg" : "/images/icongestao.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Gestão de Clientes"
          className={styles.icone}
        />
        <h3>Gestão de Clientes</h3>
      </>
    ),
  },
  {
    title: "gestao-formularios",
    id: "gestao-formularios",
    route: "/gestaoFormularios",
    content: (active) => (
      <>
        <Image
          src={
            active ? "/images/icongestaobranco.svg" : "/images/icongestao.svg"
          }
          width={24}
          height={25}
          alt="Gestão de Formulários"
          className={styles.icone}
        />
        <h3>Gestão de Formulários</h3>
      </>
    ),
  },
];

function LateralBar() {
  const [tab, setTab] = useState("login");
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