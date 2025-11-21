'use client';
import React, { useState } from 'react';
import styles from './App.module.css';
import { StarRating } from '../../components/layout/Estrelas/Estrelas';

function Page() {

    const cargoImagens = {
    Comercial: "/images/iconComercial.svg",
    Operacional: "/images/iconOperacional.svg",
    Administrador: "/images/iconAdm.svg"
    };
    
    const [eventos, setEventos] = useState([
        {
            id: 1,
            nome: "Evento XPTO",
            funcionarios: [
                { id: 1, nome: "José Ricardo", cargo: "Administrador", avaliacao: 4 },
                { id: 2, nome: "Daniele", cargo: "Operacional", avaliacao: 3 }
            ]
        },
        {
            id: 2,
            nome: "Evento XPTO",
            funcionarios: [
                { id: 1, nome: "José Ricardo", cargo: "Comercial", avaliacao: 2 },
                { id: 2, nome: "Daniele", cargo: "Operacional", avaliacao: 3}
            ]
        },
        {
            id: 3,
            nome: "Evento XPTO",
            funcionarios: [
                { id: 1, nome: "José Ricardo", cargo: "Comercial", avaliacao: 3 },
                { id: 2, nome: "Daniele", cargo: "Operacional", avaliacao: 2 }
            ]
        },
        {
            id: 4,
            nome: "Evento XPTO",
            funcionarios: [
                { id: 1, nome: "José Ricardo", cargo: "Comercial", avaliacao: 4 },
                { id: 2, nome: "Daniele", cargo: "Operacional", avaliacao: 3 }
            ]
        }
    ]);

    const mediaEvento = (funcionarios) => {
        if (!funcionarios.length) return 0;
        const total = funcionarios.reduce((acc, f) => acc + f.avaliacao, 0);
        return total / funcionarios.length;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Avaliação dos eventos</h1>

            <div className={styles.containerCards}>
                {eventos.map(evento => (
                    <div key={evento.id} className={styles.cards}>

                        <h3 className={styles.tituloEvento}>{evento.nome}</h3>

                        <div className={styles.mediaEvento}>
                            <StarRating
                                value={mediaEvento(evento.funcionarios)}
                                readOnly
                            />
                        </div>

                        {evento.funcionarios.map(func => (
                            <div key={func.id} className={styles.funcionarioWrapper}>
                                <div className={styles.funcionario}>
                                    <p>{func.nome}</p>
                                </div>
                                <div className={styles.funcionarioCargo}>
                                    <img 
                                    src={cargoImagens[func.cargo]} 
                                    alt={func.cargo} 
                                    className={styles.iconCargo}
                                    />
                                    <p>{func.cargo}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;