"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./App.module.css";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState("newest");
    const [clientes, setClients] = useState([]);

    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [newClient, setNewClient] = useState({
        cliente: "",
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        segmento: "",
        status: "Pendente",
        departamento: "",
        tipoContato: "telefone",
        contatoValor: "",
    });

    // DADOS mockados para teste
    const dadosMockados = [
        {
            id: 1,
            cliente: "José",
            endereco: "Engenheiro Jose Longo, 622, São José dos Campos - SP",
            segmento: "O coelho gordo",
            status: "Pendente",
            contatos: "telefone: (12) 1111-1111 | telefone: (12) 1111-1110",
            tipoContato: "telefone",
            contatoValor: "(12) 1111-1111",
            departamento: "Vendas",
            departamentoId: 1,
            ultimaInteracao: "2019-04-29",
            vendas: 45200,
        },
        {
            id: 2,
            cliente: "Dani",
            endereco: "Engenheiro Jose Longo, 622, São José dos Campos - SP",
            segmento: "A coelha medrosa",
            status: "Ativo",
            contatos: "telefone: (12) 2222-2222 | telefone: (12) 2222-2220",
            tipoContato: "telefone",
            contatoValor: "(12) 2222-2222",
            departamento: "Suporte",
            departamentoId: 2,
            ultimaInteracao: "2019-05-15",
            vendas: 78900,
        },
        {
            id: 3,
            cliente: "Amy",
            endereco: "Engenheiro Jose Longo, 622, São José dos Campos - SP",
            segmento: "A coelha exploradora",
            status: "Concluído",
            contatos: "telefone: (12) 3333-3333 | telefone: (12) 3333-3330",
            tipoContato: "telefone",
            contatoValor: "(12) 3333-3333",
            departamento: "Marketing",
            departamentoId: 3,
            ultimaInteracao: "2019-06-02",
            vendas: 125500,
        },
        {
            id: 4,
            cliente: "Frida",
            endereco: "Engenheiro Jose Longo, 622, São José dos Campos - SP",
            segmento: "A coelha destemida",
            status: "Ativo",
            contatos: "telefone: (12) 4444-4444 | telefone: (12) 4444-4440",
            tipoContato: "telefone",
            contatoValor: "(12) 4444-4444",
            departamento: "Consultoria",
            departamentoId: 4,
            ultimaInteracao: "2019-05-20",
            vendas: 92300,
        },
        {
            id: 5,
            cliente: "Hanna",
            endereco: "Engenheiro Jose Longo, 622, São José dos Campos - SP",
            segmento: "O coelho curioso",
            status: "Pendente",
            contatos: "telefone: (12) 5555-5555 | telefone: (12) 5555-5550",
            tipoContato: "telefone",
            contatoValor: "(12) 5555-5555",
            departamento: "Desenvolvimento",
            departamentoId: 5,
            ultimaInteracao: "2019-04-10",
            vendas: 63800,
        },
    ];

    const fetchClientes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/gestao");
            const clientes = response.data.message;

            const mapaClientes = clientes.map((cliente) => {
                const contatos =
                    cliente.contatos
                        ?.map((c) => `${c.tipo_contato}: ${c.valor_contato}`)
                        .join(" | ") || "";
                const primeiroContato = cliente.contatos?.[0] || {};

                const ultimaVenda = cliente.vendas?.[cliente.vendas.length - 1];
                const ultimaInteracao =
                    cliente.interacoes?.[cliente.interacoes.length - 1];

                return {
                    id: cliente.cliente_ID,
                    cliente: cliente.nome || "",
                    endereco: cliente.endereco || "",
                    segmento: cliente.segmentoAtuacao || "",
                    status: ultimaVenda?.status || "Sem venda",
                    contatos,
                    tipoContato: primeiroContato.tipo_contato || "telefone",
                    contatoValor: primeiroContato.valor_contato || "",
                    departamento: cliente.funcionario?.cargo || "",
                    departamentoId: cliente.funcionario?.funcionario_ID || null,
                    ultimaInteracao:
                        ultimaInteracao?.data_interacao ||
                        ultimaVenda?.data_venda ||
                        "Sem interação",
                    vendas: ultimaVenda?.valor || 0,
                };
            });

            setClients(mapaClientes);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            setClients(dadosMockados);
        }
    };

    useEffect(() => {
        setClients(dadosMockados);
    }, []);

    // NUMERO de clientes
    const totalClientes = clientes.length;
    const clientesPendentes = clientes.filter((c) =>
        c.status.toLowerCase().includes("pendente")
    ).length;
    const clientesAtivos = clientes.filter((c) =>
        c.status.toLowerCase().includes("ativo")
    ).length;

    const filteredClients = clientes.filter(
        (client) =>
            client.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.contatos.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.departamento.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedClients = [...filteredClients].sort((a, b) => {
        const dateA = new Date(a.ultimaInteracao).getTime();
        const dateB = new Date(b.ultimaInteracao).getTime();
        return sortKey === "newest" ? dateB - dateA : dateA - dateB;
    });

    const getStatusClass = (status) => {
        const statusLower = status.toLowerCase();
        if (statusLower.includes("pendente")) return "pendente";
        if (statusLower.includes("ativo")) return "ativo";
        if (
            statusLower.includes("concluido") ||
            statusLower.includes("concluído")
        )
            return "concluido";
        return "pendente";
    };

    const formatCurrency = (value) => {
        return `R$ ${value.toLocaleString("pt-BR", {
            minimumFractionDigits: 3,
        })}`;
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newClient.cliente?.trim()) {
            alert("O nome do cliente não pode ficar vazio!");
            return;
        }

        const novoId =
            clientes.length > 0
                ? Math.max(...clientes.map((c) => c.id)) + 1
                : 1;
        const endereco = `${newClient.rua}, ${newClient.bairro}, ${newClient.cidade} - ${newClient.estado}, CEP: ${newClient.cep}`;

        const novoCliente = {
            id: novoId,
            cliente: newClient.cliente,
            endereco: endereco,
            segmento: newClient.segmento,
            status: newClient.status,
            contatos: `${newClient.tipoContato}: ${newClient.contatoValor}`,
            tipoContato: newClient.tipoContato,
            contatoValor: newClient.contatoValor,
            departamento: newClient.departamento,
            departamentoId: null,
            ultimaInteracao: new Date().toISOString(),
            vendas: 0,
        };

        setClients([...clientes, novoCliente]);
        setShowModalAdd(false);
        setNewClient({
            cliente: "",
            cep: "",
            rua: "",
            bairro: "",
            cidade: "",
            estado: "",
            segmento: "",
            status: "Pendente",
            departamento: "",
            tipoContato: "telefone",
            contatoValor: "",
        });
        alert("Cliente adicionado com sucesso!");
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!selectedClient.cliente?.trim()) {
            alert("O nome do cliente não pode ficar vazio!");
            return;
        }

        const dadosEnvio = {
            cliente: {
                nome: selectedClient.cliente.trim(),
                endereco: selectedClient.endereco?.trim() || "",
                segmentoAtuacao: selectedClient.segmento?.trim() || "",
                contatos: selectedClient.contatoValor?.trim()
                    ? [
                          {
                              tipo_contato:
                                  selectedClient.tipoContato || "telefone",
                              valor_contato: selectedClient.contatoValor.trim(),
                          },
                      ]
                    : [],
            },
            status: selectedClient.status || "",
            funcionario: {
                cargo: selectedClient.departamento || "",
                funcionario_ID: selectedClient.departamentoId || null,
            },
        };

        try {
            const response = await axios.put(
                `http://localhost:5000/gestao/${selectedClient.id}`,
                dadosEnvio
            );
            const updated = response.data;

            const updatedClients = clientes.map((c) =>
                c.id === selectedClient.id
                    ? {
                          ...c,
                          cliente: updated.cliente.nome,
                          endereco: updated.cliente.endereco,
                          segmento: updated.cliente.segmentoAtuacao,
                          contatos:
                              updated.cliente.contatos
                                  ?.map(
                                      (ct) =>
                                          `${ct.tipo_contato}: ${ct.valor_contato}`
                                  )
                                  .join(" | ") || "",
                          tipoContato:
                              updated.cliente.contatos?.[0]?.tipo_contato ||
                              "telefone",
                          contatoValor:
                              updated.cliente.contatos?.[0]?.valor_contato ||
                              "",
                          status: updated.status,
                          departamento: updated.funcionario.cargo || "",
                          departamentoId:
                              updated.funcionario?.funcionario_ID || null,
                      }
                    : c
            );

            setClients(updatedClients);
            setShowModalUpdate(false);
            alert("Atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar:", error);

            const updatedClients = clientes.map((c) =>
                c.id === selectedClient.id ? { ...selectedClient } : c
            );
            setClients(updatedClients);
            setShowModalUpdate(false);
            alert("Atualizado com sucesso! (modo teste)");
        }
    };

    return (
        <div className={styles.conteudo}>
            <div className={styles["container-gestao"]}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.titulo}>Gestão de clientes</h1>
                        <p className={styles.subtitulo}>
                            Gerencie seus clientes e acompanhe vendas
                        </p>
                    </div>
                    <div className={styles.headerRight}>
                        <div className={styles.statCard}>
                            <p
                                className={`${styles.statNumber} ${styles.total}`}
                            >
                                {totalClientes}
                            </p>
                            <p className={styles.statLabel}>Total Clientes</p>
                        </div>
                        <div className={styles.statCard}>
                            <p
                                className={`${styles.statNumber} ${styles.pendente}`}
                            >
                                {clientesPendentes}
                            </p>
                            <p className={styles.statLabel}>Pendentes</p>
                        </div>
                        <div className={styles.statCard}>
                            <p
                                className={`${styles.statNumber} ${styles.ativo}`}
                            >
                                {clientesAtivos}
                            </p>
                            <p className={styles.statLabel}>Ativos</p>
                        </div>
                    </div>
                </div>
                {/* BARRAS */}
                <div className={styles.searchContainer}>
                    <div className={styles.leftControls}>
                        <input
                            type="text"
                            placeholder="Buscar clientes..."
                            className={styles.pesquisa}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className={styles.addButton}
                            onClick={() => setShowModalAdd(true)}
                        >
                            Adicionar novo cliente
                        </button>
                    </div>
                    <select
                        className={styles.sortDropdown}
                        value={sortKey}
                        onChange={(e) => setSortKey(e.target.value)}
                    >
                        <option value="newest">Ordenar: Mais recentes</option>
                        <option value="oldest">Ordenar: Mais antigas</option>
                    </select>
                </div>

                {/* CARDS */}
                <div className={styles.cardsContainer}>
                    {sortedClients.map((client) => (
                        <div key={client.id} className={styles.clientCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.clientInfo}>
                                    <h3>{client.cliente}</h3>
                                    <p>{client.segmento || "Sem segmento"}</p>
                                </div>
                                <span
                                    className={`${styles.statusBadge} ${
                                        styles[getStatusClass(client.status)]
                                    }`}
                                >
                                    {client.status}
                                </span>
                            </div>

                            <div className={styles.cardDetails}>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Última Interação
                                    </span>
                                    <span className={styles.detailValue}>
                                        {new Date(
                                            client.ultimaInteracao
                                        ).toLocaleDateString("pt-BR")}
                                    </span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Vendas
                                    </span>
                                    <span className={styles.detailValue}>
                                        {formatCurrency(client.vendas)}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.cardActions}>
                                <button className={styles.btnDetalhes}>
                                    Histórico de interações
                                </button>
                                <button
                                    className={styles.btnEditar}
                                    onClick={() => {
                                        setSelectedClient(client);
                                        setShowModalUpdate(true);
                                    }}
                                >
                                    Editar
                                </button>
                                <button className={styles.btnExcluir}>
                                    Deletar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModalUpdate && selectedClient && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setShowModalUpdate(false)}
                        >
                            X
                        </button>
                        <h2>Editar Cliente</h2>
                        <form onSubmit={handleSave}>
                            <label>Nome:</label>
                            <input
                                type="text"
                                className={styles.inputText}
                                value={selectedClient.cliente}
                                onChange={(e) =>
                                    setSelectedClient({
                                        ...selectedClient,
                                        cliente: e.target.value,
                                    })
                                }
                            />

                            <label>Endereço:</label>
                            <input
                                type="text"
                                className={styles.inputText}
                                value={selectedClient.endereco}
                                onChange={(e) =>
                                    setSelectedClient({
                                        ...selectedClient,
                                        endereco: e.target.value,
                                    })
                                }
                            />

                            <label>Segmento:</label>
                            <input
                                type="text"
                                className={styles.inputText}
                                value={selectedClient.segmento || ""}
                                onChange={(e) =>
                                    setSelectedClient({
                                        ...selectedClient,
                                        segmento: e.target.value,
                                    })
                                }
                            />

                            <label>Status da venda:</label>
                            <input
                                type="text"
                                className={styles.inputText}
                                value={selectedClient.status}
                                onChange={(e) =>
                                    setSelectedClient({
                                        ...selectedClient,
                                        status: e.target.value,
                                    })
                                }
                            />

                            <label>Departamento:</label>
                            <input
                                type="text"
                                className={styles.inputText}
                                value={selectedClient.departamento}
                                onChange={(e) =>
                                    setSelectedClient({
                                        ...selectedClient,
                                        departamento: e.target.value,
                                    })
                                }
                            />

                            <label>Contato: </label>
                            <select
                                id="contato"
                                className={styles.selectInput}
                                value={selectedClient.tipoContato || "telefone"}
                                onChange={(e) =>
                                    setSelectedClient({
                                        ...selectedClient,
                                        tipoContato: e.target.value,
                                    })
                                }
                            >
                                <option value="email">E-mail</option>
                                <option value="telefone">Telefone</option>
                                <option value="celular">Celular</option>
                            </select>
                            <input
                                className={styles.inputText}
                                type="text"
                                value={selectedClient.contatoValor || ""}
                                onChange={(e) =>
                                    setSelectedClient({
                                        ...selectedClient,
                                        contatoValor: e.target.value,
                                    })
                                }
                            />

                            <button type="submit" className={styles.botao}>
                                Salvar
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL de adicionar cliente */}
            {showModalAdd && (
                <div className={styles.modalAddOverlay}>
                    <div className={styles.modalAddContent}>
                        <h2>Adicionar novo cliente</h2>
                        <p className={styles.subtitle}>
                            Preencha os dados abaixo para cadastrar um novo
                            cliente no sistema
                        </p>

                        <form onSubmit={handleAdd}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    Nome do cliente *
                                </label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={newClient.cliente}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            cliente: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>CEP</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={newClient.cep}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            cep: e.target.value,
                                        })
                                    }
                                    placeholder="00000-000"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    Rua/Avenida
                                </label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={newClient.rua}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            rua: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    Bairro
                                </label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={newClient.bairro}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            bairro: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    Cidade
                                </label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={newClient.cidade}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            cidade: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    Estado
                                </label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={newClient.estado}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            estado: e.target.value,
                                        })
                                    }
                                    placeholder="SP"
                                    maxLength="2"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    Segmento de atuação
                                </label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={newClient.segmento}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            segmento: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    Status da venda
                                </label>
                                <select
                                    className={styles.formSelect}
                                    value={newClient.status}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            status: e.target.value,
                                        })
                                    }
                                >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Ativo">Ativo</option>
                                    <option value="Concluído">Concluído</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    Departamento responsável
                                </label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={newClient.departamento}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            departamento: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    Tipo de contato
                                </label>
                                <select
                                    className={styles.formSelect}
                                    value={newClient.tipoContato}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            tipoContato: e.target.value,
                                        })
                                    }
                                >
                                    <option value="telefone">Telefone</option>
                                    <option value="celular">Celular</option>
                                    <option value="email">E-mail</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    Contato
                                </label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={newClient.contatoValor}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            contatoValor: e.target.value,
                                        })
                                    }
                                    placeholder={
                                        newClient.tipoContato === "email"
                                            ? "exemplo@email.com"
                                            : "(00) 00000-0000"
                                    }
                                />
                            </div>

                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    className={styles.btnCancel}
                                    onClick={() => setShowModalAdd(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={styles.btnSubmit}
                                >
                                    Adicionar cliente
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
