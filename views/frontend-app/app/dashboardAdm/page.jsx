"use client";

import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";

export default function Dashboard() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [agregados, setAgregados] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            // ROTA PARA BACKEND - FUNCIONÁRIOS
            // GET: ${apiUrl}/funcionarios
            // Retorno esperado: Array de objetos com os campos:
            // - nome, CPF, dataDeNascimento, dataDeAdmissao, email, funcao, setor
            const resFuncionarios = await axios.get(`${apiUrl}/funcionario`);
            console.log(resFuncionarios.data.funcionarios);
            setFuncionarios(resFuncionarios.data.funcionarios);

            // ROTA PARA BACKEND - AGREGADOS
            // GET: ${apiUrl}/agregados
            // Retorno esperado: Array de objetos com os campos:
            // - genero, nomeMotorista, CNPJMotorista, CPFMotorista,
            //   dataMotorista, cidadeMotorista, telefoneMotorista, emailMotorista,
            //   RGMotorista, RGEmissaoMotorista, orgaoMotorista, nomePaiMotorista,
            //   nomeMaeMotorista, pisMotorista, CEPMotorista, enderecoMotorista,
            //   nomeProprietarioVeiculo, placaVeiculo, marcaVeiculo, modeloVeiculo,
            //   corVeiculo, anoVeiculo, cilindradaVeiculo, bau, seguro,
            //   valorMin, valorMinKM

            const resAgregados = await axios.get(`${apiUrl}/agregado`);
            console.log(resAgregados);
            setAgregados(resAgregados.data);

            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    const calcularIdade = (dataNascimento) => {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    };

    const totalFuncionarios = funcionarios.length;
    const totalAgregados = agregados.length;
    const agregadosComSeguro = agregados.filter(
        (a) => a.respostas.seguro === "Sim" || a.respostas.seguro === true
    ).length;
    const percentualSeguro =
        totalAgregados > 0
            ? ((agregadosComSeguro / totalAgregados) * 100).toFixed(1)
            : 0;
    const agregadosComBau = agregados.filter(
        (a) => a.respostas.bau === "Sim" || a.respostas.bau === true
    ).length;
    const percentualBau =
        totalAgregados > 0
            ? ((agregadosComBau / totalAgregados) * 100).toFixed(1)
            : 0;

    const getFaixaEtaria = (idade) => {
        if (idade < 25) return "Menos de 25";
        if (idade >= 25 && idade < 35) return "25-34";
        if (idade >= 35 && idade < 45) return "35-44";
        if (idade >= 45 && idade < 55) return "45-54";
        return "55+";
    };

    const dadosFaixaEtaria = () => {
        const faixas = ["Menos de 25", "25-34", "35-44", "45-54", "55+"];

        const dados = faixas.map((faixa) => {
            const funcCount = funcionarios.filter(
                (f) =>
                    f.data_nascimento &&
                    getFaixaEtaria(calcularIdade(f.data_nascimento)) === faixa
            ).length;

            const agrgCount = agregados.filter(
                (a) =>
                    a.respostas?.dataMotorista &&
                    getFaixaEtaria(calcularIdade(a.respostas.dataMotorista)) ===
                        faixa
            ).length;

            return {
                faixa,
                funcionarios: funcCount,
                agregados: agrgCount,
            };
        });

        return dados;
    };

    const dadosPorFuncao = () => {
        const funcoes = {};
        funcionarios.forEach((f) => {
            const funcao = f.cargo || "Não especificado";
            funcoes[funcao] = (funcoes[funcao] || 0) + 1;
        });

        const dados = Object.keys(funcoes).map((funcao) => ({
            name: funcao,
            value: funcoes[funcao],
        }));

        dados.sort((a, b) => b.value - a.value);
        return dados;
    };

    const dadosPorSetor = () => {
        const setores = {};
        funcionarios.forEach((f) => {
            const setor = f.cargo || "Não especificado";
            setores[setor] = (setores[setor] || 0) + 1;
        });

        const dados = Object.keys(setores).map((setor) => ({
            setor,
            quantidade: setores[setor],
        }));

        dados.sort((a, b) => b.quantidade - a.quantidade);
        return dados;
    };

    const dadosTopMarcas = () => {
        const marcas = {};

        agregados.forEach((a) => {
            const marca = a.respostas?.marcaVeiculo || "Não especificado";
            marcas[marca] = (marcas[marca] || 0) + 1;
        });

        return Object.keys(marcas)
            .map((marca) => ({
                marca,
                quantidade: marcas[marca],
            }))
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 5);
    };
    const dadosPorAnoVeiculo = () => {
        const grupos = {
            "Até 2015": 0,
            "2016-2020": 0,
            "2021+": 0,
            Inválido: 0,
        };

        agregados.forEach((a) => {
            const ano = parseInt(a.respostas?.anoVeiculo);
            if (isNaN(ano)) {
                grupos["Inválido"]++;
            } else if (ano <= 2015) {
                grupos["Até 2015"]++;
            } else if (ano <= 2020) {
                grupos["2016-2020"]++;
            } else {
                grupos["2021+"]++;
            }
        });

        return Object.keys(grupos).map((grupo) => ({
            name: grupo,
            value: grupos[grupo],
        }));
    };

    const valorMedioMin =
    agregados.length > 0
        ? (
              agregados.reduce(
                  (sum, a) => sum + (parseFloat(a.respostas?.valorMin) || 0),
                  0
              ) / agregados.length
          ).toFixed(2)
        : 0;

    const valorMedioMinKM =
    agregados.length > 0
        ? (
              agregados.reduce(
                  (sum, a) => sum + (parseFloat(a.respostas?.valorMinKM) || 0),
                  0
              ) / agregados.length
          ).toFixed(2)
        : 0;
    const top5Antigos = () => {
        return [...funcionarios]
            .filter((f) => f.data_admissao)
            .sort(
                (a, b) => new Date(a.data_admissao) - new Date(b.data_admissao)
            )
            .slice(0, 5);
    };

    const dadosTimeline = () => {
        const meses = {};

        funcionarios.forEach((f) => {
            if (f.data_admissao) {
                const data = new Date(f.data_admissao);
                const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;
                if (!meses[mesAno])
                    meses[mesAno] = {
                        mes: mesAno,
                        funcionarios: 0,
                        agregados: 0,
                    };
                meses[mesAno].funcionarios++;
            }
        });

        agregados.forEach((a) => {
            if (a.respostas?.dataMotorista) {
                const data = new Date(a.respostas.dataMotorista);
                const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;
                if (!meses[mesAno])
                    meses[mesAno] = {
                        mes: mesAno,
                        funcionarios: 0,
                        agregados: 0,
                    };
                meses[mesAno].agregados++;
            }
        });

        return Object.values(meses).sort((a, b) => {
            const [mesA, anoA] = a.mes.split("/").map(Number);
            const [mesB, anoB] = b.mes.split("/").map(Number);
            return new Date(anoA, mesA - 1) - new Date(anoB, mesB - 1);
        });
    };

    const renderBarChart = (dados, dataKey, labelKey, color1, color2) => {
        const maxValue = Math.max(...dados.map((d) => d[dataKey] || 0), 1);

        return (
            <div className={styles.barChartContainer}>
                {dados.map((item, index) => (
                    <div key={index} className={styles.barChartRow}>
                        <div className={styles.barChartLabel}>
                            {item[labelKey]}
                        </div>
                        <div className={styles.barChartBarWrapper}>
                            <div
                                className={styles.barChartBar}
                                style={{
                                    width: `${
                                        (item[dataKey] / maxValue) * 100
                                    }%`,
                                    backgroundColor:
                                        color1 ||
                                        coresFunil[index % coresFunil.length],
                                }}
                            >
                                <span className={styles.barChartValue}>
                                    {item[dataKey]}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderDoubleBarChart = (dados) => {
        const maxValue = Math.max(
            ...dados.map((d) =>
                Math.max(d.funcionarios || 0, d.agregados || 0)
            ),
            1
        );

        return (
            <div className={styles.doubleBarChartContainer}>
                {dados.map((item, index) => (
                    <div key={index} className={styles.doubleBarChartGroup}>
                        <div className={styles.doubleBarChartLabel}>
                            {item.faixa}
                        </div>
                        <div className={styles.doubleBarChartBars}>
                            <div className={styles.doubleBarChartRow}>
                                <span className={styles.doubleBarChartLegend}>
                                    Funcionários
                                </span>
                                <div
                                    className={styles.doubleBarChartBar}
                                    style={{
                                        width: `${
                                            (item.funcionarios / maxValue) * 100
                                        }%`,
                                        backgroundColor: "#1F4AF4",
                                    }}
                                >
                                    <span className={styles.barChartValue}>
                                        {item.funcionarios}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.doubleBarChartRow}>
                                <span className={styles.doubleBarChartLegend}>
                                    Agregados
                                </span>
                                <div
                                    className={styles.doubleBarChartBar}
                                    style={{
                                        width: `${
                                            (item.agregados / maxValue) * 100
                                        }%`,
                                        backgroundColor: "#4A90E2",
                                    }}
                                >
                                    <span className={styles.barChartValue}>
                                        {item.agregados}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderPieChart = (dados) => {
        const total = dados.reduce((sum, item) => sum + item.value, 0);

        // Evita divisão por zero
        if (total === 0) {
            return <div>Nenhum dado disponível</div>;
        }

        let currentAngle = 0;

        return (
            <div className={styles.pieChartContainer}>
                <div className={styles.pieChart}>
                    <svg viewBox="0 0 100 100" className={styles.pieSvg}>
                        {dados.map((item, index) => {
                            const percentage = (item.value / total) * 100;
                            const angle = (percentage / 100) * 360;
                            const startAngle = currentAngle;
                            currentAngle += angle;

                            const x1 =
                                50 +
                                50 * Math.cos((Math.PI * startAngle) / 180);
                            const y1 =
                                50 +
                                50 * Math.sin((Math.PI * startAngle) / 180);
                            const x2 =
                                50 +
                                50 * Math.cos((Math.PI * currentAngle) / 180);
                            const y2 =
                                50 +
                                50 * Math.sin((Math.PI * currentAngle) / 180);

                            const largeArcFlag = angle > 180 ? 1 : 0;

                            const pathData = [
                                `M 50 50`,
                                `L ${x1} ${y1}`,
                                `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                `Z`,
                            ].join(" ");

                            return (
                                <path
                                    key={index}
                                    d={pathData}
                                    fill={coresFunil[index % coresFunil.length]}
                                    stroke="#fff"
                                    strokeWidth="0.5"
                                />
                            );
                        })}
                    </svg>
                </div>

                <div className={styles.pieChartLegend}>
                    {dados.map((item, index) => (
                        <div key={index} className={styles.pieChartLegendItem}>
                            <div
                                className={styles.pieChartLegendColor}
                                style={{
                                    backgroundColor:
                                        coresFunil[index % coresFunil.length],
                                }}
                            ></div>
                            <span>
                                {item.name}: {item.value} (
                                {((item.value / total) * 100).toFixed(0)}%)
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderLineChart = (dados) => {
        const maxValue = Math.max(
            ...dados.map((d) =>
                Math.max(d.funcionarios || 0, d.agregados || 0)
            ),
            1
        );

        return (
            <div className={styles.lineChartContainer}>
                <svg viewBox="0 0 500 300" className={styles.lineChartSvg}>
                    <line
                        x1="50"
                        y1="250"
                        x2="480"
                        y2="250"
                        stroke="#ccc"
                        strokeWidth="2"
                    />
                    <line
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="250"
                        stroke="#ccc"
                        strokeWidth="2"
                    />

                    {dados.map((item, index) => {
                        const x = 80 + (index * 380) / (dados.length - 1 || 1);
                        return (
                            <text
                                key={index}
                                x={x}
                                y="270"
                                fontSize="10"
                                textAnchor="middle"
                                fill="#666"
                            >
                                {item.mes}
                            </text>
                        );
                    })}

                    <polyline
                        points={dados
                            .map((item, index) => {
                                const x =
                                    80 +
                                    (index * 380) / (dados.length - 1 || 1);
                                const y =
                                    250 - (item.funcionarios / maxValue) * 180;
                                return `${x},${y}`;
                            })
                            .join(" ")}
                        fill="none"
                        stroke="#1F4AF4"
                        strokeWidth="3"
                    />

                    <polyline
                        points={dados
                            .map((item, index) => {
                                const x =
                                    80 +
                                    (index * 380) / (dados.length - 1 || 1);
                                const y =
                                    250 - (item.agregados / maxValue) * 180;
                                return `${x},${y}`;
                            })
                            .join(" ")}
                        fill="none"
                        stroke="#4A90E2"
                        strokeWidth="3"
                    />

                    {dados.map((item, index) => {
                        const x = 80 + (index * 380) / (dados.length - 1 || 1);
                        const yFunc =
                            250 - (item.funcionarios / maxValue) * 180;
                        const yAgrg = 250 - (item.agregados / maxValue) * 180;
                        return (
                            <g key={index}>
                                <circle
                                    cx={x}
                                    cy={yFunc}
                                    r="4"
                                    fill="#1F4AF4"
                                />
                                <circle
                                    cx={x}
                                    cy={yAgrg}
                                    r="4"
                                    fill="#4A90E2"
                                />
                            </g>
                        );
                    })}
                </svg>
                <div className={styles.lineChartLegend}>
                    <div className={styles.lineChartLegendItem}>
                        <div
                            className={styles.lineChartLegendColor}
                            style={{ backgroundColor: "#1F4AF4" }}
                        ></div>
                        <span>Funcionários</span>
                    </div>
                    <div className={styles.lineChartLegendItem}>
                        <div
                            className={styles.lineChartLegendColor}
                            style={{ backgroundColor: "#4A90E2" }}
                        ></div>
                        <span>Agregados</span>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <h1 className={styles.tittle}>Dashboard - Comparativos</h1>
                <p>Carregando dados...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.tittle}>Dashboard - Comparativos</h1>

            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        Total de Funcionários
                    </div>
                    <div className={styles.cardValue}>{totalFuncionarios}</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Total de Agregados</div>
                    <div className={styles.cardValue}>{totalAgregados}</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Agregados com Seguro</div>
                    <div className={styles.cardValue}>{percentualSeguro}%</div>
                    <div className={styles.cardSubtitle}>
                        {agregadosComSeguro} de {totalAgregados}
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Agregados com Baú</div>
                    <div className={styles.cardValue}>{percentualBau}%</div>
                    <div className={styles.cardSubtitle}>
                        {agregadosComBau} de {totalAgregados}
                    </div>
                </div>
            </div>

            <div className={styles.chartSection}>
                <h2 className={styles.sectionTitle}>
                    Comparativo de Faixa Etária
                </h2>
                {renderDoubleBarChart(dadosFaixaEtaria())}
            </div>

            <div className={styles.chartSection}>
                <h2 className={styles.sectionTitle}>
                    Timeline de Admissões e Cadastros
                </h2>
                {renderLineChart(dadosTimeline())}
            </div>

            <div className={styles.doubleChartSection}>
                <div className={styles.chartBox}>
                    <h2 className={styles.sectionTitle}>
                        Distribuição por Função
                    </h2>
                    {renderPieChart(dadosPorFuncao())}
                </div>

                <div className={styles.chartBox}>
                    <h2 className={styles.sectionTitle}>
                        Distribuição por Setor
                    </h2>
                    {renderBarChart(
                        dadosPorSetor(),
                        "quantidade",
                        "setor",
                        "#1F4AF4"
                    )}
                </div>
            </div>

            <div className={styles.listSection}>
                <h2 className={styles.sectionTitle}>
                    Top 5 Funcionários Mais Antigos
                </h2>
                <div className={styles.listContainer}>
                    {top5Antigos().map((func, index) => (
                        <div key={index} className={styles.listItem}>
                            <span className={styles.listNumber}>
                                {index + 1}
                            </span>
                            <div className={styles.listContent}>
                                <strong>{func.nome}</strong>
                                <span>
                                    Admissão:{" "}
                                    {new Date(
                                        func.data_admissao
                                    ).toLocaleDateString("pt-BR")}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.doubleChartSection}>
                <div className={styles.chartBox}>
                    <h2 className={styles.sectionTitle}>
                        Top 5 Marcas de Veículos
                    </h2>
                    {renderBarChart(
                        dadosTopMarcas(),
                        "quantidade",
                        "marca",
                        "#4A90E2"
                    )}
                </div>

                <div className={styles.chartBox}>
                    <h2 className={styles.sectionTitle}>Veículos por Ano</h2>
                    {renderPieChart(dadosPorAnoVeiculo())}
                </div>
            </div>

            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Valor Médio Mínimo</div>
                    <div className={styles.cardValue}>R$ {valorMedioMin}</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        Valor Médio Mínimo por KM
                    </div>
                    <div className={styles.cardValue}>R$ {valorMedioMinKM}</div>
                </div>
            </div>
        </div>
    );
}
