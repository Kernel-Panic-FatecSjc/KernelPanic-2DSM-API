"use client";

import React from "react";
import styles from "./App.module.css";
import { useState } from "react";

export default function page() {
    const [totalPreenchidos, setTotalpreenchidos] = useState(0);
    const [totalPreenchidosSemana, setTotalPreenchidosSemana] = useState(0);

    const [totalAgregados, setTotalAgregados] = useState(0);
    const [totalAgregadosSemana, setTotalAgregadosSemana] = useState(0);

    const respostas = [
        { formulario: "Formulário A", data: "2025-10-21", horario: "14:30" },
        { formulario: "Formulário B", data: "2025-10-20", horario: "09:15" },
        { formulario: "Formulário C", data: "2025-10-19", horario: "17:45" },
        { formulario: "Formulário D", data: "2025-10-18", horario: "11:00" },
    ];

    return (
        <div className={styles.main}>
            <h1 className={styles.tittle}>
                Dashboard de resposta dos formulários
            </h1>
            <container className={styles.container}>
                <section className={styles.section}>
                    <div className={styles.titleDash}>
                        <img
                            className={styles.svg}
                            src="images/iconcliente.svg"
                            alt=""
                        />
                        <h2>Funcionarios</h2>
                    </div>
                    <aside className={styles.preenchidosAside}>
                        <div className={styles.preenchidosTitle}>
                            <h3>Total Preenchidos</h3>
                            <h3>{totalPreenchidos}</h3>
                        </div>
                        <div className={styles.preenchidosTitle}>
                            <h3>Essa Semana</h3>
                            <h3>{totalPreenchidosSemana}</h3>
                        </div>
                    </aside>

                    <div className={styles.ultimaAtualizacao}>
                        <h3>Última atualização por formulário</h3>
                        <ul>
                            <li className={`${styles.linha_par} ${styles.primeiraLinha}`}>
                                <span className={styles.col}>Formulário</span>
                                <span className={styles.col}>Data</span>
                                <span className={styles.col}>Horario</span>
                            </li>
                            {respostas.map((item, index) => (
                                <li
                                    key={index}
                                    className={
                                        index % 2 === 0
                                            ? styles.linha_par
                                            : styles.linha_impar
                                    }
                                >
                                    <span className={styles.col}>
                                        {item.formulario}
                                    </span>
                                    <span className={styles.col}>
                                        {item.data}
                                    </span>
                                    <span className={styles.col}>
                                        {item.horario}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section className={styles.section}>
                    <div className={styles.titleDash}>
                        <img
                            className={styles.svg}
                            src="images/iconvendas.svg"
                            alt=""
                        />
                        <h2>Agregados</h2>
                    </div>
                    <aside className={styles.preenchidosAside}>
                        <div className={styles.preenchidosTitle}>
                            <h3>Total Preenchidos</h3>
                            <h3>{totalAgregados}</h3>
                        </div>
                        <div className={styles.preenchidosTitle}>
                            <h3>Essa Semana</h3>
                            <h3>{totalAgregadosSemana}</h3>
                        </div>
                    </aside>
                </section>
            </container>
        </div>
    );
}
