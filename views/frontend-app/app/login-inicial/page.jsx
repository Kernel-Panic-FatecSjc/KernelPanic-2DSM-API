"use client"

import React from 'react';
import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";
import styles from "./App.module.css";

export default function page(){
    const router = useRouter();

    return(
    <div className={styles.container}>
        <div className={styles.lateral}>
        <Login />
      </div>
            

     
      <div className={styles["painel-container"]}>
        <div className={styles["painel-conteudo"]}>
          <h1 className={styles["titulo-bemvindo"]}>Bem vindo!</h1>
          <p className={styles["texto-selecao"]}>
            Selecione como deseja logar:
          </p>

          <div className={styles["opcoes-login"]}>
            <div
              className={styles["card-login"]}
              onClick={() => router.push("/login-master")}
            >
              <div className={styles["icone-card"]}>
                <img src="/images/iconeglobo.svg" alt="Ícone Master" />
              </div>
              <p>Master</p>
            </div>

            <div
              className={styles["card-login"]}
              onClick={() => router.push("/login-gestor")}
            >
              <div className={styles["icone-card"]}>
                <img src="/images/gestor.svg" alt="Ícone Gestor" />
              </div>
              <p>Gestor</p>
            </div>

            <div
              className={styles["card-login"]}
              onClick={() => router.push("/login-funcionario")}
            >
              <div className={styles["icone-card"]}>
                <img src="/images/funcionario.svg" alt="Ícone Funcionário" />
              </div>
              <p>Funcionário</p>
            </div>

            <div
              className={styles["card-login"]}
              onClick={() => router.push("/login-motorista")}
            >
              <div className={styles["icone-card"]}>
                <img src="/images/motorista.svg" alt="Ícone Motorista" />
              </div>
              <p>Motorista</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    



    )





}