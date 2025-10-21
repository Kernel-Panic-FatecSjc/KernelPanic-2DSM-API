'use client';
import { usePathname } from 'next/navigation';
import LateralBar from './LateralBar/LateralBar';

export default function ConditionalLateralBar() {
  const pathname = usePathname();
  if (pathname === '/formulario-agregado') return null;
  if (pathname === '/pagina-agregado') return null;
  if (pathname === '/checklist-veiculo') return null;
  return <LateralBar />;
}