"use client";

import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import axios from "axios";

export default function Page() {
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [segmento, setSegmento] = useState("");
    const [funcionarioId, setFuncionarioId] = useState(1);
    const [funilId, setFunilId] = useState(5);

    const [tipoContato, setTipoContato] = useState("email");
    const [valorContato, setValorContato] = useState("");
    const [ClienteId, setClienteId] = useState(1);

    const [tipoContatoAdd, setTipoContatoAdd] = useState("email");
    const [valorContatoAdd, setValorContatoAdd] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/clientes/getClientes"
                );
                const clientesData = response.data.message || response.data;
                setClientes(clientesData);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        fetchClientes();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage("");

        const formData = {
            nome,
            endereco,
            segmento,
            "funcionario_id:": funcionarioId,
            funil_id: funilId,
            tipo_contato: tipoContato,
            valor_contato: valorContato,
        };

        console.log("Enviando os seguintes dados:", formData);

        try {
            const response = await fetch("http://localhost:5000/clientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Resposta do servidor:", result);
            setMessage("Cadastro realizado com sucesso!");

            setNome("");
            setEndereco("");
            setSegmento("");
            setFuncionarioId(1);
            setFunilId(5);
            setTipoContato("email");
            setValorContato("");
            setValorContatoAdd("");
        } catch (error) {
            console.error("Falha ao enviar dados:", error);
            setMessage(`Erro ao cadastrar: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitAdd = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage("");

        const formDataAdd = {
            tipo_contato: tipoContatoAdd,
            valor_contato: valorContatoAdd,
            client_id: ClienteId,
        };

        console.log("Enviando os seeguintes dados:", formDataAdd);

        try {
            const response = await fetch(
                "http://localhost:5000/clientes/contato",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataAdd),
                }
            );

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Resposta do servidor:", result);
            setMessage("Adição realizado com sucesso!");

            setTipoContato("email");
            setValorContato("");
            setValorContatoAdd("");
        } catch (error) {
            console.error("Falha ao enviar dados:", error);
            setMessage(`Erro ao cadastrar: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTipoContatoChange = (event) => {
        setTipoContato(event.target.value);
        setValorContato("");
    };

    const handleTipoContatoAddChange = (event) => {
        setTipoContatoAdd(event.target.value);
        setValorContatoAdd("");
    };

    return (
        <div className={styles.conteudo}>
            <div className={styles.container}>
                <h1>Cadastro de Clientes</h1>
                <form onSubmit={handleSubmit} className={styles.formulario}>
                    <label htmlFor="nome" className={styles.textLabel}>
                        Nome:
                    </label>
                    <input
                        className={styles.input1}
                        type="text"
                        id="nome"
                        name="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />

                    <label htmlFor="endereco" className={styles.textLabel}>
                        Endereço:
                    </label>
                    <input
                        className={styles.input1}
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                    />

                    <label htmlFor="segmento" className={styles.textLabel}>
                        Segmento de atuação:
                    </label>
                    <input
                        className={styles.input1}
                        type="text"
                        id="segmento"
                        name="segmento"
                        value={segmento}
                        onChange={(e) => setSegmento(e.target.value)}
                    />

                    <label htmlFor="funcionario" className={styles.textLabel}>
                        Funcionário Responsável:
                    </label>
                    <select
                        className={styles.input1}
                        id="funcionario"
                        name="funcionario"
                        value={funcionarioId}
                        onChange={(e) =>
                            setFuncionarioId(Number(e.target.value))
                        }
                    >
                        <option value={1}>João Silva</option>
                        <option value={2}>Maria Oliveira</option>
                        <option value={3}>Pedro Martins</option>
                    </select>

                    <label htmlFor="funil" className={styles.textLabel}>
                        Funil de Vendas:
                    </label>
                    <select
                        className={styles.input1}
                        id="funil"
                        name="funil"
                        value={funilId}
                        onChange={(e) => setFunilId(Number(e.target.value))}
                    >
                        <option value={1}>Prospecção</option>
                        <option value={2}>Followup</option>
                        <option value={3}>Negociação</option>
                        <option value={4}>Inicial</option>
                        <option value={5}>Potencial</option>
                        <option value={6}>Manutencao</option>
                        <option value={7}>Nao Venda</option>
                        <option value={8}>Venda</option>
                    </select>

                    <label className={styles.textLabel}>Tipo de Contato:</label>
                    <div className={styles.radioGroup}>
                        <input
                            type="radio"
                            id="email1"
                            name="tipoContato"
                            value="email"
                            checked={tipoContato === "email"}
                            onChange={handleTipoContatoChange}
                        />
                        <label htmlFor="email1">E-mail</label>

                        <input
                            type="radio"
                            id="telefone1"
                            name="tipoContato"
                            value="telefone"
                            checked={tipoContato === "telefone"}
                            onChange={handleTipoContatoChange}
                        />
                        <label htmlFor="telefone1">Telefone</label>

                        <input
                            type="radio"
                            id="whatsapp1"
                            name="tipoContato"
                            value="whatsapp"
                            checked={tipoContato === "whatsapp"}
                            onChange={handleTipoContatoChange}
                        />
                        <label htmlFor="whatsapp1">WhatsApp</label>
                    </div>

                    {tipoContato && (
                        <div>
                            <label
                                htmlFor="valor_contato"
                                className={styles.textLabel}
                            >
                                {tipoContato.charAt(0).toUpperCase() +
                                    tipoContato.slice(1)}
                                :
                            </label>
                            <input
                                className={styles.input1}
                                type={tipoContato === "email" ? "email" : "tel"}
                                id="valor_contato"
                                name="valor_contato"
                                value={valorContato}
                                onChange={(e) =>
                                    setValorContato(e.target.value)
                                }
                                placeholder={
                                    tipoContato === "email"
                                        ? "exemplo@dominio.com"
                                        : "(99) 99999-9999"
                                }
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.botao}
                        disabled={isLoading}
                    >
                        {isLoading ? "Enviando..." : "Enviar Formulário"}
                    </button>

                    {message && <p>{message}</p>}
                </form>
            </div>
            <div className={styles.container}>
                <h1> Adicionar Contato </h1>
                <form onSubmit={handleSubmitAdd} className={styles.formulario}>
                    <label htmlFor="cliente" className={styles.textLabel}>
                        Cliente:
                    </label>
                    <select
                        className={styles.input1}
                        id="cliente"
                        name="cliente"
                        value={ClienteId}
                        onChange={(e) => setClienteId(Number(e.target.value))}
                    >
                        {clientes.length === 0 ? (
                            <option value="">Carregando clientes...</option>
                        ) : (
                            clientes.map((cliente) => (
                                <option
                                    key={cliente.cliente_ID}
                                    value={cliente.cliente_ID}
                                >
                                    {cliente.nome}
                                </option>
                            ))
                        )}
                    </select>
                    <label className={styles.textLabel}>Tipo de Contato:</label>
                    <div className={styles.radioGroup}>
                        <input
                            type="radio"
                            id="email"
                            name="tipoContatoAdd"
                            value="email"
                            checked={tipoContatoAdd === "email"}
                            onChange={handleTipoContatoAddChange}
                        />
                        <label htmlFor="email">E-mail</label>

                        <input
                            type="radio"
                            id="telefone"
                            name="tipoContatoAdd"
                            value="telefone"
                            checked={tipoContatoAdd === "telefone"}
                            onChange={handleTipoContatoAddChange}
                        />
                        <label htmlFor="telefone">Telefone</label>

                        <input
                            type="radio"
                            id="whatsapp"
                            value="whatsapp"
                            checked={tipoContatoAdd === "whatsapp"}
                            onChange={handleTipoContatoAddChange}
                        />
                        <label htmlFor="whatsapp">WhatsApp</label>
                    </div>
                    {tipoContatoAdd && (
                        <div>
                            <label
                                htmlFor="valor_contato"
                                className={styles.textLabel}
                            >
                                {tipoContatoAdd.charAt(0).toUpperCase() +
                                    tipoContatoAdd.slice(1)}
                                :
                            </label>
                            <input
                                className={styles.input1}
                                type={
                                    tipoContatoAdd === "email" ? "email" : "tel"
                                }
                                id="valor_contato"
                                name="valor_contato"
                                value={valorContatoAdd}
                                onChange={(e) =>
                                    setValorContatoAdd(e.target.value)
                                }
                                placeholder={
                                    tipoContatoAdd === "email"
                                        ? "exemplo@dominio.com"
                                        : "(99) 99999-9999"
                                }
                                required
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className={styles.botao}
                        disabled={isLoading}
                    >
                        {isLoading ? "Enviando..." : "Enviar Formulário"}
                    </button>

                    {message && <p>{message}</p>}
                </form>
            </div>
        </div>
    );
}
