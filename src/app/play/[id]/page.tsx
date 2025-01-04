'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Notification from '@/components/ui/Notification';

interface Wheel {
  id: string;
  name: string;
  background: string;
}

interface GuestStatus {
  hasSpun: boolean;
  spinTime?: string;
}

const backgroundStyles = {
  standard: 'bg-gradient-to-b from-purple-600 to-pink-600',
  birthday: 'bg-[url("/backgrounds/birthday.jpg")] bg-cover bg-center',
  newyear: 'bg-[url("/backgrounds/newyear.jpg")] bg-cover bg-center',
};

export default function PlayWheelPage() {
  const params = useParams();
  const [wheel, setWheel] = useState<Wheel | null>(null);
  const [guestStatus, setGuestStatus] = useState<GuestStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Загружаем информацию о рулетке
        const wheelResponse = await fetch(`/api/wheels/${params.id}/public`);
        if (!wheelResponse.ok) {
          const error = await wheelResponse.json();
          setError(error.error);
          return;
        }
        const wheelData = await wheelResponse.json();
        setWheel(wheelData);

        // Проверяем статус гостя
        const statusResponse = await fetch(
          `/api/wheels/${params.id}/guest-status`
        );
        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          setGuestStatus(statusData);
        }
      } catch (error) {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <div>Загрузка...</div>;
  if (error || !wheel) {
    return (
      <div>
        <Notification
          type="error"
          message={error || 'Рулетка не найдена'}
          show
        />
      </div>
    );
  }

  if (guestStatus?.hasSpun) {
    return (
      <div
        className={`min-h-screen relative ${
          backgroundStyles[wheel?.background || 'standard']
        }`}
      >
        {/* Затемняющий оверлей */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Контент */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {wheel.name}
            </h1>
            <p className="text-gray-600 mb-8">
              Вы уже использовали свою попытку в этой рулетке. Каждый гость
              может сделать только один спин.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 text-purple-600 border-2 border-purple-600 rounded-full hover:bg-purple-50 transition-colors"
            >
              На главную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative ${
        backgroundStyles[wheel?.background || 'standard']
      }`}
    >
      {/* Затемняющий оверлей */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {wheel.name}
          </h1>
          <p className="text-gray-600 mb-8">
            Вас пригласили испытать удачу! У вас есть один шанс прокрутить
            рулетку и получить случайный подарок.
          </p>

          <Link
            href={`/wheel/${wheel.id}?mode=guest`}
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Попытать удачу
          </Link>
        </div>
      </div>
    </div>
  );
}
