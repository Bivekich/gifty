'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Notification from '@/components/ui/Notification';

interface SpinHistory {
  id: string;
  result: string;
  isGuest: boolean;
  createdAt: string;
}

interface Wheel {
  id: string;
  name: string;
  type: string;
  maxSpins: number;
  spinsUsed: number;
  options: { id: string; text: string }[];
  isActive: boolean;
  expiresAt: string;
  spinHistory: SpinHistory[];
}

export default function WheelInfoPage() {
  const params = useParams();
  const [wheel, setWheel] = useState<Wheel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWheel = async () => {
      try {
        const response = await fetch(`/api/wheels/${params.id}`);
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error);
        }
        const data = await response.json();
        setWheel(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Ошибка при загрузке данных'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWheel();
  }, [params.id]);

  if (loading) return <div>Загрузка...</div>;
  if (error || !wheel) {
    return (
      <Notification type="error" message={error || 'Рулетка не найдена'} show />
    );
  }

  const isExpired = new Date(wheel.expiresAt) < new Date();
  const timeLeft = new Date(wheel.expiresAt).getTime() - Date.now();
  const hoursLeft = Math.max(0, Math.ceil(timeLeft / (1000 * 60 * 60)));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString('ru', {
      month: 'long',
    })} в ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{wheel.name}</h1>
        <p className="text-gray-600 mb-6">
          {wheel.type === 'TRIAL' ? 'Пробная' : 'Платная'} рулетка
        </p>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600">Прокрутки:</p>
            <p className="font-semibold">
              {wheel.spinsUsed}/{wheel.maxSpins === -1 ? '∞' : wheel.maxSpins}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">
              {isExpired ? 'Истекла' : 'Истекает через'}:
            </p>
            <p className="font-semibold">
              {isExpired ? (
                <span className="text-red-600">Срок действия истек</span>
              ) : (
                `${hoursLeft} ч.`
              )}
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-2">
              Варианты подарков
            </h2>
            <ul className="space-y-2">
              {wheel.options.map((option) => (
                <li key={option.id} className="text-gray-600">
                  {option.text}
                </li>
              ))}
            </ul>
          </div>

          {wheel.spinHistory.length > 0 && (
            <div>
              <h2 className="font-semibold text-gray-900 mb-2">
                История прокруток
              </h2>
              <ul className="space-y-2">
                {wheel.spinHistory.map((spin) => (
                  <li key={spin.id} className="text-sm text-gray-600">
                    {spin.result}({spin.isGuest ? 'Гость' : 'Владелец'})
                    <br />
                    <span className="text-gray-500">
                      {formatDate(spin.createdAt)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!isExpired && (
            <div className="flex gap-3">
              <Link
                href={`/wheel/${wheel.id}`}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-center hover:bg-purple-700"
              >
                Открыть игру
              </Link>
              <Link
                href={`/share/${wheel.id}`}
                className="flex-1 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg text-center hover:bg-purple-50"
              >
                Поделиться
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
