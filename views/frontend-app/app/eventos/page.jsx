'use client';
import React, { useState } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from './App.module.css';

function Page() {
    const [selected, setSelected] = useState();
    const [month, setMes] = useState(new Date());
    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    // Estados dos modais
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false);

    // Lista única de eventos
    const [eventos, setEventos] = useState([
        { id: 1, titulo: "Evento xxxxx", data: "28/10/2025", hora: "14:00h", local: "Fatec" },
        { id: 2, titulo: "Evento yyyyy", data: "30/11/2025", hora: "16:30h", local: "Auditório" }
    ]);

    // Estados de edição do evento
    const [editarTitulo, setEditarTitulo] = useState("");
    const [editarData, setEditarData] = useState("");
    const [editarHora, setEditarHora] = useState("");
    const [editarLocal, setEditarLocal] = useState("");

    function Data(ano, mes, dia) {
        return new Date(ano, mes - 1, dia);
    }

    const marcacoesCalendario = [
        { id: 1, date: new Data(2025, 11, 27), nome: "Evento X" },
        { id: 2, date: new Data(2025, 11, 30), nome: "Evento Y" }
    ];

    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    function handlePrevious() {
        setMes(new Date(month.setMonth(month.getMonth() - 1)));
    }

    function handleNext() {
        setMes(new Date(month.setMonth(month.getMonth() + 1)));
    }

    function abrirModalEditar(evento) {
        setEventoSelecionado(evento);
        setEditarTitulo(evento.titulo);
        setEditarData(evento.data);
        setEditarHora(evento.hora);
        setEditarLocal(evento.local);
        setModalEditarAberto(true);
    }

    function abrirModalExcluir(evento) {
        setEventoSelecionado(evento);
        setModalExcluirAberto(true);
    }

    function salvarEdicao() {
        setEventos(prev =>
            prev.map(e =>
                e.id === eventoSelecionado.id
                    ? { ...e, titulo: editarTitulo, data: editarData, hora: editarHora, local: editarLocal }
                    : e
            )
        );
        setModalEditarAberto(false);
    }

    function excluirEvento() {
        setEventos(prev => prev.filter(e => e.id !== eventoSelecionado.id));
        setModalExcluirAberto(false);
    }

    // Modal editar
    const modalEditar = modalEditarAberto && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <h2>Editar evento</h2>

                <input
                    className={styles.input}
                    type="text"
                    value={editarTitulo}
                    onChange={e => setEditarTitulo(e.target.value)}
                    placeholder="Título"
                />

                <input
                    className={styles.input}
                    type="text"
                    value={editarData}
                    onChange={e => setEditarData(e.target.value)}
                    placeholder="Data"
                />

                <input
                    className={styles.input}
                    type="text"
                    value={editarHora}
                    onChange={e => setEditarHora(e.target.value)}
                    placeholder="Hora"
                />

                <input
                    className={styles.input}
                    type="text"
                    value={editarLocal}
                    onChange={e => setEditarLocal(e.target.value)}
                    placeholder="Local"
                />

                <div className={styles.modalButtons}>
                    <button className={styles.botaoPrincipal} onClick={salvarEdicao}>Salvar</button>
                    <button className={styles.cancelar} onClick={() => setModalEditarAberto(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    );

    // Modal excluir
    const modalExcluir = modalExcluirAberto && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <h2>Excluir evento</h2>
                <p>Tem certeza que deseja excluir permanentemente?</p>

                <button className={styles.botaoPrincipal} onClick={excluirEvento}>Excluir</button>
                <button className={styles.cancelar} onClick={() => setModalExcluirAberto(false)}>Cancelar</button>
            </div>
        </div>
    );

    return (
        <div className={styles.conteudo}>
            {modalEditar}
            {modalExcluir}

            <h1 className={styles.titulo}>Gerenciamento de Eventos</h1>

            <div className={styles.conteudoPagina}>
                {/* CALENDÁRIO */}
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
                            onSelect={days => setSelected(days || [])}
                            month={month}
                            onMonthChange={setMes}
                            modifiers={{
                                hoje: new Date(),
                                eventos: marcacoesCalendario.map(e => e.date),
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
                        <button className={styles.adicionarEventos}>
                          <img src='/images/iconAdicionar.svg' className={styles.adicionarIcon} alt='icon adicionar'></img>
                          Adicionar
                        </button>
                    </div>

                    <div className={styles.listaEventosAbertos}>
                        {eventos.length === 0 ? (
                            <p>Nenhum evento cadastrado</p>
                        ) : (
                            eventos.map(evento => (
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
                                            onClick={() => abrirModalEditar(evento)}
                                        >
                                          <img src='/images/iconEditar.svg' className={styles.editarIcon} alt='icon editar'></img>
                                            Editar
                                        </button>

                                        <button
                                            className={styles.reject}
                                            onClick={() => abrirModalExcluir(evento)}
                                        >
                                          <img src='/images/iconExcluir.svg' className={styles.excluirIcon} alt='icon excluir'></img>
                                            Deletar
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;