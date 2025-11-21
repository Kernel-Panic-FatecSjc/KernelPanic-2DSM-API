"use client";

import React, { useState } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./App.module.css";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [selected, setSelected] = useState();
    const [month, setMes] = useState(new Date());
    const [diaSelecionado, setDiaSelecionado] = useState(null);

    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
    const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);

    const [eventos, setEventos] = useState([
        { id: 1, titulo: "Evento xxxxx", data: "28/10/2025", hora: "14:00h", local: "Fatec", descricao: "Descrição x", link: "" },
        { id: 2, titulo: "Evento yyyyy", data: "30/11/2025", hora: "16:30h", local: "Auditório", descricao: "Descrição y", link: "" }
    ]);

    const [editarTitulo, setEditarTitulo] = useState("");
    const [editarData, setEditarData] = useState("");
    const [editarHora, setEditarHora] = useState("");
    const [editarLocal, setEditarLocal] = useState("");

    const [novoTitulo, setNovoTitulo] = useState("");
    const [novaData, setNovaData] = useState("");
    const [novaHora, setNovaHora] = useState("");
    const [novoLocal, setNovoLocal] = useState("");
    const [novaDescricao, setNovaDescricao] = useState("");
    const [novoLink, setNovoLink] = useState("");

    const [filtroNome, setFiltroNome] = useState("");
    const [filtroData, setFiltroData] = useState("");

    function adicionarEvento() {
        if (!novoTitulo.trim() || !novaData.trim() || !novaHora.trim() || !novoLocal.trim() || !novaDescricao.trim()) {
            alert("Por favor, preencha os campos obrigatórios: Título, Data, Hora, Local e Descrição");
            return;
        }

        const novoEvento = {
            id: Date.now(),
            titulo: novoTitulo,
            data: novaData,
            hora: novaHora,
            local: novoLocal,
            descricao: novaDescricao,
            link: novoLink
        };

        setEventos(prev => [...prev, novoEvento]);
        setModalAdicionarAberto(false);

        setNovoTitulo("");
        setNovaData("");
        setNovaHora("");
        setNovoLocal("");
        setNovaDescricao("");
        setNovoLink("");
    }

    function Data(ano, mes, dia) {
        return new Date(ano, mes - 1, dia);
    }
    
    function formatarData(d) {
        const dia = String(d.getDate()).padStart(2, "0");
        const mes = String(d.getMonth() + 1).padStart(2, "0");
        const ano = d.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    const marcacoesCalendario = eventos.map(e => {
        const [dia, mes, ano] = e.data.split('/');
        return { id: e.id, date: new Date(ano, mes - 1, dia), nome: e.titulo };
    });

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
    
    const eventosDoDia = eventos
        .filter(e =>
            (!diaSelecionado || e.data === formatarData(diaSelecionado)) &&
            e.titulo.toLowerCase().includes(filtroNome.toLowerCase()) &&
            e.data.includes(filtroData)
        );

    const modalAdicionar = modalAdicionarAberto && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <h2>Adicionar evento</h2>

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Nome do evento *"
                    value={novoTitulo}
                    onChange={e => setNovoTitulo(e.target.value)}
                    required
                />

                <input
                    className={styles.input}
                    type="text"
                    placeholder="DD/MM/AAAA *"
                    value={novaData}
                    onChange={e => setNovaData(e.target.value)}
                    required
                />

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Hora *"
                    value={novaHora}
                    onChange={e => setNovaHora(e.target.value)}
                    required
                />

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Localização do evento *"
                    value={novoLocal}
                    onChange={e => setNovoLocal(e.target.value)}
                    required
                />

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Breve descrição *"
                    value={novaDescricao}
                    onChange={e => setNovaDescricao(e.target.value)}
                />

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Link do meet (opcional)"
                    value={novoLink}
                    onChange={e => setNovoLink(e.target.value)}
                />
                <div className={styles.adicionarButtonsContainer}>
                    <div className={styles.categorias}>
                        <button className={styles.adicionarButtons}>
                            <p className={styles.iconTitulo}>Comercial</p>
                            <img src='/images/comercialIcon.svg' alt='icon comercial' className={styles.adicionarIcons}></img>
                        </button>

                        <button className={styles.adicionarButtons}>
                            <p className={styles.iconTitulo}>Operacional</p>
                            <img src='/images/operacionalIcon.svg' alt='icon operacional' className={styles.adicionarIcons}></img>
                        </button>

                        <button className={styles.adicionarButtons}>
                            <p className={styles.iconTitulo}>Administrativo</p>
                            <img src='/images/iconAdm.svg' alt='icon adiminstrativo' className={styles.adicionarIcons}></img>
                        </button>
                    </div>

                    <div className={styles.modalButtons}>
                        <button className={styles.botaoPrincipal} onClick={adicionarEvento}>Adicionar</button>
                        <button className={styles.cancelar} onClick={() => setModalAdicionarAberto(false)}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );

    const modalEditar = modalEditarAberto && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <h2>Editar evento</h2>

                <input className={styles.input} type="text" value={editarTitulo} onChange={e => setEditarTitulo(e.target.value)} placeholder="Título" />
                <input className={styles.input} type="text" value={editarData} onChange={e => setEditarData(e.target.value)} placeholder="Data" />
                <input className={styles.input} type="text" value={editarHora} onChange={e => setEditarHora(e.target.value)} placeholder="Hora" />
                <input className={styles.input} type="text" value={editarLocal} onChange={e => setEditarLocal(e.target.value)} placeholder="Local" />

                <div className={styles.modalButtons}>
                    <button className={styles.botaoPrincipal} onClick={salvarEdicao}>Salvar</button>
                    <button className={styles.cancelar} onClick={() => setModalEditarAberto(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    );

    const modalExcluir = modalExcluirAberto && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBoxExcluir}>
                <h2>Excluir evento</h2>
                <p>Tem certeza que deseja excluir permanentemente?</p>

                <button className={styles.botaoPrincipal} onClick={excluirEvento}>Excluir</button>
                <button className={styles.cancelar} onClick={() => setModalExcluirAberto(false)}>Cancelar</button>
            </div>
        </div>
    );
    
    return (
        <div className={styles.conteudo}>
            {modalAdicionar}
            {modalEditar}
            {modalExcluir}

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
                        <button 
                            className={styles.adicionarEventos}
                            onClick={() => setModalAdicionarAberto(true)}
                        >
                            <img src='/images/iconAdicionar.svg' className={styles.adicionarIcon} alt='icon adicionar'></img>
                            Adicionar
                        </button>
                    </div>
                    
                    <div className={styles.filtrosContainer}>

                        <div className={styles.filtroInputWrapper}>
                            <img src="/images/lupa.svg" className={styles.icon} alt="lupa" />
                            <input
                                type="text"
                                placeholder="Buscar por nome"
                                value={filtroNome}
                                onChange={(e) => setFiltroNome(e.target.value)}
                            />
                        </div>

                        <div className={styles.filtroInputWrapper}>
                            <img src="/images/lupa.svg" className={styles.icon} alt="lupa" />
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
                                            <img src='/images/iconEditar.svg' className={styles.editarIcon} alt='icon editar' />
                                            Editar
                                        </button>

                                        <button className={styles.reject} onClick={() => abrirModalExcluir(evento)}>
                                            <img src='/images/iconExcluir.svg' className={styles.excluirIcon} alt='icon excluir' />
                                            Deletar
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                        <button 
                        className={styles.buttonVerRespostas}
                        onClick={() => router.push('/respostas-funcionarios')}
                        >Ver Respostas Funcionários
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}