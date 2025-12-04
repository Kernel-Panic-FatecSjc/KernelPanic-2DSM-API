'use client';
import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import axios from 'axios';
import ProtectRoute from '../../components/ProtectRoute';

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
    const [justificativaSelecionada, setJustificativaSelecionada] = useState("");
    const [eventos, setEventos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const api = axios.create({
        baseURL: `${apiUrl}/eventoRecusa`,
    });

    const carregarRecusas = async () => {
        try {
            setCarregando(true);
            const response = await api.get('/recusas/eventos');
            setEventos(response.data);
        } catch (error) {
            console.error('Erro ao carregar recusas:', error);
            const eventosMock = [
                {
                    id: 1,
                    nome: "Evento XPTO",
                    funcionarios: [
                        { id: 1, nome: "José Ricardo", cargo: "Administrador", justificativa: "Não pôde comparecer por motivos pessoais." },
                        { id: 2, nome: "Daniele", cargo: "Operacional", justificativa: "Conflito de horário com outro compromisso." }
                    ]
                },
                {
                    id: 2,
                    nome: "Evento ABC",
                    funcionarios: [
                        { id: 1, nome: "José Ricardo", cargo: "Comercial", justificativa: "Estava em atendimento externo." },
                        { id: 2, nome: "Daniele", cargo: "Operacional", justificativa: "Imprevisto no setor." }
                    ]
                }
            ];
            setEventos(eventosMock);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarRecusas();
    }, []);

    const abrirModal = (justificativa) => {
        setJustificativaSelecionada(justificativa);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setJustificativaSelecionada("");
    };

    if (carregando) {
        return <div className={styles.container}>Carregando recusas...</div>;
    }

    return (
        <ProtectRoute perfisPermitidos={["Justificativas"]}>
        <div className={styles.container}>
            <h1 className={styles.titulo}>Recusas de eventos</h1>

            <div className={styles.containerCards}>
                {eventos.map(evento => (
                    <div key={evento.id} className={styles.cards}>
                        <h3 className={styles.tituloEvento}>{evento.nome}</h3>

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
                                        <span>{cargo}</span>
                                    </div>
                                    
                                    <button 
                                        className={styles.btnJustificativa}
                                        onClick={() => abrirModal(func.justificativa)}
                                    >
                                        <img src='/images/lerIcon.png' alt='ler icon' className={styles.iconLer}></img>
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
                        <h2>Justificativa da Recusa</h2>
                        <p className={styles.justificativaTexto}>{justificativaSelecionada}</p>

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