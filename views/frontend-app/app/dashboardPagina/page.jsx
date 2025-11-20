'use client';
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { useRouter } from 'next/navigation';
import ProtectRoute from '../../components/ProtectRoute';

function page() {
    const router = useRouter();

    const handleNavigate = (path) => {
        router.push(path);
    };

    return (
        <ProtectRoute>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.pageTitle}>Dashboards</h1>
                    <div className={styles.cardsContainer}>
                        <div className={styles.card} onClick={() => handleNavigate("/dashboard-comercial")}>
                            <div className={styles.iconcontainer}>
                                <img src='/images/comercial.svg' alt='Ícone Comercial'></img>
                            </div>
                            <h2>Comercial</h2>
                            <p>Apresenta gráficos sobre vendas, interações com clientes e novos cadastros. Permite filtrar por período para visualizar relatórios customizados sobre o desempenho comercial.</p>
                        </div>

                        <div className={styles.card} onClick={() => handleNavigate("/dashboard-operacional")}>
                            <div className={styles.iconcontainer}>
                                <img src='/images/caminhao.png' alt='Ícone Operacional'></img>
                            </div>
                            <h2>Operacional</h2>
                            <p>Acompanhe indicadores preenchidos pelos funcionários, mostra quem preencheu mais, qual foi a última atualização e a tendência de preenchimentos ao longo da semana.</p>
                        </div>

                        <div className={styles.card} onClick={() => handleNavigate("/dashboard-administrativo")}>
                            <div className={styles.iconcontainer}>
                                <img src='/images/adm.svg' alt='Ícone Administrativo'></img>
                            </div>
                            <h2>Administrativo</h2>
                            <p>Mostra comportamentos entre espaços e funcionários, lista de funcionários com departamentos, análise de veículos e tabelas com dados específicos.</p>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectRoute>
    );
}

export default page;