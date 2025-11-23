"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./LateralBar.module.css";
import { useRouter } from "next/navigation";
import HeaderInfo from "../../HeaderInfo/HeaderInfo";
import { useAuth } from "../../../context/AuthContext";
import { title } from "process";

function LateralBar() {
  const [tab, setTab] = useState("login");
  const [expandedMenus, setExpandedMenus] = useState({});
  const [menuAberto, setMenuAberto] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const perfisDoUsuario = user?.perfis || [];

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleTabChange = (id, route, isParent = false) => {
    setTab(id);
    if (!isParent && route) {
      router.push(route);
      setMenuAberto(false);
    }
  };

  const podeVer = (perfisPermitidos) => {
    if (!isAuthenticated) return false;
    if (!perfisPermitidos || perfisPermitidos.length === 0) return true;
    return perfisPermitidos.some((p) => perfisDoUsuario.includes(p));
  };

  const menus = [
    {
      id: "login",
      title: "Login",
      route: "/login-inicial",
      perfisPermitidos: [],
      iconInactive: "/images/iconelogin.svg",
      iconActive: "/images/iconeloginbranco.svg",
    },

    {
      id: "gerenciar-permissoes",
      title: "Gerenciar Permissões",
      route: "/gerenciar-permissao",
      perfisPermitidos: ["master"],
      iconInactive: "/images/iconepermissoesbranco.svg", //salvei com o nome errado
      iconActive: "/images/iconepermissoes.svg",
    },

    {
      id: "administrativo",
      title: "Administrativo",
      perfisPermitidos: ["master", "gestor"],
      iconInactive: "/images/iconAdm.svg",
      iconActive: "/images/iconAdmbranco.svg",
      submenus: [
        { id: "avaliacao-eventos", title: "Avaliação de Eventos", route: "", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconeavaliacao.svg", iconActive: "/images/iconeavaliacaobranco.svg" }, //EVENTOS - avaliação do evento
        { id: "justificativa-eventos", title: "Justificativas", route: "", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconrecusa.svg", iconActive: "/images/iconrecusabranco.svg" }, //EVENTOS - justifica da recusa do evento
        { id: "cadastro-funcionarios", title: "Cadastro de Funcionários", route: "", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconefuncionario.svg", iconActive: "/images/iconefuncionariobranco.svg" }, //FUNCIONARIO - cadastro
        { id: "calendario", title: "Calendário", route: "", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconcalendatio.svg", iconActive: "/images/iconecalendariobranco.svg" }, //FUNCIONARIO - eventos
        { id: "eventos", title: "Eventos", route: "", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconinteracoes.svg", iconActive: "/images/iconinteracoesbranco.svg" }, //GESTOR - eventos
        { id: "gestao-localizacao", title: "Gestão de Localização", route: "/localizacao-funcionarios", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconelocalizacao.svg", iconActive: "/images/iconelocazalicaobranco.svg" }, //LOCALIZAÇÃO - dashboard
        //BONUS{ id: "certificados", title: "Certificados", route: "", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconecertificado.svg", iconActive: "/images/iconecertificadosbranco.svg" }, CERTIFICADOS
      ],
    },

    {
      id: "comercial",
      title: "Comercial",
      perfisPermitidos: ["master", "gestor", "vendedor"],
      iconInactive: "/images/iconComercial.svg",
      iconActive: "/images/iconComercialbranco.svg",
      submenus: [
        { id: "agendamento", title: "Agendamento", route: "/agendamento", perfisPermitidos: ["master", "gestor", "vendedor"], iconInactive: "/images/iconagendamento.svg", iconActive: "/images/iconagendamentobranco.svg" },
        { id: "desempenho-vendedores", title: "Desempenho dos Vendedores", route: "/vendas", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconedesempenho.svg", iconActive: "/images/iconedesempenhobranco.svg" },
        { id: "gestao-clientes", title: "Gestão de Clientes", route: "/gestao", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconcliente.svg", iconActive: "/images/iconclientebranco.svg" },
        { id: "gestao-vendas", title: "Cotação e Coleta", route: "/gestaoComercial", perfisPermitidos: ["master", "gestor", "vendedor"], iconInactive: "/images/icongestaoVendas.svg", iconActive: "/images/icongestaoVendasbranco.svg" },
        { id: "funil-vendas", title: "Funil de Vendas", route: "/funil-vendas", perfisPermitidos: ["master", "gestor", "vendedor"], iconInactive: "/images/iconfunil.svg", iconActive: "/images/iconfunilbranco.svg" },

      ],
    },

    {
      id: "operacional",
      title: "Operacional",
      perfisPermitidos: [],
      iconInactive: "/images/iconOperacional.svg",
      iconActive: "/images/iconOperacionalbranco.svg",
      submenus: [
        { id: "area-agregado", title: "Área do Agregado", route: "/pagina-agregado", perfisPermitidos: [], iconInactive: "/images/iconeagregado.svg", iconActive: "/images/iconeagregadobranco.svg" },
        { id: "gestao-formularios", title: "Gestão de Formulários", route: "/gestaoFormularios", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconechecklist.svg", iconActive: "/images/iconechecklistbranco.svg" },
        { id: "checklists-formularios", title: "Checklists e Formulários", route: "/checklists", perfisPermitidos: [], iconActive: "/images/iconechecklistbranco (2).svg", iconInactive: "/images/iconechecklist (2).svg" },
        // BONUS { id: "gestao-motoristas", title: "Gestão dos Motoristas", route: "", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconOperacional.svg", iconActive: "/images/iconOperacionalbranco.svg"}, OPERACIONAL - motoristas
      ],
    },

    {
      id: "dashboards",
      title: "Dashboards",
      perfisPermitidos: ["master", "gestor"],
      iconInactive: "/images/iconedashboard.svg",
      iconActive: "/images/iconedashboardbranco.svg",
      route: "/dashboardPagina",
    },

    {
      id: "relatorios",
      title: "Relatórios",
      perfisPermitidos: ["master", "gestor"],
      iconInactive: "/images/iconechecklist.svg",
      iconActive: "/images/iconechecklistbranco.svg",
      submenus: [
        { id: "relatorio-adm", title: "Administrativo", route: "/relatorio-administrativo", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconAdm.svg", iconActive: "/images/iconAdmbranco.svg" }, //ADMINISTRATIVO - relatorios
        { id: "relatorio-comercial", title: "Comercial", route: "/relatorio-comercial", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconComercial.svg", iconActive: "/images/iconComercialbranco.svg" }, //COMERCIAL - relatorios
        { id: "relatorio-operacional", title: "Operacional", route: "/relatorio-operacional", perfisPermitidos: ["master", "gestor"], iconInactive: "/images/iconOperacional.svg", iconActive: "/images/iconOperacionalbranco.svg" }, //OPERACIONAL - relatorios
      ],
    },
  ];

  const visibleMenus = menus.filter((m) => {
    if (m.id === "login") return !isAuthenticated;
    if (!isAuthenticated) return false;
    return podeVer(m.perfisPermitidos);
  });

  const submenusVisiveis = (menu) => {
    return (menu.submenus || []).filter((s) => {
      if (!s.perfisPermitidos || s.perfisPermitidos.length === 0) return true;
      return s.perfisPermitidos.some((p) => perfisDoUsuario.includes(p));
    });
  };

  const isSubActive = (menu) => {
    return (menu.submenus || []).some((s) => s.id === tab);
  };

  return (
    <div className={styles.boxglobal}>
      {!menuAberto && (
        <button
          type="button"
          className={styles.hamburgerButton}
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Menu"
        >
          <div className={styles.hamburgerIcon}>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </div>
        </button>
      )}

      <aside className={`${styles.barralateral} ${menuAberto ? styles.barralateralAberta : ''}`}>
        {menuAberto && (
          <button
            type="button"
            className={`${styles.hamburgerButton} ${styles.hamburgerButtonExpandido}`}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Menu"
          >
            <div className={styles.hamburgerIcon}>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </div>
          </button>
        )}

        <div className={styles.topArea}>
          <Image
            src="/images/logoneweglobal.jpg"
            width={300}
            height={150}
            alt="Logo da Newe"
            className={styles.logoImage}
          />
          <nav className={styles.tabButtons}>
            {visibleMenus.map((menu) => {
              const childs = submenusVisiveis(menu);
              const canExpand = childs.length > 0;
              const expanded = !!expandedMenus[menu.id];
              const menuAtivo = tab === menu.id || isSubActive(menu);

              return (
                <div key={menu.id} className={styles.menuBlock}>
                  <div
                    className={`${styles.menuItem} ${menuAtivo ? styles.menuItemAtivo : ""}`}
                    onClick={() => {
                      handleTabChange(menu.id, menu.route, canExpand);
                      if (canExpand) {
                        toggleMenu(menu.id);
                      }
                    }}
                  >
                    <Image
                      src={menuAtivo ? (menu.iconActive || menu.iconInactive) : (menu.iconInactive || menu.iconActive)}
                      width={24}
                      height={24}
                      alt={`${menu.title} icon`}
                      className={styles.menuIcon}
                    />
                    <h3 className={styles.menuLabel}>{menu.title}</h3>
                    {canExpand && (
                      <span className={styles.arrow} style={{ color: menuAtivo ? "#fff" : "#9197B3" }}>
                        {expanded ? "▲" : "▼"}
                      </span>
                    )}
                  </div>

                  {canExpand && expanded && (
                    <div className={styles.submenu}>
                      {childs
                        .slice()
                        .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"))
                        .map((s) => {
                          const submenuAtivo = tab === s.id;
                          const iconInactive = s.iconInactive ?? menu.iconInactive;
                          const iconActive = s.iconActive ?? menu.iconActive;

                          return (
                            <div
                              key={s.id}
                              className={`${styles.submenuItem} ${submenuAtivo ? styles.submenuItemAtivo : ""}`}
                              onClick={() => handleTabChange(s.id, s.route)}
                            >
                              <Image
                                src={submenuAtivo ? iconActive : iconInactive}
                                width={20}
                                height={20}
                                alt={`${s.title} icon`}
                                className={styles.submenuIcon}
                              />
                              <span className={styles.submenuLabel}>{s.title}</span>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className={styles.bottomArea}>
          <HeaderInfo />
        </div>
      </aside>
    </div>
  );
}

export default LateralBar;