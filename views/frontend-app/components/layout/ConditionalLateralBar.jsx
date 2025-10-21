// components/layout/ConditionalLateralBar.jsx
'use client';
import { usePathname } from 'next/navigation';
import LateralBar from './LateralBar/LateralBar';

export default function ConditionalLateralBar() {
  const pathname = usePathname();
  if (pathname === '/agendamento') return null;
  return <LateralBar />;
}