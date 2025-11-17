'use client';
import React from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from './App.module.css';
import { useState } from "react";

function Page() {
    const [selected, setSelected] = useState();
    const [month, setMes] = useState(new Date());
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [modalConfirmarAberto, setModalConfirmarAberto] = useState(false);
    const [modalRecusarAberto, setModalRecusarAberto] = useState(false);
    const [modalAvaliarAberto, setModalAvaliarAberto] = useState(false);
    const [nota, setNota] = useState(0);

    function Data(ano, mes, dia) {
        return new Date(ano, mes - 1, dia);
    }

    const eventos = [
        { id: 1, date: new Data(2025, 11, 27), nome: "Evento X" },
        { id: 2, date: new Data(2025, 11, 30), nome: "Evento Y" }
    ];

    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const eventosPendentes = [
        {
            id: 1,
            titulo: "Evento xxxxx",
            data: "28/10/2025",
            hora: "14:00h",
            local: "Fatec"
        },
        {
            id: 2,
            titulo: "Evento yyyyy",
            data: "28/10/2025",
            hora: "14:00h",
            local: "Fatec"
        }
    ];

    function handlePrevious() {
    setMes(new Date(month.setMonth(month.getMonth() - 1)));
    }

    function handleNext() {
        setMes(new Date(month.setMonth(month.getMonth() + 1)));
    }

    function abrirModalConfirmar(evento) {
    setEventoSelecionado(evento);
    setModalConfirmarAberto(true);
    }

    function abrirModalRecusar(evento) {
        setEventoSelecionado(evento);
        setModalRecusarAberto(true);
    }

    function abrirModalAvaliar(evento) {
        setEventoSelecionado(evento);
        setModalAvaliarAberto(true);
    }

    const modalAvaliar = modalAvaliarAberto && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                
                <h2 className={styles.modalTitulo}>Formulário do Participação</h2>

                <input 
                    className={styles.input}
                    placeholder="Nome do Funcionário"
                    type="text"
                />

                <label className={styles.label}>Data</label>
                <input 
                    className={styles.input}
                    placeholder="DD/MM/AAAA"
                    type="text"
                />

                <label className={styles.label}>Duração do evento</label>
                <input 
                    className={styles.input}
                    placeholder="00:00h"
                    type="text"
                />

               <div className={styles.estrelas}>
                {[1, 2, 3, 4, 5].map((valor) => (
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
                <textarea 
                    className={styles.textarea}
                    placeholder="Breve descrição"
                />

                <button className={styles.botaoPrincipal}>Enviar</button>

                <button 
                    className={styles.cancelar}
                    onClick={() => setModalAvaliarAberto(false)}
                >
                    Cancelar
                </button>

            </div>
        </div>
    );


    const modalConfirmar = modalConfirmarAberto && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalBox}>
                    <h2>Confirmar participação</h2>
                    <p>Você confirma sua participação?</p>

                    <button className={styles.botaoPrincipal}>
                        Sim
                    </button>
                    <button className={styles.cancelar} onClick={() => setModalConfirmarAberto(false)}>
                        Cancelar
                    </button>
                </div>
        </div>
    );

    const modalRecusar = modalRecusarAberto && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <h2>Recusar Participação</h2>

                <label className={styles.label}>Justificativa:</label>
                <textarea className={styles.textarea}></textarea>

                <button className={styles.botaoPrincipal}>
                    Enviar
                </button>
                <button className={styles.cancelar} onClick={() => setModalRecusarAberto(false)}>
                    Cancelar
                </button>
            </div>
    </div>
    );

    return (
        <div className={styles.conteudo}>
            {modalConfirmar}
            {modalRecusar}
            {modalAvaliar}

            <h1 className={styles.titulo}>Gerenciamento de Eventos</h1>

            <div className={styles.conteudoPagina}>
                
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3>Calendário</h3>
                    </div>
                    <div className={styles.calendarContainer}>
                        <div className={styles.navCustom}>
                        <button className={styles.calendarButton} onClick={handlePrevious}>
                            <img
                            src="images/setinha-esquerda.svg"
                            alt="previous"
                            style={{ color: "white" }}
                            />
                        </button>

                        <button className={styles.calendarButton} onClick={handleNext}>
                            <img
                            src="images/setinha.svg"
                            alt="next"
                            style={{ color: "white" }}
                            />
                        </button>

                        <h2 className={styles.calendarTitle}>
                            {month.toLocaleDateString("pt-BR", {
                            month: "long",
                            year: "numeric",
                            })}
                        </h2>
                        </div>

                        <DayPicker
                            mode="multiple"
                            selected={selected}
                            onSelect={(days) => {
                                console.log("Dias clicados:", days);
                                setSelected(days ?? []);
                            }}
                            month={month}
                            onMonthChange={setMes}
                            modifiers={{
                                hoje: new Date(),
                                eventos: eventos.map((e) => e.date),
                            }}
                        
                            modifiersClassNames={{
                                hoje: styles.hoje,
                                eventos: styles.evento,
                            }}
                        
                            formatters={{
                                formatWeekdayName: (weekday) => weekdays[weekday.getDay()],
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
                        
                        <details className={styles.box}>
                            <summary className={styles.itemResumo}>
                                <div className={styles.left}>
                                    <img src="/images/ampulheta.png" alt="pendentes" />
                                    Pendentes
                                </div>

                                <span className={styles.arrow}></span>
                            </summary>
                            <div className={styles.listaEventosAbertos}>

                                {eventosPendentes.length === 0 ? (
                                    <p>Nenhum evento pendente</p>
                                ) : (
                                    eventosPendentes.map((evento) => (
                                        <div key={evento.id} className={styles.eventCard}>
                                            
                                            <h4>{evento.titulo}</h4>

                                            <div className={styles.eventInfo}>
                                                <span>{evento.data}</span>
                                                <span>{evento.hora}</span>
                                                <span>{evento.local}</span>
                                            </div>

                                            <div className={styles.buttons}>
                                                <button 
                                                    className={styles.confirm} 
                                                    onClick={() => abrirModalConfirmar(evento)}
                                                >
                                                    ✔ Confirmar
                                                </button>

                                                <button 
                                                    className={styles.reject} 
                                                    onClick={() => abrirModalRecusar(evento)}
                                                >
                                                    ✖ Recusar
                                                </button>

                                            </div>
                                        </div>
                                    ))
                                )}
                        </div>

                        </details>

                        <details className={styles.box}>
                            <summary className={styles.itemResumo}>
                                <div className={styles.left}>
                                    <img src="/images/sim.png" alt="sim" />
                                    Aceitos
                                </div>

                                <span className={styles.arrow}></span>
                            </summary>
                                <div className={styles.listaEventosAbertos}>

                                {eventosPendentes.length === 0 ? (
                                    <p>Nenhum evento pendente</p>
                                ) : (
                                    eventosPendentes.map((evento) => (
                                        <div key={evento.id} className={styles.eventCard}>
                                            
                                            <h4>{evento.titulo}</h4>

                                            <div className={styles.eventInfo}>
                                                <span>{evento.data}</span>
                                                <span>{evento.hora}</span>
                                                <span>{evento.local}</span>
                                            </div>
                                            <div className={styles.buttons}>
                                                <button 
                                                    className={styles.confirm} 
                                                    onClick={() => abrirModalConfirmar(evento)}
                                                >
                                                    ⇋ Trocar
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                        </div>
                        </details>

                        <details className={styles.box}>
                            <summary className={styles.itemResumo}>
                                <div className={styles.left}>
                                    <img src="/images/desmarcado.png" alt="desmarcado" />
                                    Recusados
                                </div>

                                <span className={styles.arrow}></span>
                            </summary>
                                <div className={styles.listaEventosAbertos}>

                                {eventosPendentes.length === 0 ? (
                                    <p>Nenhum evento pendente</p>
                                ) : (
                                    eventosPendentes.map((evento) => (
                                        <div key={evento.id} className={styles.eventCard}>
                                            
                                            <h4>{evento.titulo}</h4>

                                            <div className={styles.eventInfo}>
                                                <span>{evento.data}</span>
                                                <span>{evento.hora}</span>
                                                <span>{evento.local}</span>
                                            </div>
                                            <div className={styles.buttons}>
                                                <button 
                                                    className={styles.confirm} 
                                                    onClick={() => abrirModalConfirmar(evento)}
                                                >
                                                    ⇋ Trocar
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                        </div>
                        </details>

                        <details className={styles.box}>
                            <summary className={styles.itemResumo}>
                                <div className={styles.left}>
                                    <img src="/images/fim.png" alt="fim" />
                                    Finalizados
                                </div>

                                <span className={styles.arrow}></span>
                            </summary>
                            <div className={styles.listaEventosAbertos}>

                                {eventosPendentes.length === 0 ? (
                                    <p>Nenhum evento pendente</p>
                                ) : (
                                    eventosPendentes.map((evento) => (
                                        <div key={evento.id} className={styles.eventCard}>
                                            
                                            <h4>{evento.titulo}</h4>

                                            <div className={styles.eventInfo}>
                                                <span>{evento.data}</span>
                                                <span>{evento.hora}</span>
                                                <span>{evento.local}</span>
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
    );
}

export default Page;
