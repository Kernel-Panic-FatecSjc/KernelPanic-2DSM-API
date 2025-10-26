"use client";
import React from "react";
import Image from "next/image";
import styles from "./home.module.css";
import ProtectRoute from "../../components/ProtectRoute";

export default function HomeMenu() {
    return (
        <ProtectRoute>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.logoWrapper}>
                        <Image
                            src="/images/logoneweglobal.jpg"
                            width={400}
                            height={200}
                            alt="Logo da Newe"
                            className={styles.logo}
                        />
                    </div>

                    <div className={styles.footer}>
                        <p>Selecione uma opção no menu lateral para começar</p>
                    </div>
                </div>
            </div>
        </ProtectRoute>
    );
}
