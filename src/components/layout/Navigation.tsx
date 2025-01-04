'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function Navigation() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  if (isDashboard) {
    return null;
  }

  return <Header />;
}
