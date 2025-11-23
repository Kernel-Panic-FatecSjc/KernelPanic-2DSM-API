'use client';
import React, { useState } from 'react';
import styles from './App.module.css';

function Page() {

    const cargoImagens = {
        Comercial: "/images/iconComercial.svg",
        Operacional: "/images/iconOperacional.svg",
        Administrador: "/images/iconAdm.svg"
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [justificativaSelecionada, setJustificativaSelecionada] = useState("");

    const abrirModal = (justificativa) => {
        setJustificativaSelecionada(justificativa);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setJustificativaSelecionada("");
    };

    const [eventos, setEventos] = useState([
        {
            id: 1,
            nome: "Evento XPTO",
            funcionarios: [
                { id: 1, nome: "José Ricardo", cargo: "Administrador", avaliacao: 4, justificativa: "Não pôde comparecer por motivos pessoais." },
                { id: 2, nome: "Daniele", cargo: "Operacional", avaliacao: 3, justificativa: "Conflito de horário com outro compromisso." }
            ]
        },
        {
            id: 2,
            nome: "Evento XPTO",
            funcionarios: [
                { id: 1, nome: "José Ricardo", cargo: "Comercial", avaliacao: 2, justificativa: "Estava em atendimento externo." },
                { id: 2, nome: "Daniele", cargo: "Operacional", avaliacao: 3, justificativa: "Imprevisto no setor." }
            ]
        },
        {
            id: 3,
            nome: "Evento XPTO",
            funcionarios: [
                { id: 1, nome: "José Ricardo", cargo: "Comercial", avaliacao: 3, justificativa: "Agenda lotada no dia do evento." },
                { id: 2, nome: "Daniele", cargo: "Operacional", avaliacao: 2, justificativa: "Problemas pessoais." }
            ]
        },
        {
            id: 4,
            nome: "Evento XPTO",
            funcionarios: [
                { id: 1, nome: "José Ricardo", cargo: "Comercial", avaliacao: 4, justificativa: "Estava viajando." },
                { id: 2, nome: "Daniele", cargo: "Operacional", avaliacao: 3, justificativa: "Atividade urgente no setor." }
            ]
        }
    ]);

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Recusas de eventos</h1>

            <div className={styles.containerCards}>
                {eventos.map(evento => (
                    <div key={evento.id} className={styles.cards}>
                        <h3 className={styles.tituloEvento}>{evento.nome}</h3>

                        {evento.funcionarios.map(func => (
                            <div key={func.id} className={styles.funcionarioWrapper}>

                                <div className={styles.funcionario}>
                                    <p>{func.nome}</p>
                                </div>

                                <div className={styles.funcionarioCargo}>
                                    <img 
                                        src={cargoImagens[func.cargo]} 
                                        alt={func.cargo}
                                        className={styles.iconCargo}
                                    />
                                    <p>{func.cargo}</p>
                                </div>
                                <button 
                                    className={styles.btnJustificativa}
                                    onClick={() => abrirModal(func.justificativa)}
                                >
                                    <img src='/images/lerIcon.png' alt='ler icon' className={styles.iconLer}></img>
                                    Ler
                                </button>

                            </div>
                        ))}

                    </div>
                ))}
            </div>

            {modalOpen && (
                <div className={styles.modalOverlay} onClick={fecharModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>Justificativa da Recusa</h2>
                        <p className={styles.justificativaTexto}>{justificativaSelecionada}</p>

                        <button className={styles.btnFechar} onClick={fecharModal}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;