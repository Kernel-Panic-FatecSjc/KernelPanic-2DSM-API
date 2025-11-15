'use client';
import React from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from './App.module.css';
import { useState } from "react";

function Page() {
    const [selected, setSelected] = useState();
    const [month, setMes] = useState(new Date());

    const eventos = [
        { id: 1, date: new Date(2025, 9, 27), nome: "Evento X" },
        { id: 2, date: new Date(2025, 9, 30), nome: "Evento Y" }
    ];

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

    return (
        <div className={styles.conteudo}>
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
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        month={month}
                        onMonthChange={setMes}
                        components={{
                            Caption: () => null,
                            CaptionLabel: () => null,
                            Nav: () => null,
                        }}
                        />
                    </div>
                    <div className={styles.eventosContainer}>
                        <h2 className={styles.eventosTitle}>Eventos</h2>
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
                                                <button className={styles.confirm}>✔ Confirmar</button>
                                                <button className={styles.reject}>✖ Recusar</button>
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
