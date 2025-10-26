"use client";

import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Page() {
    const mockFormulariosFuncionarios = [
        {
            formulario: "Cadastro de Usuário",
            data: "25/10/2025",
            horario: "08:30",
        },
        {
            formulario: "Login de Sistema",
            data: "24/10/2025",
            horario: "14:15",
        },
        {
            formulario: "Envio de Relatório",
            data: "23/10/2025",
            horario: "09:45",
        },
        {
            formulario: "Atualização de Perfil",
            data: "22/10/2025",
            horario: "16:00",
        },
    ];

    const [respostasFormulario, setRespostasFormulario] = useState(
        mockFormulariosFuncionarios
    );

    const totalPreenchidos = respostasFormulario.length;

    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

    const totalPreenchidosSemana = respostasFormulario.filter((item) => {
        const [dia, mes, ano] = item.data.split("/");
        const dataItem = new Date(`${ano}-${mes}-${dia}`);
        return dataItem >= seteDiasAtras;
    }).length;

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

    const dadosPorDia = [
        { dia: "Segunda", quantidade: 50 },
        { dia: "Terça", quantidade: 75 },
        { dia: "Quarta", quantidade: 60 },
        { dia: "Quinta", quantidade: 90 },
        { dia: "Sexta", quantidade: 120 },
        { dia: "Sábado", quantidade: 80 },
        { dia: "Domingo", quantidade: 40 },
    ];

    const data = {
        labels: dadosPorDia.map((item) => item.dia),
        datasets: [
            {
                label: "Formulários Preenchidos",
                data: dadosPorDia.map((item) => item.quantidade),
                fill: false,
                borderColor: "#1f4af4",
                backgroundColor: "#1f4af4",
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Formulários por dia da semana" },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
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
                        <h2>Funcionários</h2>
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
                            <h3>{totalVeiculos}</h3>
                        </div>
                        <div className={styles.preenchidosTitle}>
                            <h3>Essa Semana</h3>
                            <h3>{0}</h3>
                        </div>
                    </aside>

                    <div className={styles.ultimaAtualizacao}>
                        <h3>Quantidade por Agregado</h3>
                        <ul>
                            <li
                                className={`${styles.linha_par} ${styles.primeiraLinha}`}
                            >
                                <span className={styles.col}>Veículo</span>
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
                            <Line data={data} options={options}  style={{ width: "100%", height: "100%" }} 
/>
                        </div>
                </section>
            </container>
        </div>
    );
}
