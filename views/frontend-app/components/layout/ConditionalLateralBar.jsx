// components/layout/ConditionalLateralBar.jsx
'use client';
import { usePathname } from 'next/navigation';
import LateralBar from './LateralBar/LateralBar';

export default function ConditionalLateralBar() {
  const pathname = usePathname();
  if (pathname === '/formulario-agregado') return null;
  if (pathname === '/pagina-agregado') return null;
  if (pathname === '/checklist-veiculo') return null;
  if(pathname ==='/login-funcionario') return null;
  if(pathname ==='/login-gestor') return null;
  if(pathname ==='/login-master') return null;
  if(pathname ==='/login-inicial') return null;
  if(pathname === '/login-motorista') return null
  if(pathname === '/login-localizacao') return null
  return <LateralBar />;
}