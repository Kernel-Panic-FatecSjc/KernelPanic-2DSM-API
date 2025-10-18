import LateralBar from "../../components/layout/LateralBar/LateralBar";

export default function SidebarLayout({ children }) {
  return (
    <div className="layout">
      <LateralBar />
      <main className="conteudo">{children}</main>
    </div>
  );
}