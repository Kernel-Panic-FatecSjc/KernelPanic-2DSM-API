"use client";

import styles from "./App.module.css";

export default function Page() {
    return (
        <div className={styles.conteudo}>
            <a className={styles.link} href=""><strong>← Voltar</strong></a>
            <div className={styles.principal}>
                <h1>Área do motorista</h1>

                <button className={styles.btn_checklist}>
                <div className={styles.iconWrapper}>
                    <img src="/images/caminhao.png" alt="Caminhão" className={styles.icon} />
                </div>
                <span className={styles.btnText}>Checklist do Veículo</span>
                </button>


                <button className={styles.btn_cadastro}>
                <div className={styles.iconWrapper}>
                    <img src="/images/motorista.png" alt="Caminhão" className={styles.icon} />
                </div>
                <span className={styles.btnText}>Cadastro do Motorista</span>
                </button>

            </div>
        </div>
    );
}