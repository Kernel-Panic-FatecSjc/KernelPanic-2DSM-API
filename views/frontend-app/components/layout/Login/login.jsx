"use client";
import Image from "next/image";
import styles from "./login.module.css";

function Login() {
  return (
    <div className={styles.lateral}>
        <Image
        className={styles.logo}
          src="/images/logoneweglobal.jpg"
          width={300}
          height={150}
          alt="Logo da Newe"
        />
    </div>
  );
}

export default Login;
