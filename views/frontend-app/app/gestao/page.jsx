"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./App.module.css";
import ProtectRoute from "../../components/ProtectRoute";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState("newest");
    const [clientes, setClients] = useState([]);

    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const funcionariosMocados = [
        { id: 1, nome: "Carlos Silva", email: "carlos@empresa.com" },
        { id: 2, nome: "Ana Oliveira", email: "ana@empresa.com" },
        { id: 3, nome: "João Souza", email: "joao@empresa.com" },
    ];

    const dadosMockados = [];

    const [showModalAdd, setShowModalAdd] = useState(false);


    const [newClient, setNewClient] = useState({
        nome: "",
        endereco: "",
        segmento: "",
        funcionario_ID: "",
        funil_ID: "",
        tipo_contato: "telefone",
        valor_contato: "",
    });

    const fetchClientes = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

            const response = await axios.get(`${apiUrl}/clientes`);

            const clientesData = response.data.message || response.data;

            const mapaClientes = clientesData.map((cliente) => {
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
                    departmentoId: cliente.funcionario?.funcionario_ID || null, // Corrigido
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

        }
    };

    useEffect(() => {
        const carregarClientes = async () => {
            try {
                await fetchClientes();
            } catch (error) {
                console.warn("API offline, usando dados mockados...");
            }
        };

        carregarClientes();
    }, []);

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
            minimumFractionDigits: 2,
        })}`;
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        if (!newClient.nome?.trim()) {
            console.warn("O nome do cliente não pode ficar vazio!");
            return;
        }
        if (!newClient.funcionario_ID || !newClient.funil_ID) {
            console.warn("Por favor, selecione um funcionário e um funil.");
            return;
        }

        const formData = {
            nome: newClient.nome,
            endereco: newClient.endereco,
            segmento: newClient.segmento || "Não informado",
            funcionario_ID: Number(newClient.funcionario_ID),
            funil_ID: Number(newClient.funil_ID),
            tipo_contato: newClient.tipo_contato,
            valor_contato: newClient.valor_contato,
        };

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            await axios.post(`${apiUrl}/clientes`, formData);

            console.log("Cliente adicionado com sucesso!");
            await fetchClientes();

            setNewClient({
                nome: "",
                endereco: "",
                segmento: "",
                funcionario_ID: "",
                funil_ID: "",
                tipo_contato: "telefone",
                valor_contato: "",
            });

            setShowModalAdd(false);
        } catch (error) {
            console.error(error);
            console.error("Erro ao adicionar cliente. Tente novamente!");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!selectedClient.cliente?.trim()) {
            console.warn("O nome do cliente não pode ficar vazio!");
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
                funcionario_ID: selectedClient.departmentoId || null,
            },
        };

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const response = await axios.put(
                `${apiUrl}/clientes/${selectedClient.id}`,
                dadosEnvio
            );

            const updated = response.data;
            const updatedClients = clientes.map((c) =>
                c.id === selectedClient.id ? { ...c, ...selectedClient } : c
            );
            setClients(updatedClients);
            await fetchClientes();

            setShowModalUpdate(false);
            console.log("Atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            const updatedClients = clientes.map((c) =>
                c.id === selectedClient.id ? { ...selectedClient } : c
            );
            setClients(updatedClients);
            setShowModalUpdate(false);
            console.log("Atualizado com sucesso! (modo teste)");
        }
    };

    const handleDelete = async (clientId) => {
        if (!window.confirm("Tem certeza que deseja excluir este cliente?")) {
            return;
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            await axios.delete(`${apiUrl}/clientes/${clientId}`);

            setClients(clientes.filter((c) => c.id !== clientId));
            console.log("Cliente excluído com sucesso!");

        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            alert("Erro ao excluir cliente. Tente novamente.");
        }
    };


    return (
        <ProtectRoute>
            <div className={styles.conteudo}>
                <div className={styles["container-gestao"]}>
                    <div className={styles.header}>
                        <div className={styles.headerLeft}>
                            <h1 className={styles.titulo}>Gestão de clientes</h1>
                        </div>
                        <div className={styles.headerRight}>
                            <div className={styles.statCard}>
                                <p className={`${styles.statNumber} ${styles.total}`}>
                                    {totalClientes}
                                </p>
                                <p className={styles.statLabel}>Total Clientes</p>
                            </div>
                            <div className={styles.statCard}>
                                <p className={`${styles.statNumber} ${styles.pendente}`}>
                                    {clientesPendentes}
                                </p>
                                <p className={styles.statLabel}>Pendentes</p>
                            </div>
                            <div className={styles.statCard}>
                                <p className={`${styles.statNumber} ${styles.ativo}`}>
                                    {clientesAtivos}
                                </p>
                                <p className={styles.statLabel}>Ativos</p>
                            </div>
                        </div>
                    </div>

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


                    <div className={styles.cardsContainer}>
                        {sortedClients.map((client) => (
                            <div key={client.id} className={styles.clientCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.clientInfo}>
                                        <h3>{client.cliente}</h3>
                                        <p>{client.segmento || "Sem segmento"}</p>
                                    </div>
                                    <span
                                        className={`${styles.statusBadge} ${styles[getStatusClass(client.status)]
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
                                            ).toLocaleDateString("pt-BR", { timeZone: 'UTC' })}
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
                                    <button
                                        className={styles.btnExcluir}
                                        onClick={() => handleDelete(client.id)}
                                    >
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

                {showModalAdd && (
                    <div className={styles.modalAddOverlay}>
                        <div className={styles.modalAddContent}>
                            <h2>Adicionar novo cliente</h2>
                            <p className={styles.subtitle}>
                                Preencha os dados abaixo para cadastrar um novo
                                cliente no sistema.
                            </p>

                            <form onSubmit={handleAdd}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        Nome do cliente *
                                    </label>
                                    <input
                                        type="text"
                                        className={styles.formInput}
                                        value={newClient.nome}
                                        onChange={(e) =>
                                            setNewClient({
                                                ...newClient,
                                                nome: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        Endereço
                                    </label>
                                    <input
                                        type="text"
                                        className={styles.formInput}
                                        value={newClient.endereco}
                                        onChange={(e) =>
                                            setNewClient({
                                                ...newClient,
                                                endereco: e.target.value,
                                            })
                                        }
                                        placeholder="Rua, número, bairro, cidade"
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
                                        placeholder="Ex: Tecnologia, Varejo..."
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        Funcionário responsável
                                    </label>
                                    <select
                                        className={styles.formSelect}
                                        value={newClient.funcionario_ID}
                                        onChange={(e) =>
                                            setNewClient({
                                                ...newClient,
                                                funcionario_ID: e.target.value,
                                            })
                                        }
                                        required
                                    >
                                        <option value="">
                                            Selecione um funcionário
                                        </option>
                                        {funcionariosMocados.map((vendedor) => (
                                            <option
                                                key={vendedor.id}
                                                value={vendedor.id}
                                            >
                                                {vendedor.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        Funil de vendas
                                    </label>
                                    <select
                                        className={styles.formSelect}
                                        value={newClient.funil_ID}
                                        onChange={(e) =>
                                            setNewClient({
                                                ...newClient,
                                                funil_ID: e.target.value,
                                            })
                                        }
                                        required
                                    >
                                        <option value="">Selecione um funil</option>
                                        <option value={1}>Prospecção</option>
                                        <option value={2}>Followup</option>
                                        <option value={3}>Negociação</option>
                                        <option value={4}>Inicial</option>
                                        <option value={5}>Potencial</option>
                                        <option value={6}>Manutencao</option>
                                        <option value={7}>Nao Venda</option>
                                        <option value={8}>Venda</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        Tipo de contato
                                    </label>
                                    <select
                                        className={styles.formSelect}
                                        value={newClient.tipo_contato}
                                        onChange={(e) =>
                                            setNewClient({
                                                ...newClient,
                                                tipo_contato: e.target.value,
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
                                        value={newClient.valor_contato}
                                        onChange={(e) =>
                                            setNewClient({
                                                ...newClient,
                                                valor_contato: e.target.value,
                                            })
                                        }
                                        placeholder={
                                            newClient.tipo_contato === "email"
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
        </ProtectRoute>
    );
}

export default App;