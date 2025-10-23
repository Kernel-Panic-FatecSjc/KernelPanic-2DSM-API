"use client";

import styles from "./App.module.css";
import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";

export default function Page() {
  const router = useRouter();
    console.log("Bem Vindo Motorista")

  return (
    <div className={styles.container}>
      <div className={styles.lateral}>
        <Login />
      </div>

      <div className={styles.content}>
        <a
          className={styles.linkVoltar}
          onClick={() => router.push("/login-inicial")}
        >
          <strong>← Voltar</strong>
        </a>

        <div className={styles.card}>
          <h2 className={styles.title}>Área do Motorista</h2>

          <div className={styles.buttonsContainer}>
            <div
              className={styles.panel}
              onClick={() => router.push("/checklist-veiculo")}
            >
              <div className={styles.iconCircle}>
                <img
                  src="/images/caminhao.svg"
                  alt="Caminhão"
                  className={styles.icon}
                />
              </div>
              <span className={styles.text}>Checklist Veículo</span>
            </div>

            <div
              className={styles.panel}
              onClick={() => router.push("/cadastro-motorista")}
            >
              <div className={styles.iconCircle}>
                <img
                  src="/images/motorista.svg"
                  alt="Motorista"
                  className={styles.icon}
                />
              </div>
              <span className={styles.text}>Cadastro do Motorista</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
