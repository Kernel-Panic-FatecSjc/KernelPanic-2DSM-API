// components/HeaderInfo/HeaderInfo.jsx

"use client";

import { useAuth } from "../../context/AuthContext"; 
import styles from "./HeaderInfo.module.css";

export default function HeaderInfo() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  const nomeExibicao = user.email;

  const perfilExibicao = user.perfis && user.perfis.length > 0
    ? user.perfis[0]
    : "Visitante"; 

  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.infoContainer}>
      <div className={styles.userInfo}>
        <p className={styles.usuarioEmail}>{nomeExibicao}</p>
        <p className={styles.usuarioPerfil}>Permissão: {perfilExibicao}</p>
      </div>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>
    </div>
  );
}