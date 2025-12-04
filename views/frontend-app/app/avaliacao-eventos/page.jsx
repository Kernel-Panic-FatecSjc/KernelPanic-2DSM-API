'use client';
import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { StarRating } from '../../components/layout/Estrelas/Estrelas';
import axios from 'axios';
import ProtectRoute from '../../components/ProtectRoute';

const apiUrl = 'http://52.72.66.96:5000/';
function Page() {

    const cargoImagens = {
        Comercial: "/images/iconComercial.svg",
        Operacional: "/images/iconOperacional.svg",
        Administrador: "/images/iconAdm.svg"
    };
    
    const normalizarCargo = (cargo) => {
        const c = cargo.trim().toLowerCase();

        if (c.includes("vendedor") || c.includes("venda")) return "Comercial";
        if (c.includes("comer")) return "Comercial";
        if (c.includes("operac")) return "Operacional";
        if (c.includes("admin")) return "Administrador";

        return "Comercial"; 
    };
    
    const [modalOpen, setModalOpen] = useState(false);
    const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState("");
    const [eventos, setEventos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const api = axios.create({
        baseURL: `${apiUrl}/eventoAval`,
    });

    const carregarAvaliacoes = async () => {
        try {
            setCarregando(true);
            const response = await api.get('/avaliacoes/eventos');
            setEventos(response.data);
        } catch (error) {
            console.error('Erro ao carregar avaliações:', error);
            const eventosMock = [
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
                    nome: "Evento ABC",
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
                }
            ];
            setEventos(eventosMock);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarAvaliacoes();
    }, []);

    const abrirModal = (avaliacao) => {
        setAvaliacaoSelecionada(avaliacao);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setAvaliacaoSelecionada("");
    };

    const mediaEvento = (funcionarios) => {
        if (!funcionarios.length) return 0;
        const total = funcionarios.reduce((acc, f) => acc + f.avaliacao, 0);
        return total / funcionarios.length;
    };

    if (carregando) {
        return <div className={styles.container}>Carregando avaliações...</div>;
    }

    return (
        <ProtectRoute perfisPermitidos={["Avaliação dos Eventos"]}>
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

                        {evento.funcionarios.map(func => {
                            const cargo = normalizarCargo(func.cargo);

                            return (
                                <div key={func.id} className={styles.funcionarioWrapper}>
                                    
                                    <div className={styles.funcionario}>
                                        <p>{func.nome}</p>
                                    </div>

                                    <div className={styles.funcionarioCargo}>
                                        <img 
                                            src={cargoImagens[cargo]} 
                                            alt={cargo} 
                                            className={styles.iconCargo}
                                        />
                                        <p>{cargo}</p>
                                    </div>

                                    <button 
                                        className={styles.btnAvaliacao}
                                        onClick={() => abrirModal(func.avaliacaoEscrita)}
                                    >
                                        <img src='/images/lerIcon.png' alt='ler icon' className={styles.iconLer} />
                                        Ler
                                    </button>
                                </div>
                            );
                        })}
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
        </ProtectRoute>
    );
}

export default Page;