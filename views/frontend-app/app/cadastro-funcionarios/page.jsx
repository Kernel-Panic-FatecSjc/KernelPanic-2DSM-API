"use client";

import styles from "./App.module.css";
import ProtectRoute from "../../components/ProtectRoute";
import React, { useState } from "react";

export default function Page() {
    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        genero: "",
        numero_telefone: "",
        data_nascimento: "",
        email: "",
        endereco: "",
        cargo: "",
        senha_hash: "",
        gerente_ID: 0,
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
        }));
    };

    const handleChangeCPF = (e) => {
        let { name, value } = e.target;

        if (name === "cpf") {
            value = maskCPF(value);
        }

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cpfSemFormatacao = form.cpf.replace(/[.\-]/g, "");

        const dadosParaEnviar = {
            ...form,
            cpf: cpfSemFormatacao,
            localizacao_funcionario: null,
            data_admissao: new Date().toISOString(),
            data_ultimo_login: null,
        };

        console.log("Enviando dados:", dadosParaEnviar);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}/funcionario`, {
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
                cpf: "",
                genero: "",
                numero_telefone: "",
                data_nascimento: "",
                email: "",
                endereco: "",
                cargo: "",
                senha_hash: "",
                gerente_ID: 0,
            });
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar: " + error.message);
        }
    };

    const maskCPF = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
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
                            <label className={styles.inputtitle}>Gênero:</label>
                            <select
                                className={styles.input2}
                                name="genero"
                                value={form.genero}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Não-binário">Não-binário</option>
                                <option value="Outro">Outro</option>
                                <option value="Prefiro não informar">
                                    Prefiro não informar
                                </option>
                            </select>
                        </div>

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
                            />
                        </div>

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
                                placeholder="(00) 00000-0000"
                            />
                        </div>

                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>Cargo:</label>
                            <input
                                className={styles.input2}
                                type="text"
                                name="cargo"
                                value={form.cargo}
                                onChange={handleChange}
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
                            <label className={styles.inputtitle}>Senha:</label>
                            <input
                                className={styles.input2}
                                type="password"
                                name="senha_hash"
                                value={form.senha_hash}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>
                                É gerente?
                            </label>
                            <input
                                type="checkbox"
                                checked={form.gerente_ID === 1}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        gerente_ID: e.target.checked ? 1 : 0,
                                    }))
                                }
                            />
                        </div>

                        <div className={styles.textgroup}>
                            <label className={styles.inputtitle}>CPF:</label>
                            <input
                                className={styles.input2}
                                type="text"
                                name="cpf"
                                value={form.cpf}
                                onChange={handleChangeCPF}
                                maxLength="14"
                                placeholder="000.000.000-00"
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
                                name="data_nascimento"
                                value={form.data_nascimento}
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
