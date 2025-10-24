"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login-inicial");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src="/images/logoneweglobal.jpg"
          width={400}
          height={200}
          alt="Logo da Newe"
          className={styles.logo}
        />
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      </div>
    </div>
  );
}