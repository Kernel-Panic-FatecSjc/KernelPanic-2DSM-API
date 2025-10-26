'use client';
import { usePathname } from 'next/navigation';
import LateralBar from './LateralBar/LateralBar';

export default function ConditionalLateralBar() {
  const pathname = usePathname();
  const hidePaths = [
    '/formulario-agregado', 
    '/pagina-agregado', 
    '/checklist-veiculo', 
    '/login-funcionario',
    '/login-gestor',
    '/login-master',
    '/login-inicial',
    '/login-motorista',
    '/login-localizacao'
  ];

  if (hidePaths.includes(pathname)) {
    return <div className="empty-lateral" />; 
  }
    return <LateralBar />;
}