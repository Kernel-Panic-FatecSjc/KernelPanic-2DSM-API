// context/AuthContext.jsx

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 1. Criar o Contexto
const AuthContext = createContext(null);

// 2. Criar o Provedor (Provider)
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Começa carregando
  const router = useRouter();

  // 3. Efeito para verificar o token no localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // TODO: No futuro, decodifique o token aqui e verifique a data de expiração
      setIsAuthenticated(true);
    }
    
    setIsLoading(false); // Termina o carregamento
  }, []);

  // 4. Funções de Login e Logout
  const login = (token) => {
    localStorage.setItem("token", token); // Salva o token
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove o token
    setIsAuthenticated(false);
    router.push("/login-inicial"); // Redireciona para sua tela inicial de login
  };

  // 5. Expõe os valores
  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 6. Hook customizado para facilitar o uso
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};