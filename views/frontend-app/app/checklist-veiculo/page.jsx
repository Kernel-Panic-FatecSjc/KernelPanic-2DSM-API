"use client";

import styles from "./App.module.css";
import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";

export default function Page() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.lateral}>
        <Login />
      </div>
      <div className={styles.formularioWrapper}>
        <a className={styles.link} onClick={() => router.push("/pagina-agregado")}>
          <strong>← Voltar</strong>
        </a>

        <div className={styles.formulario}>
          <h1>CHECKLIST de Veículos Agregados</h1>

          <label className={styles.label}>Nome completo do motorista:</label>
          <input className={styles.input} type="text" id="nome" name="nome" />

          <label className={styles.label}>CPF:</label>
          <input className={styles.input} type="text" id="CPF" name="CPF" />

          <label className={styles.label}>Placa do veículo:</label>
          <p>Somente LETRAS e NÚMEROS (sem traço)</p>
          <input className={styles.input} type="text" id="placa" name="placa" />

          <label className={styles.label}>Tipo de Veículo:</label>
          <div className={styles.radioGroup}>
            {["FIORINO", "VAN", "VUC", "3/4", "TOCO", "TRUCK", "CARRETA"].map((tipo) => (
              <div key={tipo}>
                <input type="radio" id={tipo} name="tipo_veiculo" value={tipo} />
                <label htmlFor={tipo}>{tipo}</label>
              </div>
            ))}
          </div>

          <h2><strong>MOTOR</strong></h2>
          <p>
            Verificação do vazamento e nível de óleo e água no motor do veículo.
          </p>

          <label className={styles.label}>VISTORIA</label>
          <p>
            1 - Verifique o nível do óleo usando a vareta.<br />
            2 - Verifique se há poças ou gotas de óleo no motor ou no chão.<br />
            3 - Verifique se a água do reservatório está no nível.
          </p>

          <button className={styles.btn_enviar} type="submit">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}