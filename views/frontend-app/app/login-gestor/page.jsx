"use client";

import styles from "./App.module.css";
import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // 1. IMPORTE O USEAUTH

export default function Page() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("Bem Vindo Gestor");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento padrão da página
    setIsLoading(true); // Ativa o estado de carregamento
    setErro(""); // Limpa erros antigos

    // 1. Validar se os campos não estão vazios
    if (!email || !senha) {
      setErro("Email e senha são obrigatórios.");
      setIsLoading(false);
      return;
    }

    try {
      // 2. Enviar a requisição para o seu backend
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Avisa o backend que estamos enviando JSON
        },
        body: JSON.stringify({ email, senha }), // Envia os dados do estado como JSON
      });

      const data = await response.json(); // Lê a resposta do backend
      console.log(data);
      // 3. Lidar com a resposta
      if (!response.ok) {
        // Se o backend retornou um erro (ex: 401 Senha inválida)
        throw new Error(data.message || "E-mail ou senha inválidos.");
      }

      // 4. SUCESSO!
      console.log("Login bem-sucedido:", data);

      login(data.accessToken); // <-- NOVA LINHA

      // 6. Redirecione para a página principal do funcionário
      router.push("/funil-vendas"); 

    } catch (error) {
      // Captura erros da requisição (ex: backend offline) ou do 'throw' acima
      setErro(error.message);
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
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
            alt="Ícone de Gestor"
            className={styles.iconePainel}
          />
          <span>Acesso Gestor</span>
        </div>

        {/* Seu formulário e inputs estão perfeitos */}
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

          {/* Você pode criar um estilo para .mensagemErro no seu App.module.css */}
          {erro && <p className={styles.mensagemErro}>{erro}</p>}

          <button
            type="submit"
            className={styles.botaoLogar}
            disabled={isLoading} /* Desabilitar o botão durante o loading */
          >
            {/* Mudar o texto do botão durante o loading */}
            {isLoading ? "Logando..." : "Logar →"}
          </button>
        </form>
      </div>
    </div>
  );
}
