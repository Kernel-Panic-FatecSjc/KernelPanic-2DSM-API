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
import ProtectRoute from "../../components/ProtectRoute";

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
  { funcionario: "Mariana Costa", formulario: "Cotação", data: "25/10/2025", horario: "08:30" },
  { funcionario: "Ricardo Mendes", formulario: "Comercial", data: "24/10/2025", horario: "09:15" },
  { funcionario: "Carlos Silva", formulario: "Gestão da Coleta", data: "22/10/2025", horario: "11:00" },
  { funcionario: "Ana Oliveira", formulario: "Comercial", data: "21/10/2025", horario: "11:30" },
  { funcionario: "Mariana Costa", formulario: "Abertura da Empresa", data: "19/10/2025", horario: "08:00" },
  { funcionario: "Ricardo Mendes", formulario: "Operacional", data: "18/10/2025", horario: "09:30" },
  { funcionario: "Carlos Silva", formulario: "Fechamento da Empresa", data: "16/10/2025", horario: "12:00" },
  { funcionario: "Ana Oliveira", formulario: "Manutenção Predial", data: "15/10/2025", horario: "14:30" },
  { funcionario: "Mariana Costa", formulario: "Checklist Diário", data: "13/10/2025", horario: "08:45" },
  { funcionario: "Ricardo Mendes", formulario: "Operacional", data: "12/10/2025", horario: "09:50" },
  { funcionario: "Fernanda Lima", formulario: "Checklist Veículo", data: "11/10/2025", horario: "10:30" },
  { funcionario: "Carlos Silva", formulario: "Motorista", data: "10/10/2025", horario: "11:15" },
  { funcionario: "João Souza", formulario: "Cadastro do Motorista", data: "08/10/2025", horario: "15:45" },
];

const respostasFuncionarioBase = [
  { funcionario: "Mariana Costa", quantidade: 1 },
  { funcionario: "Ricardo Mendes", quantidade: 2 },
  { funcionario: "Fernanda Lima", quantidade: 3 },
  { funcionario: "Carlos Silva", quantidade: 4 },
  { funcionario: "Ana Oliveira", quantidade: 5 },
  { funcionario: "João Souza", quantidade: 6 },
];

const tiposVeiculoBase = [
  { tipo: "Carro", quantidade: 5 },
  { tipo: "Caminhão", quantidade: 2 },
  { tipo: "Van", quantidade: 2 },
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


    const totalFormularios = respostasFuncionarioBase.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const respostasFuncionario = respostasFuncionarioBase.map((item) => ({
        ...item,
        percentual:
            ((item.quantidade / totalFormularios) * 100).toFixed(1) + "%",
    }));

   

    const totalVeiculos = tiposVeiculoBase.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const tiposVeiculo = tiposVeiculoBase.map((item) => ({
        ...item,
        percentual: ((item.quantidade / totalVeiculos) * 100).toFixed(1) + "%",
    }));

    const dadosPorDia = [
    { dia: "Segunda", quantidade: 5 },
    { dia: "Terça", quantidade: 7 },
    { dia: "Quarta", quantidade: 6 },
    { dia: "Quinta", quantidade: 9 },
    { dia: "Sexta", quantidade: 8 },
    { dia: "Sábado", quantidade: 4 },
    { dia: "Domingo", quantidade: 3 },
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
        <ProtectRoute perfisPermitidos={["Dashboards"]}>
        
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
                            <h3>6</h3>
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
                            <h3>{9}</h3>
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
        </ProtectRoute>
    );
}
