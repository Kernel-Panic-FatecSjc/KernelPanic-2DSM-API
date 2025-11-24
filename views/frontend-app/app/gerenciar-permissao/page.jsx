"use client";
import { useState, useEffect } from "react";
import styles from "./App.module.css";
import ProtectRoute from "../../components/ProtectRoute";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const funcionariosMocados = [
    {
        id: 1,
        nome: "Carlos Silva",
        permissao: "Carregando...",
        email: "carlos@empresa.com",
    },
    {
        id: 2,
        nome: "Ana Oliveira",
        permissao: "Carregando...",
        email: "ana@empresa.com",
    },
    {
        id: 3,
        nome: "João Souza",
        permissao: "Carregando...",
        email: "joao@empresa.com",
    },
];

const PERFIL_MAP = {
    master: 1,
    vendedor: 2,
    gestor: 3,
};

function Gerenciamento() {
    const [modalOpen, setModalOpen] = useState(false);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
    const [funcionarios, setFuncionarios] = useState(funcionariosMocados);
    const [cargoSelecionado, setCargoSelecionado] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const response = await axios.get(`${apiUrl}/funcionario`);
                console.log("AUQ");
                console.log(response.data); 
                setFuncionarios(response.data.funcionarios);

            } catch (error) {
                console.error("Erro ao buscar funcionários:", error);
            }
        };

        fetchFuncionarios();
    }, []);

    const abrirModal = (func) => {
        setFuncionarioSelecionado(func);
        setCargoSelecionado(func.permissao);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setFuncionarioSelecionado(null);
        setCargoSelecionado("");
        setIsSaving(false);
    };

    const salvarAlteracoes = async (e) => {
        e.preventDefault();
        if (isSaving || !funcionarioSelecionado) return;

        if (cargoSelecionado === funcionarioSelecionado.permissao) {
            alert("Nenhuma alteração detectada no cargo.");
            fecharModal();
            return;
        }

        setIsSaving(true);

        try {
            const funcionarioId = funcionarioSelecionado.id;
            const perfilAntigoId = funcionarioSelecionado.perfilIdOriginal;
            const perfilNovoId = PERFIL_MAP[cargoSelecionado];

            if (!perfilNovoId) {
                throw new Error(
                    `Perfil "${cargoSelecionado}" não tem um ID mapeado.`
                );
            }

            if (perfilAntigoId) {
                const resDelete = await fetch(
                    `${API_URL}/funcionarios/${funcionarioId}/perfis/${perfilAntigoId}`,
                    {
                        method: "DELETE",
                    }
                );
                if (!resDelete.ok)
                    throw new Error("Falha ao remover o perfil antigo.");
            }

            const resAdd = await fetch(
                `${API_URL}/funcionarios/${funcionarioId}/perfis`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ perfis: [perfilNovoId] }),
                }
            );
            if (!resAdd.ok)
                throw new Error("Falha ao adicionar o novo perfil.");

            setFuncionarios((funcionariosAtuais) =>
                funcionariosAtuais.map((f) =>
                    f.id === funcionarioId
                        ? {
                              ...f,
                              permissao: cargoSelecionado,
                              perfilIdOriginal: perfilNovoId,
                          }
                        : f
                )
            );

            alert("Cargo atualizado com sucesso!");
            fecharModal();
        } catch (error) {
            console.error("Erro ao salvar alterações:", error);

            alert(`Erro ao salvar: ${error.message}`);
            setIsSaving(false);
        }
    };

    return (
        <ProtectRoute perfisPermitidos={["master"]}>
            <div className={styles.container}>
                <h1 className={styles.titulo}>Gerenciamento de Permissões</h1>

                <div className={styles.grid}>
                    {funcionarios.map((f) => (
                        <div key={f.id} className={styles.card}>
                            <p>
                                <strong>Funcionário:</strong> {f.nome}
                            </p>
                            <p>
                                <strong>Nível de permissão: </strong>
                                {f.cargo}
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
                                    Nome:<p>{funcionarioSelecionado.nome}</p>
                                </label>

                                <label>
                                    Cargo:
                                    <select
                                        value={cargoSelecionado}
                                        onChange={(e) =>
                                            setCargoSelecionado(e.target.value)
                                        }
                                    >
                                        {Object.keys(PERFIL_MAP).map(
                                            (nomePerfil) => (
                                                <option
                                                    key={nomePerfil}
                                                    value={nomePerfil}
                                                >
                                                    {nomePerfil}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </label>

                                <div className={styles.checkboxGroup}>
                                    <label className={styles.inputtitle}>
                                        Pode cadastrar
                                    </label>
                                    <div className={styles.checkboxOption}>
                                        <input
                                            className={styles.inputcheckbox}
                                            type="checkbox"
                                            id="sim2"
                                            name="sim2"
                                        />
                                        <label htmlFor="sim2">Sim</label>
                                    </div>
                                </div>

                                <div className={styles.checkboxGroup}>
                                    <label className={styles.inputtitle}>
                                        Pode ver funcionarios{" "}
                                    </label>
                                    <div className={styles.checkboxOption}>
                                        <input
                                            className={styles.inputcheckbox}
                                            type="checkbox"
                                            id="sim3"
                                            name="sim3"
                                        />
                                        <label htmlFor="sim3">Sim</label>
                                    </div>
                                </div>

                                <div className={styles.checkboxGroup}>
                                    <label className={styles.inputtitle}>
                                        Pode gerenciar Clientes
                                    </label>
                                    <div className={styles.checkboxOption}>
                                        <input
                                            className={styles.inputcheckbox}
                                            type="checkbox"
                                            id="sim4"
                                            name="sim4"
                                        />
                                        <label htmlFor="sim4">Sim</label>
                                    </div>
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
