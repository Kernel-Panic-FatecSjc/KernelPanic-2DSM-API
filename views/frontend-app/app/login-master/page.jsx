"use client";

import styles from "./App.module.css";
import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";



export default function page(){
      const router = useRouter();

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
          <input type="password" placeholder="Digite sua senha..." />
          
          <img
            src="/images/olhinhosenha.svg"
            alt="Mostrar senha"
            className={styles.mostrarSenha}
          />
        </div>

        <button type="submit" className={styles.botaoLogar}>
          Logar →
        </button>
      </form>
        </div>
</div>
    



    )





}