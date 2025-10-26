// components/ProtectRoute.jsx

"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Importa nosso hook
import { useRouter } from "next/navigation";

export default function ProtectRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se NÃO está carregando (já verificou o token) E NÃO está autenticado
    if (!isLoading && !isAuthenticated) {
      router.push("/login-inicial"); // Envia para a seleção de login
    }
  }, [isLoading, isAuthenticated, router]);

  // 1. Se estiver carregando, mostra um "Loading..."
  if (isLoading) {
    // Você pode criar um componente de loading mais bonito
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Carregando...</p>;
  }

  // 2. Se estiver autenticado, renderiza a página protegida
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // 3. Se não estiver autenticado, não renderiza nada (pois está redirecionando)
  return null;
}