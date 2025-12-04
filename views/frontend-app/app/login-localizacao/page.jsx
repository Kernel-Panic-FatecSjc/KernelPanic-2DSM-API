"use client";

import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";
import { useState } from "react";
import React from "react";
import styles from "./App.module.css";
import axios from "axios";

export default function page() {
    const router = useRouter();
    const [selected, setSelected] = useState("");

    const options = [
        { id: "homeOffice", label: "Home Office", icon: "/images/casa.png" },
        { id: "evento", label: "Evento", icon: "/images/calendario.png" },
        { id: "visitaCliente", label: "Visita", icon: "/images/caminhao.png" },
        { id: "ferias", label: "Férias", icon: "/images/maleta.png" },
        { id: "medico", label: "Médico", icon: "/images/estetoscopio.png" },
        {
            id: "escritorio",
            label: "Escritório",
            icon: "/images/construcao-2.svg",
        },
        { id: "reuniao", label: "Reunião", icon: "/images/reuniao.png" },
        { id: "outro", label: "Outro", icon: "/images/reticencias.png" },
    ];
    const apiUrl = 'http://52.72.66.96:8:5000/api';
    return (
        <div className={styles.container}>
            <div className={styles.lateral}>
                <Login />
            </div>

            <div className={styles.loginRight}>
                <a className={styles.linkVoltar} onClick={() => router.back()}>
                    <strong>← Voltar</strong>
                </a>
                <h1>LOGIN</h1>

                <div className={styles.formSection}>
                    <p className={styles.question}>Onde você está?</p>
                    <span className={styles.subtitle}>
                        Selecione sua localização atual
                    </span>

                    <div className={styles.options}>
                        {options.map((opt) => (
                            <label key={opt.id} className={styles.radioWrapper}>
                                <input
                                    type="radio"
                                    name="location"
                                    value={opt.id}
                                    checked={selected === opt.id}
                                    onChange={() => setSelected(opt.id)}
                                />
                                <img
                                    src={opt.icon}
                                    alt=""
                                    className={styles.icon}
                                />
                                <span>{opt.label}</span>
                            </label>
                        ))}
                    </div>

                    <button
                        className={styles.loginButton}
                        onClick={async () => {
                            try {
                                await axios.put(
                                    `${apiUrl}/funcionario-localizacao`,
                                    {
                                        funcionarioId: 1,
                                        localizacao: selected,
                                    }
                                );

                                router.push("/home-menu");
                            } catch (error) {
                                console.error(
                                    "Erro ao enviar localização:",
                                    error
                                );
                            }
                        }}
                    >
                        Logar →
                    </button>
                </div>
            </div>
        </div>
    );
}
