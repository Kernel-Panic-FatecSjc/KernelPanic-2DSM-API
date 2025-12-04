"use client";

import React, { useEffect, useState } from "react";
import styles from "./Kanban.module.css";
import Funil from "../FunilVendas/FunilVendas";
import axios from "axios";

export default function CicloDeVendas() {
    const [cards, setCards] = useState({
        colunaUm: { prospeccao: [], negociacao: [] },
        colunaDois: { inicial: [], followUp: [] },
        colunaTres: { potencial: [], vendas: [] },
        colunaQuatro: { manutencao: [], naoVendas: [] },
    });

    const [historicoFunil, setHistoricoFunil] = useState([]);
    const [mostrarHistorico, setMostrarHistorico] = useState(false);

    const cardToFaseID = {
        prospeccao: 1,
        inicial: 2,
        potencial: 3,
        manutencao: 4,
        negociacao: 5,
        followUp: 6,
        vendas: 7,
        naoVendas: 8,
    };

    const fetchHistorico = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            const response = await axios.get(
                `${apiUrl}/historico/movimentacoes`
            );
            setHistoricoFunil(response.data.message || response.data);
        } catch (error) {
            console.error("Erro ao buscar histórico", error);
        }
    };

    useEffect(() => {
        if (mostrarHistorico) {
            const fetchData = async () => {
                await fetchHistorico();
            };
            fetchData();
        }
    }, [mostrarHistorico]);

    const fetchGetClientes = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await axios.get(
                `${apiUrl}/funilVendas`
            );
            const clientes = response.data.message;

            const novoCards = {
                colunaUm: { prospeccao: [], negociacao: [] },
                colunaDois: { inicial: [], followUp: [] },
                colunaTres: { potencial: [], vendas: [] },
                colunaQuatro: { manutencao: [], naoVendas: [] },
            };

            const estagioToCard = {
                Prospeccao: { coluna: "colunaUm", card: "prospeccao" },
                Negociacao: { coluna: "colunaUm", card: "negociacao" },
                Inicial: { coluna: "colunaDois", card: "inicial" },
                FollowUp: { coluna: "colunaDois", card: "followUp" },
                Potencial: { coluna: "colunaTres", card: "potencial" },
                Vendas: { coluna: "colunaTres", card: "vendas" },
                Manutencao: { coluna: "colunaQuatro", card: "manutencao" },
                NaoVendas: { coluna: "colunaQuatro", card: "naoVendas" },
            };

            clientes.forEach((cliente) => {
                const estagio = cliente.funil.estagio_nome;

                const mapeamento = estagioToCard[estagio];
                if (mapeamento) {
                    const contatoTelefone = cliente.contatos.find(
                        (c) => c.tipo_contato === "telefone"
                    );
                    const contatoEmail = cliente.contatos.find(
                        (c) => c.tipo_contato === "email"
                    );

                    const clienteFormatado = {
                        id: cliente.cliente_ID,
                        nome: cliente.nome,
                        empresa: cliente.nome,
                        telefone: contatoTelefone?.valor_contato || "N/A",
                        email: contatoEmail?.valor_contato || "N/A",
                        status: estagio,
                    };

                    novoCards[mapeamento.coluna][mapeamento.card].push(
                        clienteFormatado
                    );
                } else {
                    console.warn("Estágio não mapeado:", estagio);
                }
            });

            setCards(novoCards);
        } catch (err) {
            console.error("Erro ao buscar clientes:", err);

            const clientesMock = {
                colunaUm: {
                    prospeccao: [
                        { id: 1, nome: "Jose", empresa: "Jose Transportes", telefone: "(11) 98765-4321", email: "jose@email.com", status: "Prospeccao" },
                        { id: 2, nome: "Daniele", empresa: "Daniele Logística", telefone: "(11) 98765-4322", email: "daniele@email.com", status: "Prospeccao" }
                    ],
                    negociacao: [
                        { id: 3, nome: "Frida", empresa: "Frida Express", telefone: "(11) 98765-4323", email: "frida@email.com", status: "Negociacao" }
                    ]
                },
                colunaDois: {
                    inicial: [
                        { id: 4, nome: "Amy", empresa: "Amy Cargas", telefone: "(11) 98765-4324", email: "amy@email.com", status: "Inicial" }
                    ],
                    followUp: [
                        { id: 5, nome: "Hanna", empresa: "Hanna Transportadora", telefone: "(11) 98765-4325", email: "hanna@email.com", status: "FollowUp" },
                        { id: 6, nome: "Pink", empresa: "Pink Logistics", telefone: "(11) 98765-4326", email: "pink@email.com", status: "FollowUp" }
                    ]
                },
                colunaTres: {
                    potencial: [
                        { id: 7, nome: "Mingau", empresa: "Mingau Fretes", telefone: "(11) 98765-4327", email: "mingau@email.com", status: "Potencial" }
                    ],
                    vendas: [
                        { id: 8, nome: "Lola", empresa: "Lola Transportes", telefone: "(11) 98765-4328", email: "lola@email.com", status: "Vendas" }
                    ]
                },
                colunaQuatro: {
                    manutencao: [],
                    naoVendas: []
                }
            };

            setCards(clientesMock);
        }
    };

    useEffect(() => {
        fetchGetClientes();
    }, []);

    const [draggingCliente, setDraggingCliente] = useState(null);

    const handleDragStart = (cliente, origemColuna, origemCard) => {
        setDraggingCliente({ cliente, origemColuna, origemCard });
    };

    const handleDrop = async (destinoColuna, destinoCard) => {
        if (!draggingCliente) return;

        const { cliente, origemColuna, origemCard } = draggingCliente;

        if (origemColuna === destinoColuna && origemCard === destinoCard) {
            setDraggingCliente(null);
            return;
        }

        setCards((prev) => {
            const origemLista = prev[origemColuna][origemCard].filter(
                (c) => c.id !== cliente.id
            );

            const destinoLista = prev[destinoColuna][destinoCard].some(
                (c) => c.id === cliente.id
            )
                ? [...prev[destinoColuna][destinoCard]]
                : [...prev[destinoColuna][destinoCard], cliente];

            return {
                ...prev,
                [origemColuna]: {
                    ...prev[origemColuna],
                    [origemCard]: origemLista,
                },
                [destinoColuna]: {
                    ...prev[destinoColuna],
                    [destinoCard]: destinoLista,
                },
            };
        });
        try {
            await axios.post( `${apiUrl}/funilVendas/moverCliente`, {
                cliente_id: cliente.id,
                novo_estagio: cardToFaseID[destinoCard],
            });
            console.log("Cliente atualizado no backend");
            await fetchGetClientes();
        } catch (error) {
            console.error("Erro ao atualizar cliente no backend:", error);
        }

        setDraggingCliente(null);
    };

    const renderCliente = (cliente, coluna, cardKey, index) => (
        <div
            key={index}
            className={styles.clienteCard}
            draggable
            onDragStart={() => handleDragStart(cliente, coluna, cardKey)}
        >
            <strong> {cliente.nome}</strong>
            <div>🏢 {cliente.empresa}</div>
            <div>📞 {cliente.telefone}</div>
            <div>✉️ {cliente.email}</div>
            <div>⚙️ {cliente.status}</div>
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
        <div className={styles.container}>
            <div>
                <h1 className={styles.tittle}>Funil de Vendas</h1>
            </div>

            <div className={styles.kanban}>
                <div className={styles.column}>
                    {renderCard("Prospecção", "colunaUm", "prospeccao")}
                    {renderCard("Em Negociação", "colunaUm", "negociacao")}
                </div>
                <div className={styles.column}>
                    {renderCard("Inicial", "colunaDois", "inicial")}
                    {renderCard("Follow Up", "colunaDois", "followUp")}
                </div>
                <div className={styles.column}>
                    {renderCard("Potencial", "colunaTres", "potencial")}
                    {renderCard("Vendas", "colunaTres", "vendas")}
                </div>
                <div className={styles.column}>
                    {renderCard("Manutenção", "colunaQuatro", "manutencao")}
                    {renderCard("Não Vendas", "colunaQuatro", "naoVendas")}
                </div>
            </div>
            <button
                className={styles.buttonHistorico}
                onClick={() => setMostrarHistorico(true)}
            >
                Ver histórico de Movimentações
            </button>
            <div>
                <Funil cards={cards} />
            </div>

            {mostrarHistorico && (
                <div
                    className={styles.modalOverlay}
                    onClick={() => setMostrarHistorico(false)}
                >
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>📜 Histórico de Movimentações</h2>
                        <table className={styles.tableHistorico} border="1">
                            <thead>
                                <tr>
                                    <th>Nome Cliente</th>
                                    <th>Data movimentação</th>
                                    <th>Estágio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historicoFunil.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            style={{ textAlign: "center" }}
                                        >
                                            Nenhum histórico encontrado.
                                        </td>
                                    </tr>
                                )}

                                {historicoFunil
                                    .slice()
                                    .reverse()
                                    .map((item) => (
                                        <tr key={item.historico_ID}>
                                            <td>{item.cliente?.nome || "—"}</td>
                                            <td>
                                                {new Date(
                                                    item.data_movimentacao
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                {item.funil?.estagio_nome ||
                                                    "—"}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        <div>
                            <button
                                className={styles.buttonHistoricoOver}
                                onClick={() => {
                                    setMostrarHistorico(false);
                                }}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
