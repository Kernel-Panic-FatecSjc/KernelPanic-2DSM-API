'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './App.module.css';


function page() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Checklist e Cadastro</h1>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <h2>Abertura da Empresa</h2>
            <a href="#">Preencher</a>
          </div>
          <div className={styles.card}>
            <h2>Fechamento da Empresa</h2>
            <a href="#">Preencher</a>
          </div>
          <div className={styles.card}>
            <h2>Manutenção Predial</h2>
            <a href="#">Preencher</a>
          </div>
          <div className={styles.card}>
            <h2>Checklist Diário</h2>
            <a href="#">Preencher</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page