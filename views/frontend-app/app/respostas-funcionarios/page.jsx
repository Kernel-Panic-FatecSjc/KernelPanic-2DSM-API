"use client";

import React, { useState, useEffect } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./App.module.css";
import { useRouter } from "next/navigation";
import axios from 'axios';
import ProtectRoute from '../../components/ProtectRoute';

export default function Page() {
    const router = useRouter();
    const [selected, setSelected] = useState();
    const [month, setMes] = useState(new Date());
    const [diaSelecionado, setDiaSelecionado] = useState(null);

    const [respostas, setRespostas] = useState({ aceitos: [], recusados: [] });
    const [carregando, setCarregando] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [justificativaSelecionada, setJustificativaSelecionada] = useState("");
    const [filtroNome, setFiltroNome] = useState("");
    
    const apiUrl = 'http://52.72.66.96:5000/';
    const api = axios.create({
        baseURL: `${apiUrl}/eventoResp`,
    });

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

    const carregarRespostas = async () => {
        try {
            setCarregando(true);
            const response = await api.get('/respostas/funcionarios');
            setRespostas(response.data);
        } catch (error) {
            console.error('Erro ao carregar respostas:', error);
            const respostasMock = {
                aceitos: [
                    { 
                        id: 1, 
                        titulo: "Treinamento de Vendas Consultivas", 
                        funcionario: "Ana Oliveira",
                        cargo: "Vendedor",
                        data: "25/11/2024",
                        hora: "09:00h", 
                        local: "Sala de Treinamento" 
                    },
                    { 
                        id: 3, 
                        titulo: "Workshop de Liderança", 
                        funcionario: "Carlos Silva",
                        cargo: "Gerente de Vendas",
                        data: "28/11/2024",
                        hora: "14:00h", 
                        local: "Auditório Principal" 
                    }
                ],
                recusados: [
                    { 
                        id: 2, 
                        titulo: "Treinamento de Vendas Consultivas", 
                        funcionario: "João Souza",
                        cargo: "Consultor",
                        data: "25/11/2024", 
                        hora: "09:00h", 
                        local: "Sala de Treinamento",
                        justificativa: "Conflito de agenda com reunião externa"
                    },
                    { 
                        id: 4, 
                        titulo: "Workshop de Liderança", 
                        funcionario: "Maria Santos",
                        cargo: "Operacional",
                        data: "28/11/2024", 
                        hora: "14:00h", 
                        local: "Auditório Principal",
                        justificativa: "Compromisso familiar inadiável"
                    }
                ]
            };
            setRespostas(respostasMock);
        } finally {
            setCarregando(false);
        }
    };

    // Função para converter string de data para objeto Date
    const parseDataString = (dataString) => {
        try {
            const [dia, mes, ano] = dataString.split('/');
            return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
        } catch (error) {
            console.error('Erro ao parsear data:', dataString, error);
            return new Date();
        }
    };

    // Função para formatar data no padrão DD/MM/AAAA
    const formatarData = (data) => {
        if (!data) return '';
        const date = new Date(data);
        const dia = String(date.getDate()).padStart(2, "0");
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    // Função para comparar duas datas (ignorando horas)
    const datasIguais = (data1, data2) => {
        if (!data1 || !data2) return false;
        
        const d1 = new Date(data1);
        const d2 = new Date(data2);
        
        return d1.getDate() === d2.getDate() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getFullYear() === d2.getFullYear();
    };

    useEffect(() => {
        carregarRespostas();
    }, []);

    // Preparar datas marcadas para o calendário
    const todasRespostas = [...respostas.aceitos, ...respostas.recusados];
    const datasMarcadas = todasRespostas.map(resposta => {
        return parseDataString(resposta.data);
    }).filter(date => !isNaN(date.getTime())); // Remove datas inválidas

    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    function handlePrevious() {
        const newMonth = new Date(month);
        newMonth.setMonth(month.getMonth() - 1);
        setMes(newMonth);
    }

    function handleNext() {
        const newMonth = new Date(month);
        newMonth.setMonth(month.getMonth() + 1);
        setMes(newMonth);
    }

    function abrirModal(justificativa) {
        setJustificativaSelecionada(justificativa);
        setModalOpen(true);
    }

    function fecharModal() {
        setModalOpen(false);
        setJustificativaSelecionada("");
    }

    // Função para lidar com a seleção de data
    const handleDaySelect = (day) => {
        setSelected(day);
        setDiaSelecionado(day);
    };

    // Filtrar eventos - CORREÇÃO AQUI
    const eventosDoDia = todasRespostas.filter(evento => {
        // Se não há dia selecionado, mostra todos
        if (!diaSelecionado) {
            return evento.funcionario.toLowerCase().includes(filtroNome.toLowerCase());
        }
        
        // Se há dia selecionado, filtra pela data
        const eventoDate = parseDataString(evento.data);
        const isMesmoDia = datasIguais(eventoDate, diaSelecionado);
        const passaFiltroNome = evento.funcionario.toLowerCase().includes(filtroNome.toLowerCase());
        
        return isMesmoDia && passaFiltroNome;
    });

    // Separar aceitos e recusados após o filtro
    const aceitosFiltrados = eventosDoDia.filter(evento => 
        respostas.aceitos.some(aceito => aceito.id === evento.id)
    );
    
    const recusadosFiltrados = eventosDoDia.filter(evento => 
        respostas.recusados.some(recusado => recusado.id === evento.id)
    );

    const modalJustificativa = modalOpen && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <h2>Justificativa da Recusa</h2>
                <p>{justificativaSelecionada}</p>
                <button className={styles.botaoPrincipal} onClick={fecharModal}>
                    Fechar
                </button>
            </div>
        </div>
    );
    
    return (
        <ProtectRoute perfisPermitidos={["Relatorios"]}>

        <div className={styles.conteudo}>
            {modalJustificativa}

            <h1 className={styles.titulo}>Respostas dos Funcionários</h1>
            <div className={styles.conteudoPagina}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3>Calendário</h3>
                    </div>

                    <div className={styles.calendarContainer}>
                        <div className={styles.navCustom}>
                            <button className={styles.calendarButton} onClick={handlePrevious}>
                                <img src="/images/setinha-esquerda.svg" alt="previous" />
                            </button>

                            <button className={styles.calendarButton} onClick={handleNext}>
                                <img src="/images/setinha.svg" alt="next" />
                            </button>

                            <h2 className={styles.calendarTitle}>
                                {month.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                            </h2>
                        </div>

                        <DayPicker
                            mode="single"
                            selected={selected}
                            onSelect={handleDaySelect}
                            month={month}
                            onMonthChange={setMes}
                            modifiers={{ 
                                hoje: new Date(), 
                                eventos: datasMarcadas
                            }}
                            modifiersClassNames={{ 
                                hoje: styles.hoje, 
                                eventos: styles.evento 
                            }}
                            formatters={{ 
                                formatWeekdayName: weekday => weekdays[weekday.getDay()] 
                            }}
                            components={{ 
                                Caption: () => null, 
                                CaptionLabel: () => null, 
                                Nav: () => null 
                            }}
                        />
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3>Status das Respostas</h3>
                    </div>

                    <div className={styles.listaEventos}>
                        
                        {/* Seção de Aceitos */}
                        <details className={styles.box} open>
                            <summary className={styles.itemResumo}>
                                <div className={styles.left}>
                                    <img src="/images/sim.png" alt="sim" />
                                    Aceitos ({aceitosFiltrados.length})
                                </div>
                                <span className={styles.arrow}></span>
                            </summary>

                            <div className={styles.listaEventosAbertos}>
                                {carregando ? (
                                    <p>Carregando respostas...</p>
                                ) : aceitosFiltrados.length === 0 ? (
                                    <p>{diaSelecionado ? 'Nenhuma confirmação encontrada para esta data.' : 'Nenhuma confirmação encontrada.'}</p>
                                ) : (
                                    aceitosFiltrados.map(evento => {
                                        const cargo = normalizarCargo(evento.cargo);
                                        
                                        return (
                                            <div key={evento.id} className={styles.eventCard}>
                                                <h4>{evento.titulo}</h4>
                                                
                                                <p><strong>Funcionário:</strong> {evento.funcionario}</p>
                                                
                                                <div className={styles.cargoContainer}>
                                                    <img 
                                                        src={cargoImagens[cargo]} 
                                                        alt={cargo} 
                                                        className={styles.cargoIcon} 
                                                    />
                                                    <span className={styles.cargoText}>{cargo}</span>
                                                </div>

                                                <div className={styles.eventInfo}>
                                                    <span>{evento.data}</span>
                                                    <span>{evento.hora}</span>
                                                    <span>{evento.local}</span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </details>

                        {/* Seção de Recusados */}
                        <details className={styles.box} open>
                            <summary className={styles.itemResumo}>
                                <div className={styles.left}>
                                    <img src="/images/desmarcado.png" alt="desmarcado" />
                                    Recusados ({recusadosFiltrados.length})
                                </div>
                                <span className={styles.arrow}></span>
                            </summary>

                            <div className={styles.listaEventosAbertos}>
                                {carregando ? (
                                    <p>Carregando respostas...</p>
                                ) : recusadosFiltrados.length === 0 ? (
                                    <p>{diaSelecionado ? 'Nenhuma recusa encontrada para esta data.' : 'Nenhuma recusa encontrada.'}</p>
                                ) : (
                                    recusadosFiltrados.map(evento => {
                                        const cargo = normalizarCargo(evento.cargo);
                                        
                                        return (
                                            <div key={evento.id} className={styles.eventCard}>
                                                <h4>{evento.titulo}</h4>
                                                
                                                <p><strong>Funcionário:</strong> {evento.funcionario}</p>

                                                <div className={styles.cargoContainer}>
                                                    <img 
                                                        src={cargoImagens[cargo]} 
                                                        alt={cargo} 
                                                        className={styles.cargoIcon} 
                                                    />
                                                    <span className={styles.cargoText}>{cargo}</span>
                                                </div>

                                                <div className={styles.eventInfo}>
                                                    <span>{evento.data}</span>
                                                    <span>{evento.hora}</span>
                                                    <span>{evento.local}</span>
                                                </div>

                                                {evento.justificativa && (
                                                    <div className={styles.buttons}>
                                                        <button 
                                                            className={styles.reject}
                                                            onClick={() => abrirModal(evento.justificativa)}
                                                        >
                                                            <img src='/images/lerIcon.png' alt='ler icon' style={{width: '16px', height: '16px'}} />
                                                            Ler Justificativa
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </details>

                    </div>
                </div>
            </div>
        </div>
        </ProtectRoute>
    );
}