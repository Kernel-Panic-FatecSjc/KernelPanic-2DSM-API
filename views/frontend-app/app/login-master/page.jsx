"use client";

import styles from "./App.module.css";
import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Page() {
  const router = useRouter();
  const { login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("Bem Vindo Master");

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setIsLoading(true); 
    setErro(""); 

    if (!email || !senha) {
      setErro("Email e senha são obrigatórios.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ email, senha }), 
      });

      const data = await response.json(); 
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "E-mail ou senha inválidos.");
      }

      console.log("Login bem-sucedido:", data);

      login(data.accessToken);

      router.push("/"); 

    } catch (error) {
      setErro(error.message);
    } finally {
      setIsLoading(false); 

    }
  };

  return (
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
            src="/images/gestor.svg" 
            alt="Ícone de Master"
            className={styles.iconePainel}
          />
          <span>Acesso Master</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Email:</label>
          <div className={styles.inputWrapper}>
            <img
              src="/images/iconeemail.svg"
              alt="Ícone de email"
              className={styles.iconeInput}
            />
            <input
              type="email"
              placeholder="usuario123@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label className={styles.labeltexto}>Senha:</label>
          <div className={styles.inputWrapper}>
            <img
              src="/images/cadeadosenha.svg"
              alt="Ícone de senha"
              className={styles.iconeInput}
            />
            <input
              type="password"
              placeholder="Digite sua senha..."
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <img
              src="/images/olhinhosenha.svg"
              alt="Mostrar senha"
              className={styles.mostrarSenha}
            />
          </div>

          {erro && <p className={styles.mensagemErro}>{erro}</p>} 

          <button
            type="submit"
            className={styles.botaoLogar}
            disabled={isLoading} 
          >
            {isLoading ? "Logando..." : "Logar →"}
          </button>
        </form>
      </div>
    </div>
  );
}