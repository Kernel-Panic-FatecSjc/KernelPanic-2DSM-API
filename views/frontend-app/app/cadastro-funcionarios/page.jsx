"use client";

import styles from "./App.module.css";
import ProtectRoute from "../../components/ProtectRoute";
import React, { useState } from "react";
import axios from "axios";

export default function page() {
    const [form, setForm] = useState({
        nome: "",
        endereco: "",
        numero_telefone: "",
        cargo: "",
        email: "",
        senha_hash: "",
        genero: "",
        gerente: "",
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
            const response = await fetch( `${apiUrl}/funcionario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadosParaEnviar),
            });

            const resultado = await response.json();

            if (!response.ok) throw new Error(resultado.message);

            alert("Funcionário cadastrado com sucesso!");
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
                        {/* Nome */}
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

                        {/* Endereço */}
                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>
                                Endereço:
                            </label>
                            <input
                                className={styles.input2}
                                type="text"
                                name="endereco"
                                value={form.endereco}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Telefone */}
                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>
                                Telefone:
                            </label>
                            <input
    className={styles.input2}
    type="text"
    name="numero_telefone"
    value={form.numero_telefone}
    onChange={handleChange}
    required
/>
                        </div>

                        {/* Cargo */}
                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>Cargo:</label>
                            <input
                                className={styles.input2}
                                type="text"
                                name="cargo"
                                value={form.cargo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>Email:</label>
                            <input
                                className={styles.input2}
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.inputtitle}>
                                <p>Gênero:</p>
                            </label>

                            <div className={styles.radioGroup}>
                                {[
                                    "Masculino",
                                    "Feminino",
                                    "Prefiro não informar",
                                ].map((opcao) => {
                                    const id = `genero_${opcao}`;

                                    return (
                                        <React.Fragment key={opcao}>
                                            <input
                                                type="radio"
                                                id={id}
                                                name="genero"
                                                value={opcao}
                                                checked={form.genero === opcao}
                                                onChange={handleChange}
                                                className={styles.radioInput}
                                            />
                                            <label
                                                htmlFor={id}
                                                className={styles.radioLabel}
                                            >
                                                {opcao}
                                            </label>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.inputtitle}>
                                <p>Gerente:</p>
                            </label>

                            <div className={styles.radioGroup}>
                                {[
                                    { label: "É gerente", valor: 1 },
                                    { label: "Não é gerente", valor: 0 },
                                ].map((opcao) => {
                                    const id = `gerente_${opcao.valor}`;

                                    return (
                                        <React.Fragment key={opcao.valor}>
                                            <input
                                                type="radio"
                                                id={id}
                                                name="gerente"
                                                value={opcao.valor}
                                                checked={
                                                    String(form.gerente) ===
                                                    String(opcao.valor)
                                                }
                                                onChange={handleChange}
                                                className={styles.radioInput}
                                            />
                                            <label
                                                htmlFor={id}
                                                className={styles.radioLabel}
                                            >
                                                {opcao.label}
                                            </label>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Senha */}
                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>Senha:</label>
                            <input
                                className={styles.input2}
                                type="password"
                                name="senha"
                                value={form.senha}
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
