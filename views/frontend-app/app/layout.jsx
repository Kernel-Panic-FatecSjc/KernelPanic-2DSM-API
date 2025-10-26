
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLateralBar from "../components/layout/ConditionalLateralBar";
import { AuthProvider } from "../context/AuthContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "NEWE Logística",
  description: "Painel de logística da NEWE",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/*
          NOVO: Envolvemos toda a aplicação com o AuthProvider.
          Isso "disponibiliza" o contexto de autenticação para todos 
          os componentes filhos (incluindo a LateralBar e o {children}).
        */}
        
        <AuthProvider>
          <div className="layout">
            <ConditionalLateralBar />
            <main className="conteudo">{children}</main>
          </div>
        </AuthProvider>
        
      </body>
    </html>
  );
}