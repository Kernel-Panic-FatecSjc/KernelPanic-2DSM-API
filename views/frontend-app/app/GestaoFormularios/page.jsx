"use client";

import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";

export default function GestaoFormularios() {
    const apiUrl = process.env.REACT_APP_API_URL || process.env.VITE_API_URL || 'http://localhost:5000';

    const [formularios, setFormularios] = useState([
        { id: 1, nome: 'Cotação', area: 'Comercial', destaque: true, icone: 'document', respostas: [], tipo: "cotacao" },
        { id: 2, nome: 'Gestão da Coleta', area: 'Comercial', destaque: true, icone: 'cube', respostas: [], tipo: "gestao" },
        { id: 3, nome: 'Abertura da Empresa', area: 'Operacional', destaque: false, icone: 'building', respostas: [], tipo: "abertura" },
        { id: 4, nome: 'Fechamento da Empresa', area: 'Operacional', destaque: false, icone: 'logout', respostas: [], tipo: "fechamento" },
        { id: 5, nome: 'Manutenção Predial', area: 'Operacional', destaque: false, icone: 'tool', respostas: [], tipo: "manutencao_predial" },
        { id: 6, nome: 'Checklist Diário', area: 'Operacional', destaque: false, icone: 'clipboard', respostas: [], tipo: "diario" },
        { id: 7, nome: 'Checklist Veículo', area: 'Motorista', destaque: false, icone: 'truck', respostas: [], tipo: "veiculo" },
        { id: 8, nome: 'Cadastro do Motorista', area: 'Motorista', destaque: false, icone: 'user', respostas: [], tipo: "agregado" }
    ]);

    const [modalAberto, setModalAberto] = useState(false);
    const [formularioSelecionado, setFormularioSelecionado] = useState(null);

    const icones = {
        document: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>,
        cube: <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>,
        building: <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>,
        logout: <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>,
        tool: <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"></path>,
        clipboard: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>,
        truck: <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>,
        user: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    };


    const handleVisualizar = async (formulario) => {
        try {
            const response = await axios.get(`${apiUrl}/checklist/${formulario.tipo}`);
            setFormularioSelecionado({ ...formulario, respostas: response.data });
            console.log(response)
        } catch (error) {
            console.error("Erro ao buscar respostas:", error);
            setFormularioSelecionado(formulario);
        }
        setModalAberto(true);
    };
    const [respostaSelecionada, setRespostaSelecionada] = useState(null);
    const [respostaEditavel, setRespostaEditavel] = useState(null);

    const handleVisualizarResposta = (resposta) => {
        setRespostaSelecionada(resposta);
    };
    const handleEditarResposta = (resposta) => {
        setRespostaEditavel({ ...resposta });
    };


    const handlePutResposta = async (resposta) => {
        try {
            await axios.put(`${apiUrl}/checklist`, {
                data: { formID: resposta.id, formNewJSON: resposta.data }

            });

            console.log("Resposta deletada com sucesso");

        } catch (err) {
            console.error("Erro ao editar resposta:", error);
        }
    }


    const handleChangeCampo = (chave, valor) => {
        setRespostaEditavel(prev => ({
            ...prev,
            respostas: {
                ...prev.respostas,
                [chave]: valor
            }
        }));
    };

    const handleDeletarResposta = async (respostaId) => {
        if (window.confirm('Tem certeza que deseja deletar esta resposta?')) {
            try {
                console.log(respostaId)
                await axios.delete(`${apiUrl}/checklist`, {
                    data: { formID: respostaId }
                });

                const respostasAtualizadas = formularioSelecionado.respostas.filter(
                    r => r.id !== respostaId
                );
                setFormularioSelecionado({ ...formularioSelecionado, respostas: respostasAtualizadas });

                console.log("Resposta deletada com sucesso");
            } catch (error) {
                console.error("Erro ao deletar resposta:", error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.tittle}>Respostas</h1>
            </div>

            <div className={styles.grid}>
                {formularios.map((form) => (
                    <div key={form.id} className={`${styles.card} ${form.destaque ? styles.cardDestaque : styles.cardNormal}`}>
                        <div className={styles.cardContent}>
                            <div className={`${styles.iconContainer} ${form.destaque ? styles.iconContainerDestaque : styles.iconContainerNormal}`}>
                                <svg className={`${styles.icon} ${form.destaque ? styles.iconDestaque : styles.iconNormal}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {icones[form.icone]}
                                </svg>
                            </div>
                            <div>
                                <h3 className={`${styles.cardTitle} ${form.destaque ? styles.titleDestaque : styles.titleNormal}`}>{form.nome}</h3>
                                <span className={`${styles.cardArea} ${form.destaque ? styles.areaDestaque : styles.areaNormal}`}>{form.area}</span>
                            </div>
                            <div className={styles.buttonGroup}>
                                <button
                                    className={`${styles.btn} ${form.destaque ? styles.btnVisualizarDestaque : styles.btnVisualizarNormal}`}
                                    onClick={() => handleVisualizar(form)}
                                >
                                    Visualizar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {modalAberto && (
                <div className={styles.modalOverlay} onClick={() => setModalAberto(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{formularioSelecionado?.nome}</h2>
                            <button className={styles.modalClose} onClick={() => setModalAberto(false)}>×</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.modalInfo}>
                                <strong>Área:</strong> {formularioSelecionado?.area}<br />
                                <strong>Total de respostas:</strong> {formularioSelecionado?.respostas?.length || 0}
                            </div>

                            {formularioSelecionado?.respostas?.map((resposta, index) => (
                                <div key={resposta.checkFuncID || index} className={styles.responseItem}>
                                    <div className={styles.responseHeader}>
                                        <span className={styles.responseTitle}>
                                            Resposta #{resposta.checkFuncID || index + 1}
                                        </span>
                                        <div className={styles.responseButtons}>
                                            <button
                                                className={`${styles.btnSmall} ${styles.btnVisualizar}`}
                                                onClick={() => handleVisualizarResposta(resposta)}
                                            >
                                                Visualizar
                                            </button>
                                            <button
                                                className={`${styles.btnSmall} ${styles.btnAtualizar}`}
                                                onClick={() => handleEditarResposta(resposta)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className={`${styles.btnSmall} ${styles.btnDeletar}`}
                                                onClick={() => handleDeletarResposta(resposta.checkFuncID)}
                                            >
                                                Deletar
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.responseData}>
                                        <div className={styles.responseField}>
                                            <div className={styles.responseLabel}>ID:</div>
                                            <div className={styles.responseValue}>{resposta.checkFuncID}</div>
                                        </div>
                                        <div className={styles.responseField}>
                                            <div className={styles.responseLabel}>Tipo:</div>
                                            <div className={styles.responseValue}>{resposta.tipo}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {respostaSelecionada && (
                <div className={styles.modalOverlay} onClick={() => setRespostaSelecionada(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Detalhes da Resposta #{respostaSelecionada.checkFuncID}</h3>
                            <button className={styles.modalClose} onClick={() => setRespostaSelecionada(null)}>×</button>
                        </div>
                        <div className={styles.modalBody}>
                            <p><strong>Tipo:</strong> {respostaSelecionada.tipo}</p>
                            <h4>Respostas:</h4>
                            <div className={styles.responseDetails}>
                                {Object.entries(respostaSelecionada.respostas).map(([chave, valor]) => {
                                    if (typeof valor === "boolean") {
                                        valor = valor ? "Sim" : "Não";
                                    }

                                    if (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor)) {
                                        const [ano, mes, dia] = valor.split("-");
                                        valor = `${dia}/${mes}/${ano}`;
                                    }

                                    return (
                                        <div key={chave} className={styles.responseField}>
                                            <div className={styles.responseLabel}>
                                                {chave
                                                    .replace(/([A-Z])/g, " $1")
                                                    .replace(/_/g, " ")
                                                    .replace(/^./, str => str.toUpperCase())
                                                }:
                                            </div>
                                            <div className={styles.responseValue}>{String(valor)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {respostaEditavel && (
                <div className={styles.modalOverlay} onClick={() => setRespostaEditavel(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Editar Resposta #{respostaEditavel.checkFuncID}</h3>
                            <button
                                className={styles.modalClose}
                                onClick={() => setRespostaEditavel(null)}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <p>
                                <strong>Tipo:</strong> {respostaEditavel.tipo}
                            </p>
                            <h4>Respostas:</h4>
                            <div className={styles.responseDetails}>
                                {Object.entries(respostaEditavel.respostas).map(([chave, valor]) => {
                                    let isBoolean = false;
                                    if (typeof valor === "boolean") {
                                        isBoolean = true;
                                        valor = valor ? "Sim" : "Não";
                                    }

                                    if (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor)) {
                                        const [ano, mes, dia] = valor.split("-");
                                        valor = `${dia}/${mes}/${ano}`;
                                    }

                                    if (valor === "Sim" || valor === "Não") {
                                        isBoolean = true;
                                    }

                                    return (
                                        <div key={chave} className={styles.responseField}>
                                            <div className={styles.responseLabel}>
                                                {chave
                                                    .replace(/([A-Z])/g, " $1")
                                                    .replace(/_/g, " ")
                                                    .replace(/^./, (str) => str.toUpperCase())}
                                                :
                                            </div>
                                            <div className={styles.responseValue}>
                                                {isBoolean ? (
                                                    <select
                                                        value={valor}
                                                        onChange={(e) =>
                                                            handleChangeCampo(
                                                                chave,
                                                                e.target.value === "Sim" 
                                                            )
                                                        }
                                                    >
                                                        <option value="Sim">Sim</option>
                                                        <option value="Não">Não</option>
                                                    </select>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={valor}
                                                        onChange={(e) =>
                                                            handleChangeCampo(chave, e.target.value)
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <button
                                className={`${styles.btn} ${styles.btnAtualizar}`}
                                onClick={() => {
                                    console.log("Salvar resposta editada:", respostaEditavel);

                                    //Quando a rota de PUT estiver pronta
                                    // axios.put(`${apiUrl}/checklists`), {
                                    //     data: { resposta: respostaEditavel }
                                    // }
                                    setRespostaEditavel(null);
                                }}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}