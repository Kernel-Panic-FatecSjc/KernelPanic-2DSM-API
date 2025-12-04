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

    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
    const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);

    const [eventos, setEventos] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const [editarTitulo, setEditarTitulo] = useState("");
    const [editarData, setEditarData] = useState("");
    const [editarHora, setEditarHora] = useState("");

    const [novoTitulo, setNovoTitulo] = useState("");
    const [novaData, setNovaData] = useState("");
    const [novaHora, setNovaHora] = useState("");
    const [novoLocal, setNovoLocal] = useState("");
    const [novaDescricao, setNovaDescricao] = useState("");
    const [novoLink, setNovoLink] = useState("");
    const [cargosSelecionados, setCargosSelecionados] = useState([]); 
    const [filtroNome, setFiltroNome] = useState("");
    const [filtroData, setFiltroData] = useState("");
    
    const apiUrl = 'http://52.72.66.96:5000/';
    const api = axios.create({
        baseURL: `${apiUrl}/eventoGestor`,
    });

    const carregarEventos = async () => {
        try {
            setCarregando(true);
            const response = await api.get('/eventos');
            
            const eventosFormatados = response.data.map(evento => ({
                id: evento.evento_ID,
                titulo: evento.titulo,
                data: formatarDataParaFrontend(evento.dataHora),
                hora: formatarHoraParaFrontend(evento.dataHora),
                descricao: evento.descricao || "",
                link: evento.evento_link || ""
            }));
            
            setEventos(eventosFormatados);
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
            const eventosMock = [
                { id: 1, titulo: "Evento xxxxx", data: "28/10/2025", hora: "14:00h", local: "Fatec", descricao: "Descrição x", link: "" },
                { id: 2, titulo: "Evento yyyyy", data: "30/11/2025", hora: "16:30h", local: "Auditório", descricao: "Descrição y", link: "" }
            ];
            setEventos(eventosMock);
        } finally {
            setCarregando(false);
        }
    };

    const buscarFuncionariosPorCargo = async (cargo) => {
        try {
            const response = await api.get(`/funcionarios?cargo=${cargo}`);
            return response.data.map(func => func.funcionario_ID);
        } catch (error) {
            console.error(`Erro ao buscar funcionários do cargo ${cargo}:`, error);
            return [];
        }
    };

    const buscarFuncionariosDosCargos = async (cargos) => {
        try {
            const todosFuncionarios = [];
            
            for (const cargo of cargos) {
                const funcionariosDoCargo = await buscarFuncionariosPorCargo(cargo);
                todosFuncionarios.push(...funcionariosDoCargo);
            }
            
            return [...new Set(todosFuncionarios)];
        } catch (error) {
            console.error('Erro ao buscar funcionários dos cargos:', error);
            return [];
        }
    };

    const adicionarEventoAPI = async () => {
        if (!novoTitulo.trim() || !novaData.trim() || !novaHora.trim() || !novaDescricao.trim() || cargosSelecionados.length === 0) {
            alert("Por favor, preencha os campos obrigatórios: Título, Data, Hora, Local, Descrição e selecione pelo menos um cargo");
            return;
        }

        try {
            const dataHoraAPI = converterDataHoraParaAPI(novaData, novaHora);

            // DEBUG: Mostrar o que está sendo enviado
            console.log('Data original:', novaData);
            console.log('Hora original:', novaHora);
            console.log('Data/Hora para API:', dataHoraAPI);

            const funcionariosConvidados = await buscarFuncionariosDosCargos(cargosSelecionados);

            const novoEventoData = {
                titulo: novoTitulo,
                descricao: novaDescricao,
                dataHora: dataHoraAPI,
                duracao_horas: 1,
                evento_link: novoLink,
                organizador_ID: 1,
                funcionariosConvidados: funcionariosConvidados
            };

            await api.post('/eventos', novoEventoData);
            await carregarEventos();
            setModalAdicionarAberto(false);

            setNovoTitulo("");
            setNovaData("");
            setNovaHora("");
            setNovaDescricao("");
            setNovoLink("");
            setCargosSelecionados([]);

            alert('Evento adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar evento:', error);
            alert('Erro ao adicionar evento: ' + (error.response?.data?.error || error.message));
        }
    };

    const editarEventoAPI = async () => {
        try {
            const dataHoraAPI = converterDataHoraParaAPI(editarData, editarHora);

            const dadosAtualizacao = {
                titulo: editarTitulo,
                descricao: eventoSelecionado.descricao,
                dataHora: dataHoraAPI,
            };

            await api.put(`/eventos/${eventoSelecionado.id}`, dadosAtualizacao);
            await carregarEventos();
            setModalEditarAberto(false);

            alert('Evento atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao editar evento:', error);
            alert('Erro ao editar evento: ' + (error.response?.data?.error || error.message));
        }
    };

    const excluirEventoAPI = async () => {
        try {
            await api.delete(`/eventos/${eventoSelecionado.id}`);
            await carregarEventos();
            setModalExcluirAberto(false);

            alert('Evento excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
            alert('Erro ao excluir evento: ' + (error.response?.data?.error || error.message));
        }
    };

    const toggleCargo = (cargo) => {
        setCargosSelecionados(prev => {
            if (prev.includes(cargo)) {
                return prev.filter(c => c !== cargo);
            } else {
                return [...prev, cargo];
            }
        });
    };

    const isCargoSelecionado = (cargo) => {
        return cargosSelecionados.includes(cargo);
    };

    function formatarDataParaFrontend(dataHora) {
        const date = new Date(dataHora);
        const dia = String(date.getDate()+3).padStart(2, "0");
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    function formatarHoraParaFrontend(dataHora) {
        const date = new Date(dataHora);
        const horas = String(date.getHours()+3).padStart(2, "0");
        const minutos = String(date.getMinutes()).padStart(2, "0");
        return `${horas}:${minutos}h`;
    }

    // FUNÇÃO CORRIGIDA - Versão robusta
    function converterDataHoraParaAPI(dataFrontend, horaFrontend) {
        try {
            // dataFrontend: "25/11/2025"
            // horaFrontend: "14:00h"
            
            const [dia, mes, ano] = dataFrontend.split('/');
            const horaLimpa = horaFrontend.replace('h', '').trim(); // "14:00"
            
            // Validar se temos todos os componentes
            if (!dia || !mes || !ano || !horaLimpa) {
                throw new Error('Data ou hora incompleta');
            }
            
            // Formatar manualmente para evitar problemas com Date object
            // Formato: "2025-11-25T14:00:00.000Z"
            const dataHoraFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}T${horaLimpa}:00.000Z`;
            
            // Verificar se a data é válida criando um objeto Date
            const dataTeste = new Date(dataHoraFormatada);
            if (isNaN(dataTeste.getTime())) {
                throw new Error('Data ou hora inválida');
            }
            
            console.log('Data convertida com sucesso:', dataHoraFormatada);
            return dataHoraFormatada;
            
        } catch (error) {
            console.error('Erro na conversão de data/hora:', error);
            alert(`Erro no formato da data/hora: ${error.message}\n\nUse o formato:\n- Data: DD/MM/AAAA (ex: 25/11/2025)\n- Hora: HH:MM (ex: 14:00)`);
            throw error;
        }
    }

    function formatarData(d) {
        const dia = String(d.getDate()).padStart(2, "0");
        const mes = String(d.getMonth() + 1).padStart(2, "0");
        const ano = d.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    useEffect(() => {
        carregarEventos();
    }, []);

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
        setModalEditarAberto(true);
    }

    function abrirModalExcluir(evento) {
        setEventoSelecionado(evento);
        setModalExcluirAberto(true);
    }
    
    const eventosDoDia = eventos.filter(e =>
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
                        <button 
                            className={`${styles.adicionarButtons} ${isCargoSelecionado('Comercial') ? styles.cargoSelecionado : ''}`}
                            onClick={() => toggleCargo('Comercial')}
                            type="button"
                        >
                            <p className={styles.iconTitulo}>Comercial</p>
                            <img src='/images/comercialIcon.svg' alt='icon comercial' className={styles.adicionarIcons} />
                        </button>

                        <button 
                            className={`${styles.adicionarButtons} ${isCargoSelecionado('Operacional') ? styles.cargoSelecionado : ''}`}
                            onClick={() => toggleCargo('Operacional')}
                            type="button"
                        >
                            <p className={styles.iconTitulo}>Operacional</p>
                            <img src='/images/operacionalIcon.svg' alt='icon operacional' className={styles.adicionarIcons} />
                        </button>

                        <button 
                            className={`${styles.adicionarButtons} ${isCargoSelecionado('Administrativo') ? styles.cargoSelecionado : ''}`}
                            onClick={() => toggleCargo('Administrativo')}
                            type="button"
                        >
                            <p className={styles.iconTitulo}>Administrativo</p>
                            <img src='/images/iconAdm.svg' alt='icon adiminstrativo' className={styles.adicionarIcons} />
                        </button>
                    </div>

                    {cargosSelecionados.length > 0 && (
                        <div className={styles.cargosSelecionadosInfo}>
                            <p>Cargos selecionados: <strong>{cargosSelecionados.join(', ')}</strong></p>
                            <p className={styles.cargosContador}>({cargosSelecionados.length} cargo(s) selecionado(s))</p>
                        </div>
                    )}

                    <div className={styles.modalButtons}>
                        <button className={styles.botaoPrincipal} onClick={adicionarEventoAPI}>Adicionar</button>
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
                
                <div className={styles.modalButtons}>
                    <button className={styles.botaoPrincipal} onClick={editarEventoAPI}>Salvar</button>
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

                <button className={styles.botaoPrincipal} onClick={excluirEventoAPI}>Excluir</button>
                <button className={styles.cancelar} onClick={() => setModalExcluirAberto(false)}>Cancelar</button>
            </div>
        </div>
    );
    
    return (
        <ProtectRoute perfisPermitidos={["Eventos"]}>
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
                        {carregando ? (
                            <p>Carregando eventos...</p>
                        ) : eventosDoDia.length === 0 ? (
                            <p>Nenhum evento encontrado</p>
                        ) : (
                            eventosDoDia.map(evento => (
                                <div key={evento.id} className={styles.eventCard}>
                                    <h4>{evento.titulo}</h4>

                                    <div className={styles.eventInfo}>
                                        <span>{evento.data}</span>
                                        <span>{evento.hora}</span>
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
        </ProtectRoute>
    );
}