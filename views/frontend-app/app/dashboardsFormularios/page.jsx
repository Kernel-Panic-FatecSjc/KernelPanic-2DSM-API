"use client";

import React from "react";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import axios from "axios"

export default function page() {
    const [respostasFormulario, setRespostasFormulario] = useState([]);

    const [totalPreenchidos, setTotalpreenchidos] = useState(0);
    const [totalPreenchidosSemana, setTotalPreenchidosSemana] = useState(0);

    const [totalAgregados, setTotalAgregados] = useState(0);
    const [totalAgregadosSemana, setTotalAgregadosSemana] = useState(0);

    useEffect(() => {
        const carregarFormularios = async () => {
            try {
                const response = await axios.get("localhost:3000/api/formularios");

                const data = response.data;
                setRespostasFormulario(data);
                setTotalPreenchidos(data.length);

                const seteDiasAtras = new Date();
                seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

                const preenchidosSemana = data.filter((item) => {
                    const dataItem = new Date(item.data);
                    return dataItem >= seteDiasAtras;
                });

                setTotalPreenchidosSemana(preenchidosSemana.length);
            } catch (error) {
                console.error("Erro ao carregar formulários:", error);
            }
        };

        carregarFormularios();
    }, []);

    useEffect(() => {
        const carregarFormulariosFuncionarios = async () => {
            try {
                const response = await axios.get("localhost:3000/api/formulariosFuncionarios");

                const data = response.data;
                setRespostasFormulario(data);
                setTotalPreenchidos(data.length);

                const seteDiasAtras = new Date();
                seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

                const preenchidosSemana = data.filter((item) => {
                    const dataItem = new Date(item.data);
                    return dataItem >= seteDiasAtras;
                });

                setTotalPreenchidosSemana(preenchidosSemana.length);
            } catch (error) {
                console.error("Erro ao carregar formulários:", error);
            }
        };

        carregarFormulariosFuncionarios();
    }, []);

    const respostasFuncionarioBase = [
        { funcionario: "Ana Souza", quantidade: 134 },
        { funcionario: "Carlos Oliveira", quantidade: 98 },
        { funcionario: "Fernanda Lima", quantidade: 121 },
        { funcionario: "João Pereira", quantidade: 76 },
        { funcionario: "Mariana Castro", quantidade: 143 },
        { funcionario: "Lucas Almeida", quantidade: 89 },
        { funcionario: "Patrícia Mendes", quantidade: 102 },
        { funcionario: "Rafael Nunes", quantidade: 110 },
        { funcionario: "Beatriz Ramos", quantidade: 97 },
        { funcionario: "Diego Martins", quantidade: 85 },
    ];

    const totalFormularios = respostasFuncionarioBase.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const respostasFuncionario = respostasFuncionarioBase.map((item) => ({
        ...item,
        percentual:
            ((item.quantidade / totalFormularios) * 100).toFixed(1) + "%",
    }));

    const tiposVeiculoBase = [
        { tipo: "Carro", quantidade: 340 },
        { tipo: "Moto", quantidade: 210 },
        { tipo: "Caminhão", quantidade: 85 },
        { tipo: "Ônibus", quantidade: 42 },
        { tipo: "Bicicleta", quantidade: 63 },
        { tipo: "Van", quantidade: 50 },
    ];

    const totalVeiculos = tiposVeiculoBase.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const tiposVeiculo = tiposVeiculoBase.map((item) => ({
        ...item,
        percentual: ((item.quantidade / totalVeiculos) * 100).toFixed(1) + "%",
    }));

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
                            <li
                                className={`${styles.linha_par} ${styles.primeiraLinha}`}
                            >
                                <span className={styles.col}>Formulário</span>
                                <span className={styles.col}>Data</span>
                                <span className={styles.col}>Horario</span>
                            </li>
                            {respostasFormulario.map((item, index) => (
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

                    <div className={styles.formulariosPorFuncionario}>
                        <h3>Formulários por Funcionário</h3>
                        <ul>
                            <li
                                className={`${styles.linha_par} ${styles.primeiraLinha}`}
                            >
                                <span className={styles.col}>Funcionário</span>
                                <span className={styles.col}>Quantidade</span>
                                <span className={styles.col}>Percentual</span>
                            </li>
                            {respostasFuncionario.map((item, index) => (
                                <li
                                    key={index}
                                    className={
                                        index % 2 === 0
                                            ? styles.linha_par
                                            : styles.linha_impar
                                    }
                                >
                                    <span className={styles.col}>
                                        {item.funcionario}
                                    </span>
                                    <span className={styles.col}>
                                        {item.quantidade}
                                    </span>
                                    <span className={styles.col}>
                                        {item.percentual}
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
                    <div className={styles.ultimaAtualizacao}>
                        <h3>Quantidade por Agregado</h3>
                        <ul>
                            <li
                                className={`${styles.linha_par} ${styles.primeiraLinha}`}
                            >
                                <span className={styles.col}>Veiculo</span>
                                <span className={styles.col}>Quantidade</span>
                                <span className={styles.col}>Percentual</span>
                            </li>
                            {tiposVeiculo.map((item, index) => (
                                <li
                                    key={index}
                                    className={
                                        index % 2 === 0
                                            ? styles.linha_par
                                            : styles.linha_impar
                                    }
                                >
                                    <span className={styles.col}>
                                        {item.tipo}
                                    </span>
                                    <span className={styles.col}>
                                        {item.quantidade}
                                    </span>
                                    <span className={styles.col}>
                                        {item.percentual}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.ultimaAtualizacao}>
                        <h3>Última atualização por formulário</h3>
                        <ul>
                            <li
                                className={`${styles.linha_par} ${styles.primeiraLinha}`}
                            >
                                <span className={styles.col}>Formulário</span>
                                <span className={styles.col}>Data</span>
                                <span className={styles.col}>Horario</span>
                            </li>
                            {respostasFormulario.map((item, index) => (
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
            </container>
        </div>
    );
}
