'use client';
import React, { useState } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from './App.module.css';

function Page() {
    const [month, setMes] = useState(new Date());
    const [diaSelecionado, setDiaSelecionado] = useState(null);

    const cargoImagens = {
        Comercial: "/images/iconComercial.svg",
        Operacional: "/images/iconOperacional.svg",
        Administrador: "/images/iconAdm.svg"
    };

    const [aceitos] = useState([
        { 
            id: 1, 
            titulo: "Evento xxxx", 
            funcionario: "João Silva",
            cargo: "Comercial",
            data: "28/10/2025",
            hora: "14:00h", 
            local: "Fatec" 
        },
        { 
            id: 2, 
            titulo: "Evento xxxx", 
            funcionario: "Maria Oliveira",
            cargo: "Operacional",
            data: "28/10/2025", 
            hora: "14:00h", 
            local: "Fatec" 
        }
    ]);

    const [recusados] = useState([
        { 
            id: 3, 
            titulo: "Evento yyyy", 
            funcionario: "Carlos Souza",
            cargo: "Administrador",
            data: "30/11/2025", 
            hora: "16:30h", 
            local: "Auditório",
        }
    ]);

    function formatarData(d) {
        if (!d) return null;
        const dia = String(d.getDate()).padStart(2, "0");
        const mes = String(d.getMonth() + 1).padStart(2, "0");
        const ano = d.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    function handlePrevious() {
        setMes(new Date(month.setMonth(month.getMonth() - 1)));
    }

    function handleNext() {
        setMes(new Date(month.setMonth(month.getMonth() + 1)));
    }

    const aceitosFiltrados = aceitos.filter(evento => {
        if (!diaSelecionado) return true;
        return evento.data === formatarData(diaSelecionado);
    });

    const recusadosFiltrados = recusados.filter(evento => {
        if (!diaSelecionado) return true;
        return evento.data === formatarData(diaSelecionado);
    });

    const datasMarcadas = [...aceitos, ...recusados].map(e => {
        const [dia, mes, ano] = e.data.split('/');
        return new Date(ano, mes - 1, dia);
    });

    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    return (
        <div className={styles.conteudo}>
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
                            selected={diaSelecionado}
                            onSelect={setDiaSelecionado}
                            month={month}
                            onMonthChange={setMes}
                            modifiers={{
                                hoje: new Date(),
                                eventos: datasMarcadas,
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
                        <h3>Status das Respostas</h3>
                    </div>

                    <div className={styles.listaEventos}>
                        
                        <details className={styles.box} open>
                            <summary className={styles.itemResumo}>
                                <div className={styles.left}>
                                    <img src="/images/sim.png" alt="sim" />
                                    Aceitos
                                </div>
                                <span className={styles.arrow}></span>
                            </summary>

                            <div className={styles.listaEventosAbertos}>
                                {aceitosFiltrados.length === 0 ? (
                                    <p>Nenhuma confirmação encontrada.</p>
                                ) : (
                                    aceitosFiltrados.map(evento => (
                                        <div key={evento.id} className={styles.eventCard}>
                                            <h4>{evento.titulo}</h4>
                                            
                                            <p><strong>Funcionário:</strong> {evento.funcionario}</p>
                                            
                                            <div className={styles.cargoContainer}>
                                                <img 
                                                    src={cargoImagens[evento.cargo]} 
                                                    alt={evento.cargo} 
                                                    className={styles.cargoIcon} 
                                                />
                                                <span className={styles.cargoText}>{evento.cargo}</span>
                                            </div>

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

                        <details className={styles.box} open>
                            <summary className={styles.itemResumo}>
                                <div className={styles.left}>
                                    <img src="/images/desmarcado.png" alt="desmarcado" />
                                    Recusados
                                </div>
                                <span className={styles.arrow}></span>
                            </summary>

                            <div className={styles.listaEventosAbertos}>
                                {recusadosFiltrados.length === 0 ? (
                                    <p>Nenhuma recusa encontrada.</p>
                                ) : (
                                    recusadosFiltrados.map(evento => (
                                        <div key={evento.id} className={styles.eventCard}>
                                            <h4>{evento.titulo}</h4>
                                            
                                            <p><strong>Funcionário:</strong> {evento.funcionario}</p>

                                            <div className={styles.cargoContainer}>
                                                <img 
                                                    src={cargoImagens[evento.cargo]} 
                                                    alt={evento.cargo} 
                                                    className={styles.cargoIcon} 
                                                />
                                                <span className={styles.cargoText}>{evento.cargo}</span>
                                            </div>

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