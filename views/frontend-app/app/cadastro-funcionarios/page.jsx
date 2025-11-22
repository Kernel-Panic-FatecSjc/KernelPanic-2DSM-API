"use client";

import styles from "./App.module.css";
import ProtectRoute from "../../components/ProtectRoute";
import React, { useState } from "react";
import axios from "axios";

export default function page() {
    const [form, setForm] = useState({
        nome: "",
        CPF: "",
        dataDeNascimento: "",
        dataDeAdmissao: "",
        email: "",
        funcao: "",
        setor: "",
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dadosParaEnviar = {
            data: {
                ...form,
            },
        };

        console.log(dadosParaEnviar);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(${\"$\"}{apiUrl}/funcionario, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadosParaEnviar),
            });

            const resultado = await response.json();

            if (!response.ok) throw new Error(resultado.message);

            alert("Funcionário cadastrado com sucesso!");
            
            setForm({
                nome: "",
                CPF: "",
                dataDeNascimento: "",
                dataDeAdmissao: "",
                email: "",
                funcao: "",
                setor: "",
            });
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar: " + error.message);
        }
    };

    return (
        <ProtectRoute perfisPermitidos={["master", "gestor", "vendedor"]}>
            <div className={styles.mainDiv}>
                <h1>Cadastro de funcionários</h1>
                <div className={styles.mainContainer}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>Nome:</label>
                            <input
                                className={styles.input2}
                                type="text"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>CPF:</label>
                            <input
                                className={styles.input2}
                                type="text"
                                name="CPF"
                                value={form.CPF}
                                onChange={handleChange}
                                placeholder="000.000.000-00"
                                maxLength="14"
                                required
                            />
                        </div>

                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>
                                Data de Nascimento:
                            </label>
                            <input
                                className={styles.input2}
                                type="date"
                                name="dataDeNascimento"
                                value={form.dataDeNascimento}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>
                                Data de Admissão:
                            </label>
                            <input
                                className={styles.input2}
                                type="date"
                                name="dataDeAdmissao"
                                value={form.dataDeAdmissao}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>E-mail:</label>
                            <input
                                className={styles.input2}
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>Função:</label>
                            <input
                                className={styles.input2}
                                type="text"
                                name="funcao"
                                value={form.funcao}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>Setor:</label>
                            <input
                                className={styles.input2}
                                type="text"
                                name="setor"
                                value={form.setor}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.buttonenviar}>
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </ProtectRoute>
    );
}
