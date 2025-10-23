'use client';

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './Calendar.module.css';
import axios from 'axios';



const CalendarComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const tags = ['Reunião', 'Lembrete', 'Ligação', 'Mensagem', 'Outro'];

  const [arrayLembretes, setArrayLembretes] = useState([])

  const getLembretes = async() =>{
    try{
      const response = await axios.get("http://localhost:5000/eventos")
      
      const eventosConvertidos = response.data.evento.map((item) => {
        const startDate = new Date(item.dataHora);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); 
      
        return {
          id: item.id,
          title: item.titulo,
          start: startDate.toISOString(),
          end: endDate.toISOString(),
          extendedProps: {
            email: item.email,
            categoria: item.categoria
          }
        };
      });
      
      setArrayLembretes((prevArray) => [...prevArray, ...eventosConvertidos]);

    }catch(err){

    }
  }

  const handleSalvar = async () => {
    try {
      const response = await axios.post('http://localhost:5000/eventos/lembrete', {
        email: 'usuario@exemplo.com',
        titulo,
        dataHora,
        categoria: selectedTag
      });

      console.log(response.data)
      console.log('Salvo com sucesso:');
      getLembretes()

      setTitulo('');
      setDataHora('');
      setDescricao('');
      setSelectedTag('');
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  useEffect(() => {
    getLembretes()
  },[])

  return (
    <div className={styles.container}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        slotMinTime='08:00:00'
        slotMaxTime='19:00:00'
        height={600}
        headerToolbar={{
          left: '',
          center: 'title',
          right: 'prev,next today timeGridWeek,timeGridDay'
        }}
        locale='pt-br'
        events={arrayLembretes}
        selectable={false}
        selectMirror={false}
        allDaySlot={false}
        slotDuration='01:00:00'
        slotLabelInterval='01:00:00'
        dayMaxEvents={true}
      />

      <button
        onClick={() => setShowModal(true)}
        className={styles.addButton}
      >
        +
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Novo Lembrete</h3>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Título</label>
              <input
                type="text"
                placeholder="Digite o título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Data e Hora</label>
              <input
                type="datetime-local"
                value={dataHora}
                onChange={(e) => setDataHora(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Descrição</label>
              <textarea
                placeholder="Digite a descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className={styles.textarea}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Categoria</label>
              <div className={styles.tagsContainer}>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`${styles.tagButton} ${selectedTag === tag ? styles.selected : ''}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <button
                onClick={() => setShowModal(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                className={styles.saveButton}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    
  );

  
};

export default CalendarComponent;