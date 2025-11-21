'use client';
import React, { useState } from 'react';
import styles from './App.module.css';
import { StarRating } from '../../components/layout/Estrelas/Estrelas';

function Page() {

    const cargoImagens = {
        Comercial: "/images/iconComercial.svg",
        Operacional: "/images/iconOperacional.svg",
        Administrador: "/images/iconAdm.svg"
    };
    
    const [modalOpen, setModalOpen] = useState(false);
    const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState("");

    const abrirModal = (avaliacao) => {
        setAvaliacaoSelecionada(avaliacao);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setAvaliacaoSelecionada("");
    };

    const [eventos, setEventos] = useState([
        {
            id: 1,
            nome: "Evento XPTO",
            funcionarios: [
                { 
                    id: 1, 
                    nome: "José Ricardo", 
                    cargo: "Administrador", 
                    avaliacao: 4,
                    avaliacaoEscrita: "O evento foi muito bem organizado, com palestras relevantes e boa estrutura. Aprendi bastante sobre as novas tendências do mercado."
                },
                { 
                    id: 2, 
                    nome: "Daniele", 
                    cargo: "Operacional", 
                    avaliacao: 3,
                    avaliacaoEscrita: "Evento interessante, mas poderia ter mais exemplos práticos. A localização era boa e o coffee break agradável."
                }
            ]
        },
        {
            id: 2,
            nome: "Evento XPTO",
            funcionarios: [
                { 
                    id: 1, 
                    nome: "José Ricardo", 
                    cargo: "Comercial", 
                    avaliacao: 2,
                    avaliacaoEscrita: "Esperava mais do evento. Os palestrantes não eram tão experientes e o conteúdo foi básico para o nível da equipe."
                },
                { 
                    id: 2, 
                    nome: "Daniele", 
                    cargo: "Operacional", 
                    avaliacao: 3,
                    avaliacaoEscrita: "Bom evento para networking, mas o conteúdo poderia ser mais aprofundado. A organização foi eficiente."
                }
            ]
        },
        {
            id: 3,
            nome: "Evento XPTO",
            funcionarios: [
                { 
                    id: 1, 
                    nome: "José Ricardo", 
                    cargo: "Comercial", 
                    avaliacao: 3,
                    avaliacaoEscrita: "Evento mediano. Alguns pontos foram interessantes, outros poderiam ser melhor desenvolvidos. Localização adequada."
                },
                { 
                    id: 2, 
                    nome: "Daniele", 
                    cargo: "Operacional", 
                    avaliacao: 2,
                    avaliacaoEscrita: "Não atendeu totalmente às expectativas. Faltou material de apoio e os exemplos não eram muito aplicáveis à nossa realidade."
                }
            ]
        },
        {
            id: 4,
            nome: "Evento XPTO",
            funcionarios: [
                { 
                    id: 1, 
                    nome: "José Ricardo", 
                    cargo: "Comercial", 
                    avaliacao: 4,
                    avaliacaoEscrita: "Excelente evento! Conteúdo atualizado, palestrantes qualificados e ótima oportunidade para trocar experiências com outros profissionais."
                },
                { 
                    id: 2, 
                    nome: "Daniele", 
                    cargo: "Operacional", 
                    avaliacao: 3,
                    avaliacaoEscrita: "Evento bom, com informações úteis. Gostei especialmente da parte prática e das discussões em grupo."
                }
            ]
        }
    ]);

    const mediaEvento = (funcionarios) => {
        if (!funcionarios.length) return 0;
        const total = funcionarios.reduce((acc, f) => acc + f.avaliacao, 0);
        return total / funcionarios.length;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Avaliação dos eventos</h1>

            <div className={styles.containerCards}>
                {eventos.map(evento => (
                    <div key={evento.id} className={styles.cards}>

                        <h3 className={styles.tituloEvento}>{evento.nome}</h3>

                        <div className={styles.mediaEvento}>
                            <StarRating
                                value={mediaEvento(evento.funcionarios)}
                                readOnly
                            />
                        </div>

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
                                    className={styles.btnAvaliacao}
                                    onClick={() => abrirModal(func.avaliacaoEscrita)}
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
                        <h2>Avaliação do Funcionário</h2>
                        <p className={styles.avaliacaoTexto}>{avaliacaoSelecionada}</p>

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