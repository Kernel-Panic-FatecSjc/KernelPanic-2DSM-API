'use client';

import React, { useState } from 'react';
import styles from './App.module.css';
import CalculadoraCotacao from '../../components/layout/CalculadoraCotacao/CalculadoraCotacao'; 

export default function GestaoComercial() {
    const [modalAberto, setModalAberto] = useState(false);
    const [calculadoraAberta, setCalculadoraAberta] = useState(false);

    const handleCalculadoraClick = () => {
        setCalculadoraAberta(true);
    };

    const handleFormularioClick = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setCalculadoraAberta(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //AQUI: Coletar os dados do formulário
        //AQUI: Enviar os dados para o backend/API
        //AQUI: Redirecionar para a página onde o operacional visualiza os dados

        setModalAberto(false);
    };

    return (
         <ProtectRoute>
                 <div className={styles.conteudo}>
            <div className={styles.containerCentral}>
                <div className={styles.header}>
                    <h1 className={styles.titulo}>Gestão Comercial</h1>
                    <p className={styles.subtitulo}>
                        Acesse as ferramentas comerciais e operacionais
                    </p>
                </div>

                <div className={styles.cardsRow}>
                    <div
                        className={styles.toolCard}
                        onClick={handleCalculadoraClick}
                    >
                        <div className={styles.cardIcon}>
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="2"
                            >
                                <rect x="4" y="2" width="16" height="20" rx="2" />
                                <line x1="8" y1="6" x2="16" y2="6" />
                                <line x1="8" y1="10" x2="10" y2="10" strokeWidth="3" strokeLinecap="round" />
                                <line x1="14" y1="10" x2="16" y2="10" strokeWidth="3" strokeLinecap="round" />
                                <line x1="8" y1="14" x2="10" y2="14" strokeWidth="3" strokeLinecap="round" />
                                <line x1="14" y1="14" x2="16" y2="14" strokeWidth="3" strokeLinecap="round" />
                                <line x1="8" y1="18" x2="16" y2="18" />
                            </svg>
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Calculadora de Cotação</h3>
                            <p className={styles.cardDescription}>
                                Calcule valores e gere orçamentos automaticamente
                            </p>
                        </div>
                    </div>

                    <div
                        className={styles.toolCard}
                        onClick={handleFormularioClick}
                    >
                        <div className={styles.cardIcon}>
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="2"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14,2 14,8 20,8" />
                                <line x1="9" y1="13" x2="15" y2="13" />
                                <line x1="9" y1="17" x2="15" y2="17" />
                            </svg>
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>
                                Formulário de Gestão de Coleta
                            </h3>
                            <p className={styles.cardDescription}>
                                Registre e gerencie informações de coletas
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal da Calculadora */}
            {calculadoraAberta && (
                <div
                    className={styles.modalOverlay}
                    onClick={fecharModal}
                >
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxWidth: '600px' }} // Ajuste o tamanho para a calculadora
                    >
                        <button
                            className={styles.closeButton}
                            onClick={fecharModal}
                        >
                            ×
                        </button>

                        <h2 className={styles.modalTitle}>Calculadora de Cotação</h2>
                        <p className={styles.modalSubtitle}>
                            Calcule o valor do frete para sua cotação
                        </p>

                        <CalculadoraCotacao />
                    </div>
                </div>
            )}

            {/* Modal do Formulário (mantido original) */}
            {modalAberto && (
                <div
                    className={styles.modalOverlay}
                    onClick={fecharModal}
                >
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.closeButton}
                            onClick={fecharModal}
                        >
                            ×
                        </button>

                        <h2 className={styles.modalTitle}>Gestão de Coleta</h2>
                        <p className={styles.modalSubtitle}>
                            Preencha os dados da coleta
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Cliente</label>
                                <input
                                    type="text"
                                    placeholder="Nome do cliente"
                                    className={styles.formInput}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Data da Coleta</label>
                                <input
                                    type="date"
                                    className={styles.formInput}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Endereço de Coleta</label>
                                <input
                                    type="text"
                                    placeholder="Endereço completo"
                                    className={styles.formInput}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Tipo de Carga</label>
                                <select className={styles.formSelect} required>
                                    <option value="">Selecione</option>
                                    <option value="granel">Granel</option>
                                    <option value="container">Container</option>
                                    <option value="carga-geral">Carga Geral</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Observações</label>
                                <textarea
                                    placeholder="Informações adicionais"
                                    rows="4"
                                    className={styles.formTextarea}
                                />
                            </div>

                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    onClick={fecharModal}
                                    className={styles.btnCancel}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={styles.btnSubmit}
                                >
                                    Salvar
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