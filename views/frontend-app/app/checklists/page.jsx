'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './App.module.css';
import { useRouter } from 'next/navigation';  


function page() {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Checklist e Cadastro</h1>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <div className={styles.iconcontainer}>
              <img src='/images/companhia-1.svg' className='card-image' alt='Imagem card'></img>
            </div>
            <h2>Abertura da Empresa</h2>
            <button onClick={() => handleNavigate("/formulario-abertura")}>
              Preencher
            </button>
          </div>
          <div className={styles.card}>
            <div className={styles.iconcontainer}>
              <img src='/images/companhia-1.svg' className='card-image' alt='Imagem card'></img>
            </div>
            <h2>Fechamento da Empresa</h2>
            <button onClick={() => handleNavigate("/formulario-fechamento")}>
              Preencher
            </button>
          </div>
          <div className={styles.card}>
            <div className={styles.iconcontainer}>
              <img src='/images/construcao-2.svg' className='card-image' alt='Imagem card'></img>
            </div>
            <h2>Manutenção Predial</h2>
            <button onClick={() => handleNavigate("/formulario-manutencao")}>
              Preencher
            </button>
          </div>
          <div className={styles.card}>
            <div className={styles.iconcontainer}>
              <img src='/images/protecao-2.svg' className='card-image' alt='Imagem card'></img>
            </div>
            <h2>Checklist Diário</h2>
            <button onClick={() => handleNavigate("/formulario-diario")}>
              Preencher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page