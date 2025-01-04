'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Notification from '@/components/ui/Notification';

interface User {
  email: string;
  role: string;
}

interface Wheel {
  id: string;
  name: string;
  type: string;
  maxSpins: number;
  spinsUsed: number;
  isActive: boolean;
}

interface UserData {
  user: User;
  wheels: Wheel[];
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Ошибка при загрузке данных');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Dashboard error:', error);
        setError(
          error instanceof Error ? error.message : 'Ошибка при загрузке данных'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error || !userData) {
    return (
      <div>
        <Notification type="error" message={error || 'Ошибка'} show />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Информация о пользователе */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Информация о пользователе
        </h2>
        <p className="text-gray-600">Email: {userData.user.email}</p>
        <p className="text-gray-600">
          Тип аккаунта:{' '}
          {userData.user.role === 'ADMIN' ? 'Админ' : 'Пользователь'}
        </p>
      </div>

      {/* Кнопки действий */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Создать новую рулетку
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-6 flex flex-col h-full">
            <h4 className="font-medium mb-2">Пробная версия</h4>
            <p className="text-sm text-gray-600 mb-4">
              Создайте рулетку бесплатно и попробуйте все основные функции
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-2 flex-grow">
              <li>• 3 прокрутки</li>
              <li>• Срок действия 24 часа</li>
              <li>• До 5 вариантов подарков</li>
              <li>• 2 готовых шаблона (НГ, ДР)</li>
              <li>• Стандартный дизайн</li>
            </ul>
            <Link
              href="/dashboard/wheels/new?type=trial"
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg text-center inline-block hover:bg-purple-700"
            >
              Создать бесплатно
            </Link>
          </div>

          <div className="border rounded-lg p-6 flex flex-col h-full">
            <h4 className="font-medium mb-2">Платная версия</h4>
            <p className="text-sm text-gray-600 mb-4">
              Создайте рулетку без ограничений и используйте все возможности
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-2 flex-grow">
              <li>• Безлимитные прокрутки</li>
              <li>• Срок действия 7 дней</li>
              <li>• До 30 вариантов подарков</li>
              <li>• Более 10 праздничных шаблонов</li>
              <li>• Кастомизация заднего фона</li>
            </ul>
            <Link
              href="/dashboard/wheels/new?type=paid"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-center inline-block hover:bg-green-700"
            >
              Создать за 500₽
            </Link>
          </div>
        </div>
      </div>

      {/* Список активных рулеток */}
      {userData.wheels && userData.wheels.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Активные рулетки
          </h3>
          <div className="space-y-4">
            {userData.wheels
              .filter((wheel) => wheel.isActive)
              .map((wheel) => (
                <div
                  key={wheel.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium">{wheel.name}</h4>
                    <p className="text-sm text-gray-600">
                      Тип: {wheel.type === 'TRIAL' ? 'Пробная' : 'Платная'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Прокрутки: {wheel.spinsUsed}/
                      {wheel.maxSpins === -1 ? '∞' : wheel.maxSpins}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/dashboard/wheels/${wheel.id}`}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
                    >
                      Открыть
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
