"use client";

import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import ProtectRoute from "../../components/ProtectRoute";
import axios from "axios";

export default function page() {
    const apiUrl = 'http://52.72.66.96:5000/';
    const [quantidadeFuncionarios, setQuantidadeFuncionarios] = useState(0);
    const [quantidadeAtivadade, setQuantidadeAtividade] = useState(0);
    const [quantidadeAusente, setQuantidadeAusente] = useState(0);
    const [funcionarios, setFuncionarios] = useState(0);

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

    const [cards, setCards] = useState({
        colunaUm: {
            "Home Office": [],
            Ferias: [],
        },
        colunaDois: {
            Evento: [],
            Reunião: [],
        },
        colunaTres: {
            "Visita Cliente": [],
            Médico: [],
        },
        colunaQuatro: {
            Escritório: [],
            Outro: [],
        },
    });

    const contagens = [];

    const localizacoes = {
        homeOffice: [],
        evento: [],
        visitaCliente: [],
        escritorio: [],
        ferias: [],
        reuniao: [],
        medico: [],
        outro: [],
    };

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const response = await axios.get(`${apiUrl}/funcionario`);
                const funcionariosLista = response.data.funcionarios;
                console.log(funcionariosLista);
                setFuncionarios(funcionariosLista);
                setQuantidadeFuncionarios(funcionariosLista.length);
                const novosCards = {
                    colunaUm: { "Home Office": [], Ferias: [] },
                    colunaDois: { Evento: [], Reunião: [] },
                    colunaTres: { "Visita Cliente": [], Médico: [] },
                    colunaQuatro: { Escritório: [], Outro: [] },
                };

                funcionariosLista.forEach((f) => {
                    switch (f.localizacao_funcionario.toLowerCase()) {
                        case "homeoffice":
                            novosCards.colunaUm["Home Office"].push(f);
                            break;
                        case "ferias":
                            novosCards.colunaUm.Ferias.push(f);
                            break;
                        case "evento":
                            novosCards.colunaDois.Evento.push(f);
                            break;
                        case "reuniao":
                            novosCards.colunaDois.Reunião.push(f);
                            break;
                        case "visitacliente":
                            novosCards.colunaTres["Visita Cliente"].push(f);
                            break;
                        case "medico":
                            novosCards.colunaTres.Médico.push(f);
                            break;
                        case "escritorio":
                            novosCards.colunaQuatro.Escritório.push(f);
                            break;
                        case "outro":
                            novosCards.colunaQuatro.Outro.push(f);
                            break;
                        default:
                            novosCards.colunaQuatro.Outro.push(f);
                    }
                });

                setCards(novosCards);

                const totalFuncionarios = funcionariosLista.length;

                const ausentes = funcionariosLista.filter(
                    (f) =>
                        f.status === "ausente" ||
                        ["ferias", "medico", "outro"].includes(
                            f.localizacao_funcionario.toLowerCase()
                        )
                ).length;

                const atividade = totalFuncionarios - ausentes;

                setQuantidadeAusente(ausentes);
                setQuantidadeAtividade(atividade);
                setQuantidadeFuncionarios(totalFuncionarios);
            } catch (error) {
                console.error("Erro ao buscar funcionários:", error);
            }
        };

        fetchFuncionarios();
    }, []);

    Object.entries(cards).forEach(([coluna, cardsObj]) => {
        Object.entries(cardsObj).forEach(([cardKey, clientes]) => {
            contagens.push({
                nome:
                    cardKey.charAt(0).toUpperCase() +
                    cardKey.slice(1).toLowerCase(),
                qtd: clientes.length,
            });
        });
    });

    contagens.sort((a, b) => b.qtd - a.qtd);
    const maxQtd = Math.max(...contagens.map((c) => c.qtd), 1);

    const renderCliente = (cliente, coluna, cardKey, index) => (
        <div key={index} className={styles.clienteCard}>
            <strong> {cliente.nome}</strong>
            <div>📞 {cliente.numero_telefone}</div>
            <div>✉️ {cliente.cargo}</div>
            <div>⚙️ {cliente.email}</div>
        </div>
    );

    const renderCard = (titulo, coluna, cardKey) => (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                {titulo} <span>{cards[coluna][cardKey].length}</span>
            </div>
            <div
                className={styles.cardBody}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(coluna, cardKey);
                }}
            >
                {cards[coluna][cardKey].map((cliente, index) =>
                    renderCliente(cliente, coluna, cardKey, index)
                )}
            </div>
        </div>
    );

    return (
        <ProtectRoute>
            <div>
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>Localização</h1>
                        <div className={styles.quantidadeFuncionariosContainer}>
                            <div className={styles.imgQuantidade}>
                                <img src="/images/funcionario.svg" alt="" />
                                <h2>{quantidadeFuncionarios}</h2>
                            </div>
                            <h3>Quantidade Funcionários</h3>
                        </div>
                        <div className={styles.secondInfoContainer}>
                            <div className={styles.containerAusenteAtividade}>
                                <img src="/images/companhia-1.svg" alt="" />
                                <div className={styles.inside}>
                                    <h3 className={styles.info}>
                                        {quantidadeAtivadade}
                                    </h3>
                                    <h3>Em atividade</h3>
                                </div>
                            </div>
                            <div className={styles.containerAusenteAtividade}>
                                <img
                                    className={styles.iconCliente}
                                    src="/images/iconclienteBlack.svg"
                                    alt=""
                                />
                                <div className={styles.inside}>
                                    <h3 className={styles.info}>
                                        {quantidadeAusente}
                                    </h3>
                                    <h3>Ausente</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.kanban}>
                        <div className={styles.column}>
                            {renderCard(
                                "Home Office",
                                "colunaUm",
                                "Home Office"
                            )}
                            {renderCard("Ferias", "colunaUm", "Ferias")}
                        </div>

                        <div className={styles.column}>
                            {renderCard("Evento", "colunaDois", "Evento")}
                            {renderCard("Reunião", "colunaDois", "Reunião")}
                        </div>

                        <div className={styles.column}>
                            {renderCard(
                                "Visita Cliente",
                                "colunaTres",
                                "Visita Cliente"
                            )}
                            {renderCard("Médico", "colunaTres", "Médico")}
                        </div>

                        <div className={styles.column}>
                            {renderCard(
                                "Escritório",
                                "colunaQuatro",
                                "Escritório"
                            )}
                            {renderCard("Outro", "colunaQuatro", "Outro")}
                        </div>
                    </div>
                </div>
                <div className={styles.funilDiv}>
                    <h2>Distribuição de Funcionários por Localização</h2>
                    <br />
                    {contagens.map((c, index) => (
                        <div
                            key={index}
                            className="funnel-bar"
                            style={{
                                width: `${Math.max(
                                    (c.qtd / maxQtd) * 60,
                                    15
                                )}%`,
                                backgroundColor: coresFunil[index] || "#B6FFFF",
                                marginBottom: "8px",
                                padding: "6px",
                                color: "#fff",
                                borderRadius: "4px",
                                transition: "width 0.3s",
                            }}
                        >
                            {c.nome}{" "}
                            <span style={{ float: "right" }}>{c.qtd}</span>
                        </div>
                    ))}
                </div>
            </div>
        </ProtectRoute>
    );
}
