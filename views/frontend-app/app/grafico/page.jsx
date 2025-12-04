"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";   
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
} from "chart.js";

import styles from "./App.module.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement
);

export default function GraficoPage() {
    const coresFunil = [
        "#2A49EB",
        "#3366F0",
        "#4686F5",
        "#5AA6FA",
        "#6DC6FF",
        "#87DBFF",
        "#9EEFFF",
        "#B6FFFF",
    ];

    const [filtroTempo, setFiltroTempo] = useState("mes");
    const [vendasDados, setVendasDados] = useState({
        labels: [],
        datasets: [],
    });
    const [interacoesDados, setInteracoesDados] = useState({
        labels: [],
        datasets: [],
    });
    const [clientesCadastradosDados, setClientesCadastradosDados] = useState({
        labels: [],
        datasets: [],
    });
    const [clientesPorCidadeDados, setClientesPorCidadeDados] = useState({
        labels: [],
        datasets: [],
    });
    const [opcoesGrafico, setOpcoesGrafico] = useState({});

    useEffect(() => {
    const gerarDados = async (filtro) => {
        try {
            const apiUrl = 'http://52.72.66.96:8:5000/api';
            const response = await axios.get(`${apiUrl}/vendedor`);
            const vendas = response.data;

            console.log("VENDAS:", vendas);


            let labels = [];
            let vendasData = [];
            let clientesData = [];

            if (filtro === "dia") {
                labels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
                vendasData = Array(7).fill(0);
                clientesData = Array(7).fill(0);

                vendas.forEach(v => {
                    const dia = new Date(v.data_venda).getDay(); 
                    const valor = parseFloat(v.valor_total) || 0;

                    const idx = dia === 0 ? 6 : dia - 1;
                    vendasData[idx] += valor;
                    clientesData[idx] += 1;
                });
            }

            if (filtro === "mes") {
                labels = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
                vendasData = Array(12).fill(0);
                clientesData = Array(12).fill(0);

                vendas.forEach(v => {
                    const mes = new Date(v.data_venda).getMonth();
                    const valor = parseFloat(v.valor_total) || 0;

                    vendasData[mes] += valor;
                    clientesData[mes] += 1;
                });
            }

            if (filtro === "ano") {
                const anos = {};
                
                vendas.forEach(v => {
                    const ano = new Date(v.data_venda).getFullYear();
                    const valor = parseFloat(v.valor_total) || 0;

                    anos[ano] = anos[ano] || { vendas: 0, clientes: 0 };
                    anos[ano].vendas += valor;
                    anos[ano].clientes += 1;
                });

                labels = Object.keys(anos);
                vendasData = labels.map(a => anos[a].vendas);
                clientesData = labels.map(a => anos[a].clientes);
            }

            setVendasDados({
                labels,
                datasets: [
                    {
                        label: "Vendas",
                        data: vendasData,
                        backgroundColor: coresFunil[0] + "99",
                    },
                ],
            });


            const interacoesMap = {};

            vendas.forEach(v => {
                const nome = v.funcionario?.nome || "Desconhecido";
                interacoesMap[nome] = (interacoesMap[nome] || 0) + 1;
            });

            setInteracoesDados({
                labels: Object.keys(interacoesMap),
                datasets: [
                    {
                        label: "Interações por Vendedor",
                        data: Object.values(interacoesMap),
                        borderColor: coresFunil[1],
                        backgroundColor: coresFunil[6],
                    },
                ],
            });

            const cidadeMap = {};

            vendas.forEach(v => {
                const cidade = v.cliente?.endereco || "Indefinido";
                cidadeMap[cidade] = (cidadeMap[cidade] || 0) + 1;
            });

            setClientesPorCidadeDados({
                labels: Object.keys(cidadeMap),
                datasets: [
                    {
                        label: "Clientes por Cidade",
                        data: Object.values(cidadeMap),
                        backgroundColor: [
                            coresFunil[0],
                            coresFunil[2],
                            coresFunil[4],
                            coresFunil[6],
                        ],
                    },
                ],
            });

            setClientesCadastradosDados({
                labels,
                datasets: [
                    {
                        label: "Clientes Cadastrados",
                        data: clientesData,
                        borderColor: coresFunil[2],
                        backgroundColor: coresFunil[2] + "33",
                        fill: true,
                    },
                ],
            });

        } catch (error) {
            console.error("Erro ao buscar dados do dashboard:", error);
        }
    };

    gerarDados(filtroTempo);
}, [filtroTempo]);

    return (
        <div className={styles.paginaGrafico}>
            <h1>Relatórios de Vendas</h1>

            <div className={styles.filtroContainer}>
                <button
                    className={
                        filtroTempo === "dia"
                            ? styles.filtroAtivo
                            : styles.filtroBotao
                    }
                    onClick={() => setFiltroTempo("dia")}
                >
                    Dia
                </button>
                <button
                    className={
                        filtroTempo === "mes"
                            ? styles.filtroAtivo
                            : styles.filtroBotao
                    }
                    onClick={() => setFiltroTempo("mes")}
                >
                    Mês
                </button>
                <button
                    className={
                        filtroTempo === "ano"
                            ? styles.filtroAtivo
                            : styles.filtroBotao
                    }
                    onClick={() => setFiltroTempo("ano")}
                >
                    Ano
                </button>
            </div>

            <div className={styles.gridGraficos}>
                <div className={styles.graficoCard}>
                    <h2>Vendas</h2>
                    <Bar
                        data={vendasDados}
                        options={{
                            ...opcoesGrafico,
                            plugins: {
                                title: { display: true, text: "Vendas" },
                            },
                        }}
                    />
                </div>

                <div className={styles.graficoCard}>
                    <h2>Interações</h2>
                    <Line
                        data={interacoesDados}
                        options={{
                            ...opcoesGrafico,
                            plugins: {
                                title: { display: true, text: "Interações" },
                            },
                        }}
                    />
                </div>

                <div className={styles.graficoCard}>
                    <h2>Clientes por Cidade</h2>
                    <Doughnut
                        data={clientesPorCidadeDados}
                        options={{
                            ...opcoesGrafico,
                            scales: { y: { display: false } },
                        }}
                    />
                </div>

                <div className={styles.graficoCard}>
                    <h2>Clientes Cadastrados</h2>
                    <Line
                        data={clientesCadastradosDados}
                        options={{
                            ...opcoesGrafico,
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Clientes Cadastrados",
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
