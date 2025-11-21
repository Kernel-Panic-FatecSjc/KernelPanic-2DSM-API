'use client';
import React, { useState } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from './App.module.css';

function Page() {
    const [selected, setSelected] = useState();
    const [month, setMes] = useState(new Date());
    const [diaSelecionado, setDiaSelecionado] = useState(null);

    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
    const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);

    const [eventos, setEventos] = useState([
        { id: 1, titulo: "Evento xxxxx", data: "27/11/2025", hora: "14:00h", local: "Fatec" },
        { id: 2, titulo: "Evento yyyyy", data: "30/11/2025", hora: "16:30h", local: "Auditório" }
    ]);

    const [filtroNome, setFiltroNome] = useState("");
    const [filtroData, setFiltroData] = useState("");

    const [editarTitulo, setEditarTitulo] = useState("");
    const [editarData, setEditarData] = useState("");
    const [editarHora, setEditarHora] = useState("");
    const [editarLocal, setEditarLocal] = useState("");

    const [novoTitulo, setNovoTitulo] = useState("");
    const [novaData, setNovaData] = useState("");
    const [novaHora, setNovaHora] = useState("");
    const [novoLocal, setNovoLocal] = useState("");
    const [novaDescrição, setNovaDescrição] = useState("");
    const [novoLink, setNovoLink] = useState("");

    function adicionarEvento() {
        const novoEvento = {
            id: Date.now(),
            titulo: novoTitulo,
            data: novaData,
            hora: novaHora,
            local: novoLocal,
            descricao: novaDescrição,
            link: novoLink
        };

        setEventos(prev => [...prev, novoEvento]);
        setModalAdicionarAberto(false);

        setNovoTitulo("");
        setNovaData("");
        setNovaHora("");
        setNovoLocal("");
        setNovaDescrição("");
        setNovoLink("");
    }

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

    function formatarData(d) {
        const dia = String(d.getDate()).padStart(2, "0");
        const mes = String(d.getMonth() + 1).padStart(2, "0");
        const ano = d.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    const eventosDoDia = eventos
        .filter(e =>
            (!diaSelecionado || e.data === formatarData(diaSelecionado)) &&
            e.titulo.toLowerCase().includes(filtroNome.toLowerCase()) &&
            e.data.includes(filtroData)
        );

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
                            onSelect={day => {
                                setDiaSelecionado(day);
                                setSelected(day);
                            }}
                            month={month}
                            onMonthChange={setMes}
                            modifiers={{ hoje: new Date(), eventos: marcacoesCalendario.map(e => e.date) }}
                            modifiersClassNames={{ hoje: styles.hoje, eventos: styles.evento }}
                            formatters={{ formatWeekdayName: weekday => weekdays[weekday.getDay()] }}
                            components={{ Caption: () => null, CaptionLabel: () => null, Nav: () => null }}
                        />
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3>Eventos</h3>
                        <button className={styles.adicionarEventos} onClick={() => setModalAdicionarAberto(true)}>
                            <img src='/images/iconAdicionar.svg' className={styles.adicionarIcon} alt='icon adicionar'></img>
                            Adicionar
                        </button>
                    </div>
                    <div className={styles.filtrosContainer}>

                        <div className={styles.filtroInputWrapper}>
                            <img src="/images/lupa.svg" className={styles.icon} />
                            <input
                                type="text"
                                placeholder="Buscar por nome"
                                value={filtroNome}
                                onChange={(e) => setFiltroNome(e.target.value)}
                            />
                        </div>

                        <div className={styles.filtroInputWrapper}>
                            <img src="/images/lupa.svg" className={styles.icon} />
                            <input
                                type="text"
                                placeholder='Buscar por data'
                                className={styles.inputDate}
                                value={filtroData}
                                onChange={(e) => setFiltroData(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className={styles.listaEventosAbertos}>
                        {eventosDoDia.length === 0 ? (
                            <p>Nenhum evento encontrado</p>
                        ) : (
                            eventosDoDia.map(evento => (
                                <div key={evento.id} className={styles.eventCard}>
                                    <h4>{evento.titulo}</h4>
                                    <div className={styles.eventInfo}>
                                        <span>{evento.data}</span>
                                        <span>{evento.hora}</span>
                                        <span>{evento.local}</span>
                                    </div>

                                    <div className={styles.buttons}>
                                        <button className={styles.confirm} onClick={() => abrirModalEditar(evento)}>
                                            <img src='/images/iconEditar.svg' className={styles.editarIcon} alt='icon editar'></img> Editar
                                        </button>

                                        <button className={styles.reject} onClick={() => abrirModalExcluir(evento)}>
                                            <img src='/images/iconExcluir.svg' className={styles.excluirIcon} alt='icon excluir'></img> Deletar
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