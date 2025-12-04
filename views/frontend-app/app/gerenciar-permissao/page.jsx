"use client";
import { useState, useEffect } from "react";
import styles from "./App.module.css";
import ProtectRoute from "../../components/ProtectRoute";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const PERMISSOES = {
    Administrativo: [
        "Avaliação dos Eventos",
        "Cadastro de Funcionario",
        "Calendario",
        "Eventos",
        "Gestão de Localização",
        "Justificativas",
    ],

    Comercial: [
        "Agendamento",
        "Cotação e Coleta",
        "Desempenho dos Vendedores",
        "Funil de Vendas",
        "Gestão de Clientes",
    ],

    Comercial: [
        "Gestao de Formularios"
    ],

    Geral: [
        "Gerenciar Permissoes",
        "Dashboards",
        
    ],
    Relatorios: [
        "Administrativo",
        "Comercial",
        "Operacional",
    ]
};


const PERMISSAO_ID_MAP = {
    "Gerenciar Permissoes": 1,
    "Avaliação dos Eventos": 2,
    "Cadastro de Funcionario": 3,
    "Eventos": 4,
    "Gestão de Localização": 5,
    "Justificativas": 6,
    "Agendamento": 7,
    "Cotação e Coleta": 8,
    "Desempenho dos Vendedores": 9,
    "Funil de Vendas": 10,
    "Gestão de Clientes": 11,
    "Area do Agregado": 12,
    "Checklists e Formularios": 13,
    "Gestao de Formularios": 14,
    "Dashboards": 15,
    "Relatorios": 16,
    "Calendario": 17,
    "Administrativo": 18,
    "Comercial": 19,
    "Operacional": 20,
};


function Gerenciamento() {
    const [modalOpen, setModalOpen] = useState(false);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
    const [funcionarios, setFuncionarios] = useState([]);
    const [cargoSelecionado, setCargoSelecionado] = useState("");
    const [permissoesSelecionadas, setPermissoesSelecionadas] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const response = await axios.get(`${apiUrl}/funcionario`);
                setFuncionarios(response.data.funcionarios);
            } catch (error) {
                console.error("Erro ao buscar funcionários:", error);
            }
        };

        fetchFuncionarios();
    }, []);

    const abrirModal = async (func) => {
    try {
        console.log(func);

        const responsePermissoes = await axios.get(
            `${apiUrl}/api/funcionarios/${func.funcionario_ID}/perfis`
        );

        console.log(responsePermissoes);

        // Extrair nomes das permissões
        const permissoesDoBanco = responsePermissoes.data.map(
            (p) => p.nome
        );

        setFuncionarioSelecionado(func);
        setCargoSelecionado(func.permissao);

        // Agora isso funciona!
        setPermissoesSelecionadas(permissoesDoBanco);

        setModalOpen(true);
    } catch (error) {
        console.error("Erro ao buscar permissões:", error);
        alert("Erro ao carregar permissões.");
    }
};


    const fecharModal = () => {
        setModalOpen(false);
        setFuncionarioSelecionado(null);
        setCargoSelecionado("");
        setPermissoesSelecionadas([]);
        setIsSaving(false);
    };

    const togglePermissao = (tela) => {
        setPermissoesSelecionadas((prev) =>
            prev.includes(tela)
                ? prev.filter((p) => p !== tela)
                : [...prev, tela]
        );
    };

    const salvarAlteracoes = async (e) => {
        e.preventDefault();
        if (isSaving || !funcionarioSelecionado) return;

        setIsSaving(true);

        try {
            const funcionarioId = funcionarioSelecionado.funcionario_ID;

            const perfisParaEnviar = permissoesSelecionadas
                .map((nome) => PERMISSAO_ID_MAP[nome])
                .filter(Boolean);

            await fetch(
                `${apiUrl}/api/funcionarios/${funcionarioId}/perfisTodos`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ perfis: perfisParaEnviar }),
                }
            );

            setFuncionarios((prev) =>
                prev.map((f) =>
                    f.id === funcionarioId
                        ? { ...f, permissoes: permissoesSelecionadas }
                        : f
                )
            );

            console.log(JSON.stringify({ perfis: perfisParaEnviar }));
            alert("Alterações salvas com sucesso!");
            fecharModal();
        } catch (error) {
            console.error("Erro ao salvar alterações:", error);
            alert(`Erro ao salvar: ${error.message}`);
            setIsSaving(false);
        }
    };

    return (
        <ProtectRoute perfisPermitidos={["Gerenciar Permissoes"]}>
            <div className={styles.container}>
                <h1 className={styles.titulo}>Gerenciamento de Permissões</h1>

                <div className={styles.grid}>
                    {funcionarios.map((f) => (
                        <div key={f.funcionario_ID} className={styles.card}>
                            <p>
                                <strong>Funcionário:</strong> {f.nome}
                            </p>
                            <p>
                                <strong>Cargo:</strong> {f.cargo}
                            </p>
                            <button
                                className={styles.botao}
                                onClick={() => abrirModal(f)}
                            >
                                Editar
                            </button>
                        </div>
                    ))}
                </div>

                {modalOpen && funcionarioSelecionado && (
                    <div className={styles.overlay}>
                        <div className={styles.modal}>
                            <h2>Editar Funcionário</h2>
                            <form onSubmit={salvarAlteracoes}>
                                <label>
                                    Nome:
                                    <p>{funcionarioSelecionado.nome}</p>
                                </label>

                                <div className={styles.permissoesContainer}>
                                    {Object.entries(PERMISSOES).map(
                                        ([categoria, telas]) => (
                                            <div
                                                key={categoria}
                                                className={styles.categoria}
                                            >
                                                <h4>{categoria}</h4>
                                                {telas.map((tela) => (
                                                    <div
                                                        key={tela}
                                                        className={
                                                            styles.checkboxOption
                                                        }
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`${funcionarioSelecionado.id}-${tela}`}
                                                            checked={permissoesSelecionadas.includes(
                                                                tela
                                                            )}
                                                            onChange={() =>
                                                                togglePermissao(
                                                                    tela
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor={`${funcionarioSelecionado.id}-${tela}`}
                                                        >
                                                            {tela}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className={styles.modalButtons}>
                                    <button
                                        type="button"
                                        onClick={fecharModal}
                                        className={`${styles.botao} ${styles.cancelar}`}
                                        disabled={isSaving}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className={styles.botao}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? "Salvando..." : "Salvar"}
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

export default Gerenciamento;
