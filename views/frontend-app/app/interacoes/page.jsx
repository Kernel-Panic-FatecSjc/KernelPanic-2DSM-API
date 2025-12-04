"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import styles from "./App.module.css";
import ProtectRoute from "../../components/ProtectRoute";
const Select = dynamic(() => import("react-select"), { ssr: false });

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [clientes, setClients] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    const sortOptions = [
        { value: "newest", label: "Mais recentes" },
        { value: "oldest", label: "Mais antigas" },
    ];

    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const [sortKey, setSortKey] = useState(sortOptions[0]);

    const fetchClientes = async () => {
        try {
            const apiUrl = 'http://52.72.66.96:5000/';

            const response = await axios.get(`${apiUrl}/historico`);
            const vendas = response.data;

            const mapaClientes = vendas.map((venda) => {
                const interacoes = venda.cliente?.interacoes || [];
                const ultimaInteracaoObj = interacoes[interacoes.length - 1];
                return {
                    id: venda.funcionario?.funcionario_ID || null,
                    cliente: venda.cliente.nome || "",
                    funcionario: venda.funcionario?.nome || "",
                    segmento: venda.funcionario.cargo || "",
                    status: venda.status || "",
                    ultimaInteracao: venda.data_venda,
                    relatorio_interacao:
                        ultimaInteracaoObj?.relatorio_interacao ||
                        "Sem relatório",
                };
            });
            setClients(mapaClientes);
        } catch (error) {
            console.error("Erro ao buscar vendas:", error);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const DetalhesClick = (cliente) => {
        setClienteSelecionado(cliente);
    };

    const filteredClients = clientes.filter(
        (client) =>
            client.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.funcionario
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            client.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.segmento.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedClients = [...filteredClients].sort((a, b) => {
        const dateA = new Date(a.ultimaInteracao).getTime();
        const dateB = new Date(b.ultimaInteracao).getTime();
        return sortKey.value === "newest" ? dateB - dateA : dateA - dateB;
    });

    return (
        <ProtectRoute perfisPermitidos={["Gestão de Clientes"]}>
        <div className={styles["conteudo"]}>
            <div className={styles["container-historico"]}>
                <div className={styles.tableContainer}>
                    <h1 className={styles.titulo}>Histórico de Interações</h1>

                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Pesquisar clientes..."
                            className={styles.pesquisa}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="opções" style={{ marginLeft: "10px" }}>
                            <Select
                                instanceId="sort-by"
                                options={sortOptions}
                                value={sortKey}
                                placeholder="Data"
                                onChange={(selectedOption) =>
                                    setSortKey(selectedOption)
                                }
                                styles={{
                                    indicatorSeparator: () => ({
                                        display: "none",
                                    }),
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles["conteudo-tabela"]}>
                        <div className={styles["tabela-container"]}>
                            <table className={styles.tabela}>
                                <thead>
                                    <tr>
                                        <th>Funcionário</th>
                                        <th>Departamento</th>
                                        <th>Cliente</th>
                                        <th>Estado da venda</th>
                                        <th>Última Interação</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedClients.map((client) => (
                                        <tr key={client.id}>
                                            <td>{client.funcionario}</td>
                                            <td>{client.segmento}</td>
                                            <td>{client.cliente}</td>
                                            <td>{client.status}</td>
                                            <td>
                                                {formatarData(
                                                    client.ultimaInteracao
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className={styles.botao}
                                                    onClick={() =>
                                                        DetalhesClick(client)
                                                    }
                                                >
                                                    Detalhes
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {clienteSelecionado && (
                            <div
                                className={styles.modalOverlay}
                                onClick={() => setClienteSelecionado(null)}
                            >
                                <div
                                    className={styles.modalContent}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div
                                        className={styles["detalhes-container"]}
                                    >
                                        <h3>
                                            Detalhes de{" "}
                                            {clienteSelecionado.cliente}
                                        </h3>
                                        <p>
                                            <strong>Funcionário:</strong>{" "}
                                            {clienteSelecionado.funcionario}
                                        </p>
                                        <p>
                                            <strong>Estado:</strong>{" "}
                                            {clienteSelecionado.status}
                                        </p>
                                        <p>
                                            <strong>Última Interação:</strong>{" "}
                                            {formatarData(
                                                clienteSelecionado.ultimaInteracao
                                            )}
                                        </p>
                                        <p>
                                            <strong>Relatório:</strong>{" "}
                                            {
                                                clienteSelecionado.relatorio_interacao
                                            }
                                        </p>
                                        <button
                                            onClick={() =>
                                                setClienteSelecionado(null)
                                            }
                                            className={styles.closeButton}
                                        >
                                            Fechar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </ProtectRoute>
    );
}

export default App;
