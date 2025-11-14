"use client";

import { DayPicker } from "react-day-picker";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import styles from "./App.module.css";

export default function Calendario() {
  const [selected, setSelected] = useState();
  const [month, setMes] = useState(new Date());

  const eventos = [
  { id: 1, date: new Date(2025, 9, 27), nome: "Evento X" },
  { id: 2, date: new Date(2025, 9, 30), nome: "Evento Y" }
  ];


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
  );
}
