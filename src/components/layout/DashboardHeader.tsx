'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface User {
  email: string;
}

export default function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header>
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/dashboard"
              className="text-xl font-bold text-purple-600"
            >
              Gifty
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
      <nav className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <Link
              href="/dashboard"
              className={`py-4 text-sm font-medium border-b-2 -mb-px ${
                pathname === '/dashboard'
                  ? 'text-purple-600 border-purple-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Обзор
            </Link>
            <Link
              href="/dashboard/settings"
              className={`py-4 text-sm font-medium border-b-2 -mb-px ${
                pathname === '/dashboard/settings'
                  ? 'text-purple-600 border-purple-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Настройки
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
