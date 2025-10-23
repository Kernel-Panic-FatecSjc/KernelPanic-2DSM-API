"use client";

import styles from "./App.module.css";
import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";
import { useState } from "react";



export default function page(){
      const router = useRouter();
      const [mostrarSenha, setMostrarSenha] = useState(false);
      const handleLogin = (e) => {
        e.preventDefault(); 
      router.push("/login-localizacao"); 
       

  };
   const toggleMostrarSenha = () => {
    setMostrarSenha((prev) => !prev);
  };

    return(
    <div className={styles.container}>
        <div className={styles.lateral}>
        <Login />
      </div>
<a className={styles.linkVoltar} onClick={() => router.push("/login-inicial")}>
                      <strong>← Voltar</strong>
              </a>
        
        <div className={styles.campoLogin}>
             
        
            <h1>LOGIN</h1>

            <div className={styles.painelAcesso}>
        
        <img
          src="/images/iconeglobo.svg"
          alt="Ícone de globo"
          className={styles.iconePainel}
        />
        <span>Acesso Master</span>
      </div>


              <form className={styles.form}>
        <label>Email:</label>
        <div className={styles.inputWrapper}>
          
          <img
            src="/images/iconeemail.svg"
            alt="Ícone de email"
            className={styles.iconeInput}
          />
          <input type="email" placeholder="usuario123@gmail.com" />
        </div>

        <label className={styles.labeltexto}>Senha:</label>
        <div className={styles.inputWrapper}>
          
          <img
            src="/images/cadeadosenha.svg"
            alt="Ícone de senha"
            className={styles.iconeInput}
          />
          <input type={mostrarSenha ? "text" : "password"} placeholder="Digite sua senha..." />
          
          <img
            src="/images/olhinhosenha.svg"
            alt="Mostrar senha"
            className={styles.mostrarSenha}
             onClick={toggleMostrarSenha}
          />
        </div>

        <button type="submit" className={styles.botaoLogar} onClick={handleLogin}>
          Logar →
        </button>
      </form>
        </div>
</div>
    



    )





}