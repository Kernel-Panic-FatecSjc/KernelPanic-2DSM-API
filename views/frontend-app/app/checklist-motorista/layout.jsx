import { Geist, Geist_Mono } from "next/font/google";
import Login from "../../components/layout/Login/login";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NEWE Logística",
  description: "Painel de logística da NEWE",
  icons: {
    icon: "/favicon.ico", 
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="layout">
          <Login />
          <main className="conteudo">{children}</main>
        </div>
      </body>
    </html>
  );
}
