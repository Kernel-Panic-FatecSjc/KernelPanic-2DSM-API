// context/AuthContext.jsx

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // 1. Importe a biblioteca

// 1. Criar o Contexto
const AuthContext = createContext(null);

// 2. Criar o Provedor (Provider)
export function AuthProvider({ children }) {
  // 2. Trocamos 'isAuthenticated' por 'user'
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 3. Efeito para verificar o token no localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // 3. Decodificamos o token
        const decodedToken = jwtDecode(token);

        // 4. Verificamos se o token expirou
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
          // Se expirou, limpamos
          localStorage.removeItem("token");
          setUser(null);
        } else {
          // Se for válido, configuramos o usuário
          setUser(decodedToken);
        }
      } catch (error) {
        // Se o token for inválido, limpamos
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
    
    setIsLoading(false); // Termina o carregamento
  }, []);

  // 4. Funções de Login e Logout
  const login = (token) => {
    try {
      localStorage.setItem("token", token); // Salva o token
      const decodedToken = jwtDecode(token); // Decodifica
      setUser(decodedToken); // Salva o usuário no estado
    } catch (error) {
      console.error("Erro ao fazer login (token inválido):", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove o token
    setUser(null); // Limpa o usuário do estado
    router.push("/login-inicial"); // Redireciona
  };

  // 5. Expõe os valores
  const value = {
    // 'isAuthenticated' agora é um valor que diz se 'user' existe ou não
    isAuthenticated: !!user, 
    user: user, // 6. Expomos o objeto 'user' (com os perfis!)
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