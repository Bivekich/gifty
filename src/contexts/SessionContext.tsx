'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { Session } from '@/types';

interface SessionContextType {
  data: Session | null;
  loading: boolean;
  error: string | null;
}

const SessionContext = createContext<SessionContextType>({
  data: null,
  loading: true,
  error: null,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <SessionContext.Provider value={{ data: session, loading, error }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
