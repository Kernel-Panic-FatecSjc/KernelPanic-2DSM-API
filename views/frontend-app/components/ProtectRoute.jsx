// components/ProtectRoute.jsx

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Importa nosso hook
import { useRouter } from "next/navigation";

// O componente agora aceita 'children' e a nova prop 'perfisPermitidos'
export default function ProtectRoute({ children, perfisPermitidos }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  // Estado para saber se a verificação de permissão terminou
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Se o AuthContext ainda está carregando, espere
    if (isLoading) {
      return;
    }

    // 2. Se NÃO está carregando E NÃO tem usuário (não logado)
    if (!isLoading && !user) {
      router.push("/login-inicial"); // Envia para a seleção de login
      return;
    }

    // 3. Se NÃO está carregando E TEM usuário (logado)
    if (!isLoading && user) {
      // 4. Verificação de permissão
      
      // Se a rota NÃO exige perfis (perfisPermitidos não foi passado),
      // apenas estar logado é o suficiente.
      if (!perfisPermitidos || perfisPermitidos.length === 0) {
        setIsAuthorized(true);
        return;
      }
      
      // Se a rota EXIGE perfis:
      const perfisDoUsuario = user.perfis || [];
      
      // Verificamos se *pelo menos um* (some) perfil do usuário
      // está na lista de 'perfisPermitidos'
      const temPermissao = perfisDoUsuario.some(perfil => 
        perfisPermitidos.includes(perfil)
      );

      if (temPermissao) {
        // Tem permissão! Autorizado.
        setIsAuthorized(true);
      } else {
        // Não tem permissão! Redireciona.
        alert("Acesso negado. Você não tem permissão para acessar esta página.");
        router.push("/login-inicial"); // Mude para sua home page (ex: /dashboard)
      }
    }
  }, [isLoading, user, router, perfisPermitidos]); // Adicione a prop ao array de dependências

  // Se estiver carregando ou ainda não foi autorizado, mostra o loading
  if (isLoading || !isAuthorized) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Verificando permissões...</p>;
  }

  // Se estiver autenticado E autorizado, renderiza a página
  if (isAuthorized) {
    return <>{children}</>;
  }

  // Caso contrário, não renderiza nada (pois está redirecionando)
  return null;
}