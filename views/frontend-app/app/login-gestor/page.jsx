"use client";

import styles from "./App.module.css";
import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";
import { useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 736e26e (feat(KER-72): Salvamento de Token, Comunicação com o BackEnd e proteção das Rotas do Front)
=======
>>>>>>> feat/telaDeLogin
import { useAuth } from "../../context/AuthContext"; // 1. IMPORTE O USEAUTH

export default function Page() {
  const router = useRouter();
  const { login } = useAuth(); // 2. PEGUE A FUNÇÃO LOGIN DO CONTEXTO
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 736e26e (feat(KER-72): Salvamento de Token, Comunicação com o BackEnd e proteção das Rotas do Front)
=======
>>>>>>> 736e26e (feat(KER-72): Salvamento de Token, Comunicação com o BackEnd e proteção das Rotas do Front)
=======
>>>>>>> feat/telaDeLogin

  // Seus estados estão perfeitos
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export default function page(){
      const [mostrarSenha, setMostrarSenha] = useState(false);
      const router = useRouter();
      const handleLogin = (e) => {
        e.preventDefault(); 
      router.push("/login-localizacao"); 
      
  };
  const toggleMostrarSenha = () => {
    setMostrarSenha((prev) => !prev);
  };

=======
=======
>>>>>>> feat/telaDeLogin
  console.log("Bem Vindo Gestor");

=======
  console.log("Bem Vindo Gestor");

>>>>>>> 736e26e (feat(KER-72): Salvamento de Token, Comunicação com o BackEnd e proteção das Rotas do Front)
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
      
      // 3. TROQUE O LOCALSTORAGE PELA FUNÇÃO DO CONTEXTO
      // localStorage.setItem("token", data.accessToken); // <-- Linha antiga
      login(data.accessToken); // <-- NOVA LINHA

      // 4. Redirecione para a página de GESTOR
      router.push("/"); // <-- Main Page

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
            alt="Ícone de gestor"
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
            disabled={isLoading} 
          >
            {isLoading ? "Logando..." : "Logar →"}
          </button>
        </form>
      </div>
<<<<<<< HEAD
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





}
=======
    </div>
  );
}
>>>>>>> 736e26e (feat(KER-72): Salvamento de Token, Comunicação com o BackEnd e proteção das Rotas do Front)
=======
    </div>
  );
}
=======
    </div>
  );
}
>>>>>>> feat/telaDeLogin
