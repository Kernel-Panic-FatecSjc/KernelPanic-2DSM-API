'use client';
import { usePathname } from 'next/navigation';
import LateralBar from './LateralBar/LateralBar';

export default function ConditionalLateralBar() {
  const pathname = usePathname();
  const hidePaths = ['/formulario-agregado', '/pagina-agregado', '/checklist-veiculo'];

  if (hidePaths.includes(pathname)) {
    return <div className="empty-lateral" />; 
  }

  return <LateralBar />;
}
