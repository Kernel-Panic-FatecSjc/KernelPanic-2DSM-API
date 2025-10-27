"use client";
import React, { useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import styles from "./LateralBar.module.css";
import { useRouter } from "next/navigation";
import HeaderInfo from "../../HeaderInfo/HeaderInfo";
import { useAuth } from "../../../context/AuthContext";

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
    perfisPermitidos: ["master"], //
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
    perfisPermitidos: ["master","gestor","vendedor"], //
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
    perfisPermitidos: ["master","gestor","vendedor"], //
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
    perfisPermitidos: ["master","gestor","vendedor"], //
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
    perfisPermitidos: ["master","gestor"], //
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
    perfisPermitidos: ["master","gestor"], //
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
    perfisPermitidos: ["master","gestor"], //
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
    title: "funil-vendas",
    id: "funil-vendas",
    route: "/funil-vendas",
    perfisPermitidos: ["master","gestor","vendedor"], //
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconedesempenhobranco.svg"
              : "/images/iconedesempenho.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Funil de Vendas"
          className={styles.icone}
        />
        <h3>Funil de Vendas</h3>
      </>
    ),
  },
  {
    title: "gestao-comercial",
    id: "gestao-comercial",
    route: "/gestaoComercial",
    perfisPermitidos: ["master","gestor","vendedor"], //
    content: (active) => (
      <>
        <Image
          src={
            active ? "/images/icongestaobranco.svg" : "/images/icongestao.svg"
          }
          width={24}
          height={25}
          alt="Ícone de Gestão Comercial"
          className={styles.icone}
        />
        <h3>Gestão Comercial</h3>
      </>
    ),
  },
  {
    title: "gestao-clientes",
    id: "gestao-clientes",
    route: "/gestao",
    perfisPermitidos: ["master","gestor",], //
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
    perfisPermitidos: ["master","gestor"], //
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

  const { user, isAuthenticated } = useAuth();
  const perfisDoUsuario = user?.perfis || []; 
  const handleTabChange = (id, route) => {
    setTab(id);
    router.push(route);
  };

  const linksVisiveis = tab_data.filter(tab => {
    if (tab.id === 'login') {
      return !isAuthenticated; 
    }

    if (!isAuthenticated) {
      return false;
    }

    if (!tab.perfisPermitidos) {
      return true;
    }
    return tab.perfisPermitidos.some(perfil => perfisDoUsuario.includes(perfil));
  });
  

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
          {linksVisiveis.map((t) => (
            <TabButton
              key={t.id}
              selectTab={() => handleTabChange(t.id, t.route)}
              active={tab === t.id}
            >
              {t.content(tab === t.id)}
            </TabButton>
            
          ))}
             <div >
          <HeaderInfo />
        </div>
        </div>

     

      </div>
    </div>
  );
}

export default LateralBar;