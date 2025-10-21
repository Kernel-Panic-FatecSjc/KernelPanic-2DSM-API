"use client";

import { useRouter } from "next/navigation";
import styles from "./App.module.css";
import Login from "../../components/layout/Login/login";

export default function Page() {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <div className={styles.lateral}>
        <Login />
      </div>
      <div className={styles.right}>
        <a className={styles.link} href="#">
          <strong>← Voltar</strong>
        </a>

        <div className={styles.principal}>
          <h1>Área do motorista</h1>

          <button
            className={styles.btn_checklist}
            onClick={() => router.push("/checklist-veiculo")}
          >
            <div className={styles.iconWrapper}>
              <img
                src="/images/caminhao.png"
                alt="Caminhão"
                className={styles.icon}
              />
            </div>
            <span className={styles.btnText}>Checklist do Veículo</span>
          </button>

          <button className={styles.btn_cadastro}>
            <div className={styles.iconWrapper}>
              <img
                src="/images/motorista.png"
                alt="Motorista"
                className={styles.icon}
              />
            </div>
            <span className={styles.btnText}>Cadastro do Motorista</span>
          </button>
        </div>
      </div>
    </div>
  );
}