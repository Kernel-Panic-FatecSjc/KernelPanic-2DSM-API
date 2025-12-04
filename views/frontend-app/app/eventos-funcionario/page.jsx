'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from './App.module.css';
import axios from 'axios';
import ProtectRoute from '../../components/ProtectRoute';

function Page() {
    const [selected, setSelected] = useState([]);
    const [month, setMes] = useState(new Date());
    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    const [modalConfirmarAberto, setModalConfirmarAberto] = useState(false);
    const [modalRecusarAberto, setModalRecusarAberto] = useState(false);
    const [modalAvaliarAberto, setModalAvaliarAberto] = useState(false);

    const [nota, setNota] = useState(0);
    const [justificativa, setJustificativa] = useState("");

    const [eventoTroca, setEventoTroca] = useState(null);
    const [origemTroca, setOrigemTroca] = useState("");

    const funcionarioId = 2;

    const [pendentes, setPendentes] = useState([]);
    const [aceitos, setAceitos] = useState([]);
    const [recusados, setRecusados] = useState([]);
    const [finalizados, setFinalizados] = useState([]);
    const [carregando, setCarregando] = useState(false);

    function converterParaDate(dataString) {
        if (!dataString) return null;
        
        try {
            const [dia, mes, ano] = dataString.split('/').map(Number);
            return new Date(ano, mes - 1, dia);
        } catch (error) {
            console.error('Erro ao converter data:', dataString, error);
            return null;
        }
    }

    function dataEstaSelecionada(dataEvento) {
        if (!dataEvento || selected.length === 0) return true;
        
        return selected.some(selectedDate => {
            return selectedDate.getDate() === dataEvento.getDate() &&
                   selectedDate.getMonth() === dataEvento.getMonth() &&
                   selectedDate.getFullYear() === dataEvento.getFullYear();
        });
    }

    const eventosFiltrados = useMemo(() => {
        if (selected.length === 0) {
            return {
                pendentes,
                aceitos,
                recusados,
                finalizados
            };
        }

        const filtrarEventos = (eventos) => {
            return eventos.filter(evento => {
                const dataEvento = converterParaDate(evento.data);
                return dataEstaSelecionada(dataEvento);
            });
        };

        return {
            pendentes: filtrarEventos(pendentes),
            aceitos: filtrarEventos(aceitos),
            recusados: filtrarEventos(recusados),
            finalizados: filtrarEventos(finalizados)
        };
    }, [selected, pendentes, aceitos, recusados, finalizados]);

    const datasComEventos = useMemo(() => {
        const todasDatas = [
            ...pendentes,
            ...aceitos,
            ...recusados,
            ...finalizados
        ];
        
        const datasUnicas = todasDatas
            .map(evento => converterParaDate(evento.data))
            .filter(data => data !== null);
        
        return datasUnicas;
    }, [pendentes, aceitos, recusados, finalizados]);

    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const api = axios.create({
        baseURL: `${apiUrl}/eventoFunc`,
    });

    const carregarEventos = async () => {
        try {
            setCarregando(true);
            const response = await api.get(`/funcionario/${funcionarioId}`);
            
            setPendentes(response.data.pendentes || []);
            setAceitos(response.data.aceitos || []);
            setRecusados(response.data.recusados || []);
            setFinalizados(response.data.finalizados || []);
            
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
            const eventosMock = [
                { id: 1, titulo: "Evento xxxxx", data: "28/10/2025", hora: "14:00h", local: "Fatec" },
                { id: 2, titulo: "Evento yyyyy", data: "29/10/2025", hora: "15:00h", local: "Fatec" },
                { id: 3, titulo: "Evento zzzzz", data: "30/10/2025", hora: "16:00h", local: "Fatec" }
            ];
            setPendentes(eventosMock);
            setAceitos([]);
            setRecusados([]);
            setFinalizados([]);
        } finally {
            setCarregando(false);
        }
    };

    const confirmarEventoAPI = async (funcionarioId, eventoId) => {
        try {
            await api.post('/confirmar', {
                funcionario_id: funcionarioId,
                evento_id: eventoId
            });
        } catch (error) {
            console.error('Erro ao confirmar evento:', error);
            throw error;
        }
    };

    const recusarEventoAPI = async (funcionarioId, eventoId, justificativa) => {
        try {
            await api.post('/recusar', {
                funcionario_id: funcionarioId,
                evento_id: eventoId,
                justificativa: justificativa
            });
        } catch (error) {
            console.error('Erro ao recusar evento:', error);
            throw error;
        }
    };

    const trocarStatusEventoAPI = async (funcionarioId, eventoId, justificativa = '') => {
        try {
            await api.post('/trocar-status', {
                funcionario_id: funcionarioId,
                evento_id: eventoId,
                justificativa: justificativa
            });
        } catch (error) {
            console.error('Erro ao trocar status:', error);
            throw error;
        }
    };

    const avaliarEventoAPI = async (funcionarioId, eventoId, linkFeedback) => {
        try {
            await api.post('/avaliar', {
                funcionario_id: funcionarioId,
                evento_id: eventoId,
                link_feedback: linkFeedback
            });
        } catch (error) {
            console.error('Erro ao avaliar evento:', error);
            throw error;
        }
    };

    useEffect(() => {
        carregarEventos();
    }, []);

    function handlePrevious() {
        const newMonth = new Date(month);
        newMonth.setMonth(newMonth.getMonth() - 1);
        setMes(newMonth);
    }

    function handleNext() {
        const newMonth = new Date(month);
        newMonth.setMonth(newMonth.getMonth() + 1);
        setMes(newMonth);
    }

    function handleDateSelect(dates) {
        setSelected(dates || []);
    }

    function abrirModalConfirmar(evento) {
        setEventoSelecionado(evento);
        setModalConfirmarAberto(true);
    }

    async function confirmarEvento() {
        if (!eventoSelecionado) return;

        try {
            await confirmarEventoAPI(funcionarioId, eventoSelecionado.id);
            await carregarEventos();
            setModalConfirmarAberto(false);
            setEventoSelecionado(null);
            alert('Evento confirmado com sucesso!');
        } catch (error) {
            alert('Erro ao confirmar evento: ' + (error.response?.data?.erro || error.message));
        }
    }

    function abrirModalRecusar(evento) {
        setEventoTroca(evento);
        setOrigemTroca("pendentes");
        setModalRecusarAberto(true);
    }

    async function confirmarTroca() {
        if (!eventoTroca) return;

        try {
            if (origemTroca === "pendentes") {
                await recusarEventoAPI(funcionarioId, eventoTroca.id, justificativa);
            } else if (origemTroca === "trocarStatus") {
                await trocarStatusEventoAPI(funcionarioId, eventoTroca.id, justificativa);
            } else {
                await trocarStatusEventoAPI(funcionarioId, eventoTroca.id, justificativa);
            }
            
            await carregarEventos();
            setJustificativa("");
            setEventoTroca(null);
            setOrigemTroca("");
            setModalRecusarAberto(false);
            alert('Ação realizada com sucesso!');
        } catch (error) {
            alert('Erro: ' + (error.response?.data?.erro || error.message));
        }
    }

    async function trocarStatusRapido(evento, statusAtual) {
        try {
            if (statusAtual === "aceito") {
                setEventoTroca(evento);
                setOrigemTroca("trocarStatus");
                setModalRecusarAberto(true);
                return;
            }
            
            if (statusAtual === "recusado") {
                await trocarStatusEventoAPI(funcionarioId, evento.id, "");
                await carregarEventos();
                alert('Status alterado para confirmado com sucesso!');
                return;
            }
            
        } catch (error) {
            alert('Erro ao trocar status: ' + (error.response?.data?.erro || error.message));
        }
    }

    function abrirModalAvaliar(evento) {
        setEventoSelecionado(evento);
        setModalAvaliarAberto(true);
    }

    async function enviarAvaliacao() {
        if (!eventoSelecionado) return;

        try {
            const linkFeedback = "https://forms.google.com/meu-feedback";
            await avaliarEventoAPI(funcionarioId, eventoSelecionado.id, linkFeedback);
            await carregarEventos();
            setModalAvaliarAberto(false);
            setEventoSelecionado(null);
            setNota(0);
            alert('Avaliação enviada com sucesso!');
        } catch (error) {
            alert('Erro ao enviar avaliação: ' + (error.response?.data?.erro || error.message));
        }
    }

    const modalAvaliar = modalAvaliarAberto && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <h2>Formulário de Participação</h2>

                <input className={styles.input} placeholder="Nome do Funcionário" type="text" />
                <label className={styles.label}>Data</label>
                <input className={styles.input} placeholder="DD/MM/AAAA" type="text" />

                <label className={styles.label}>Duração do evento</label>
                <input className={styles.input} placeholder="00:00h" type="text" />

                <div className={styles.estrelas}>
                    {[1, 2, 3, 4, 5].map(valor => (
                        <span
                            key={valor}
                            className={valor <= nota ? styles.estrelaAtiva : styles.estrela}
                            onClick={() => setNota(valor)}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <label className={styles.label}>Descrição do desenvolvimento adquirido</label>
                <textarea className={styles.textarea} placeholder="Breve descrição" />

                <button className={styles.botaoPrincipal} onClick={enviarAvaliacao}>Enviar</button>
                <button className={styles.cancelar} onClick={() => setModalAvaliarAberto(false)}>Cancelar</button>
            </div>
        </div>
    );

    const modalConfirmar = modalConfirmarAberto && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <h2>Confirmar participação</h2>
                <p>Você confirma sua participação?</p>

                <button className={styles.botaoPrincipal} onClick={confirmarEvento}>Sim</button>
                <button className={styles.cancelar} onClick={() => setModalConfirmarAberto(false)}>Cancelar</button>
            </div>
        </div>
    );

    const modalRecusar = modalRecusarAberto && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <h2>
                    {origemTroca === "trocarStatus" ? "Cancelar Participação" : "Justificativa"}
                </h2>

                <label className={styles.label}>
                    {origemTroca === "trocarStatus" 
                        ? "Explique o motivo do cancelamento:" 
                        : "Explique o motivo:"}
                </label>
                <textarea
                    className={styles.textarea}
                    value={justificativa}
                    onChange={e => setJustificativa(e.target.value)}
                    placeholder={
                        origemTroca === "trocarStatus" 
                            ? "Digite o motivo do cancelamento..." 
                            : "Digite sua justificativa..."
                    }
                />

                <button className={styles.botaoPrincipal} onClick={confirmarTroca}>
                    {origemTroca === "trocarStatus" ? "Confirmar Cancelamento" : "Enviar"}
                </button>
                <button className={styles.cancelar} onClick={() => setModalRecusarAberto(false)}>Cancelar</button>
            </div>
        </div>
    );

    return (
        <ProtectRoute perfisPermitidos={["Calendario"]}>
        <div className={styles.conteudo}>
            {modalConfirmar}
            {modalRecusar}
            {modalAvaliar}

            <h1 className={styles.titulo}>Gerenciamento de Eventos</h1>

            {carregando && <div style={{textAlign: 'center', padding: '10px'}}>Carregando eventos...</div>}

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
                            mode="multiple"
                            selected={selected}
                            onSelect={handleDateSelect}
                            month={month}
                            onMonthChange={setMes}
                            modifiers={{
                                hoje: new Date(),
                                eventos: datasComEventos,
                            }}
                            modifiersClassNames={{
                                hoje: styles.hoje,
                                eventos: styles.evento,
                            }}
                            formatters={{
                                formatWeekdayName: weekday => weekdays[weekday.getDay()],
                            }}
                            components={{
                                Caption: () => null,
                                CaptionLabel: () => null,
                                Nav: () => null,
                            }}
                        />
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3>Eventos</h3>
                    </div>

                    <div className={styles.listaEventos}>

                        <details className={styles.details}>
                            <summary className={styles.itemResumo}>
                                <div className={styles.left}>
                                    <img src="/images/ampulheta.png" alt="pendentes" />
                                    Pendentes ({eventosFiltrados.pendentes.length})
                                </div>
                                <span className={styles.arrow}></span>
                            </summary>

                            <div className={styles.listaEventosAbertos}>
                                {eventosFiltrados.pendentes.length === 0 ? (
                                    <p>Nenhum evento {selected.length > 0 ? 'nas datas selecionadas' : 'encontrado'}</p>
                                ) : (
                                    eventosFiltrados.pendentes.map(evento => (
                                        <div key={evento.id} className={styles.eventCard}>
                                            <h4>{evento.titulo}</h4>

                                            <div className={styles.eventInfo}>
                                                <span>{evento.data}</span>
                                                <span>{evento.hora}</span>
                                            </div>

                                            <div className={styles.buttons}>
                                                <button className={styles.confirm} onClick={() => abrirModalConfirmar(evento)}>
                                                    ✔ Confirmar
                                                </button>

                                                <button className={styles.reject} onClick={() => abrirModalRecusar(evento)}>
                                                    ✖ Recusar
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </details>

                        <details className={styles.details}>
                            <summary className={styles.itemResumo}>
                                <div className={styles.left}>
                                    <img src="/images/sim.png" alt="sim" />
                                    Aceitos ({eventosFiltrados.aceitos.length})
                                </div>
                                <span className={styles.arrow}></span>
                            </summary>

                            <div className={styles.listaEventosAbertos}>
                                {eventosFiltrados.aceitos.length === 0 ? (
                                    <p>Nenhum evento {selected.length > 0 ? 'nas datas selecionadas' : 'encontrado'}</p>
                                ) : (
                                    eventosFiltrados.aceitos.map(evento => (
                                        <div key={evento.id} className={styles.eventCard}>
                                            <h4>{evento.titulo}</h4>

                                            <div className={styles.eventInfo}>
                                                <span>{evento.data}</span>
                                                <span>{evento.hora}</span>
                                            </div>

                                            <div className={styles.buttons}>
                                                <button 
                                                    className={styles.confirm}
                                                    onClick={() => trocarStatusRapido(evento, "aceito")}
                                                >
                                                    ⇋ Trocar para Recusado
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </details>

                        <details className={styles.details}>
                            <summary className={styles.itemResumo}>
                                <div className={styles.left}>
                                    <img src="/images/desmarcado.png" alt="desmarcado" />
                                    Recusados ({eventosFiltrados.recusados.length})
                                </div>
                                <span className={styles.arrow}></span>
                            </summary>

                            <div className={styles.listaEventosAbertos}>
                                {eventosFiltrados.recusados.length === 0 ? (
                                    <p>Nenhum evento {selected.length > 0 ? 'nas datas selecionadas' : 'encontrado'}</p>
                                ) : (
                                    eventosFiltrados.recusados.map(evento => (
                                        <div key={evento.id} className={styles.eventCard}>
                                            <h4>{evento.titulo}</h4>

                                            <div className={styles.eventInfo}>
                                                <span>{evento.data}</span>
                                                <span>{evento.hora}</span>
                                            </div>

                                            <div className={styles.buttons}>
                                                <button 
                                                    className={styles.confirm}
                                                    onClick={() => trocarStatusRapido(evento, "recusado")}
                                                >
                                                    ⇋ Trocar para Confirmado
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </details>
                        
                        <details className={styles.details}>
                            <summary className={styles.itemResumo}>
                                <div className={styles.left}>
                                    <img src="/images/fim.png" alt="fim" />
                                    Finalizados ({eventosFiltrados.finalizados.length})
                                </div>
                                <span className={styles.arrow}></span>
                            </summary>

                            <div className={styles.listaEventosAbertos}>
                                {eventosFiltrados.finalizados.length === 0 ? (
                                    <p>Nenhum evento {selected.length > 0 ? 'nas datas selecionadas' : 'encontrado'}</p>
                                ) : (
                                    eventosFiltrados.finalizados.map(evento => (
                                        <div key={evento.id} className={styles.eventCard}>
                                            <h4>{evento.titulo}</h4>

                                            <div className={styles.eventInfo}>
                                                <span>{evento.data}</span>
                                                <span>{evento.hora}</span>
                                            </div>

                                            <div className={styles.buttons}>
                                                <button 
                                                    className={styles.confirm}
                                                    onClick={() => abrirModalAvaliar(evento)}
                                                >
                                                    ★ Avaliar
                                                </button>
                                            </div>
                                        </div>
                                    ))
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

export default Page;