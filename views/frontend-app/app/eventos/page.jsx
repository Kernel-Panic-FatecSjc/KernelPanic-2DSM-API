"use client";

import { DayPicker } from "react-day-picker";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import styles from "./App.module.css";

export default function Calendario() {
  function Data(ano, mes, dia) {
  return new Date(ano, mes - 1, dia);
  }

  const eventos = [
    { id: 1, date: new Data(2025, 11, 27), nome: "Evento X" },
    { id: 2, date: new Data(2025, 11, 30), nome: "Evento Y" }
  ];

  const [selected, setSelected] = useState([]); 

  const [month, setMes] = useState(new Date());
  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  console.log("Selecionados agora:", selected);

  function handlePrevious() {
    setMes(new Date(month.setMonth(month.getMonth() - 1)));
  }

  function handleNext() {
    setMes(new Date(month.setMonth(month.getMonth() + 1)));
  }

  return (
    <div className={styles.container}>
      <div className={styles.calendarContainer}>

        <div className={styles.navCustom}>
          <button className={styles.calendarButton} onClick={handlePrevious}>
            <img src="images/setinha-esquerda.svg" alt="previous" />
          </button>

          <button className={styles.calendarButton} onClick={handleNext}>
            <img src="images/setinha.svg" alt="next" />
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

      <div className={styles.eventosContainer}>
        <h2 className={styles.eventosTitle}>Eventos</h2>
      </div>
    </div>
  );
}
