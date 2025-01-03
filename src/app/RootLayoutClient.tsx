'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="animate-fade-in">
          <Header />
          <main className="animate-scale-in">{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
}
