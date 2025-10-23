"use client";

import styles from "./App.module.css";
import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";
import { useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useAuth } from "../../context/AuthContext"; // 1. IMPORTE O USEAUTH
>>>>>>> 736e26e (feat(KER-72): Salvamento de Token, Comunicação com o BackEnd e proteção das Rotas do Front)
=======
import { useAuth } from "../../context/AuthContext"; // 1. IMPORTE O USEAUTH
>>>>>>> 736e26e (feat(KER-72): Salvamento de Token, Comunicação com o BackEnd e proteção das Rotas do Front)

export default function Page() {
  const router = useRouter();
  const { login } = useAuth(); // 2. PEGUE A FUNÇÃO LOGIN DO CONTEXTO

  // Seus estados
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  console.log("Bem Vindo Master");
>>>>>>> 736e26e (feat(KER-72): Salvamento de Token, Comunicação com o BackEnd e proteção das Rotas do Front)

=======
  console.log("Bem Vindo Master");

>>>>>>> 736e26e (feat(KER-72): Salvamento de Token, Comunicação com o BackEnd e proteção das Rotas do Front)
  // Função para lidar com o envio do formulário
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

      // 5. TROQUE O LOCALSTORAGE PELA FUNÇÃO DO CONTEXTO
      // localStorage.setItem("token", data.accessToken); // <-- Linha antiga
      login(data.accessToken); // <-- NOVA LINHA

      // 6. Redirecione para a página principal do Master
      router.push("/"); // Main Page

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
            src="/images/gestor.svg" // (Você pode mudar este ícone se tiver um para 'master')
            alt="Ícone de gestor"
            className={styles.iconePainel}
          />
          <span>Acesso Master</span>
        </div>

        {/* Ligar o formulário à função handleSubmit */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Email:</label>
          <div className={styles.inputWrapper}>
            <img
              src="/images/iconeemail.svg"
              alt="Ícone de email"
              className={styles.iconeInput}
            />
            {/* Ligar o input ao estado 'email' */}
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
            {/* Ligar o input ao estado 'senha' */}
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

          {/* Exibir mensagem de erro, se houver */}
          {erro && <p className={styles.mensagemErro}>{erro}</p>} 
          {/* (Você precisa criar esse estilo .mensagemErro no seu CSS) */}

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
<<<<<<< HEAD
<<<<<<< HEAD


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





=======
    </div>
  );
>>>>>>> 736e26e (feat(KER-72): Salvamento de Token, Comunicação com o BackEnd e proteção das Rotas do Front)
=======
    </div>
  );
>>>>>>> 736e26e (feat(KER-72): Salvamento de Token, Comunicação com o BackEnd e proteção das Rotas do Front)
}