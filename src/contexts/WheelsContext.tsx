'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { Wheel } from '@/types';

interface WheelsContextType {
  data: Wheel[] | null;
  isLoading: boolean;
  error: string | null;
}

const WheelsContext = createContext<WheelsContextType>({
  data: null,
  isLoading: true,
  error: null,
});

export function WheelsProvider({ children }: { children: React.ReactNode }) {
  const [wheels, setWheels] = useState<Wheel[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/wheels')
      .then((res) => res.json())
      .then((data) => {
        setWheels(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <WheelsContext.Provider value={{ data: wheels, isLoading, error }}>
      {children}
    </WheelsContext.Provider>
  );
}

export function useWheels() {
  return useContext(WheelsContext);
}
