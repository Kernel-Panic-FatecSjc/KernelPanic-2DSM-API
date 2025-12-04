"use client";
import Image from "next/image";
import styles from "./login.module.css";

function Login() {
  return (
    <Image
      className={styles.logo}
      src="/images/logoneweglobal.jpg"
      width={300}
      height={150}
      alt="Logo da Newe"
    />
  );
}

export default Login;