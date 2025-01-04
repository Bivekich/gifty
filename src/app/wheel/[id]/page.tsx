'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import WheelSpinner from '@/components/WheelSpinner';
import Notification from '@/components/ui/Notification';

interface Wheel {
  id: string;
  name: string;
  type: 'TRIAL' | 'PAID';
  options: { id: string; text: string }[];
  maxSpins: number;
  spinsUsed: number;
  isActive: boolean;
  expiresAt: string;
  background: 'standard' | 'birthday' | 'newyear';
}

const backgroundStyles = {
  standard: 'bg-gradient-to-b from-purple-600 to-pink-600',
  birthday: 'bg-[url("/backgrounds/birthday.jpg")] bg-cover bg-center',
  newyear: 'bg-[url("/backgrounds/newyear.jpg")] bg-cover bg-center',
} as const;

function WheelInfo({ wheel }: { wheel: Wheel }) {
  const [isOpen, setIsOpen] = useState(false);

  // Форматируем оставшееся время
  const formatTimeLeft = () => {
    const now = new Date();
    const expiresAt = new Date(wheel.expiresAt);
    const timeLeft = expiresAt.getTime() - now.getTime();

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (days > 0) {
      return `${days} ${getDaysWord(days)}`;
    } else if (hours > 0) {
      return `${hours} ${getHoursWord(hours)}`;
    } else {
      return 'Менее часа';
    }
  };

  const getDaysWord = (days: number) => {
    if (days === 1) return 'день';
    if (days > 1 && days < 5) return 'дня';
    return 'дней';
  };

  const getHoursWord = (hours: number) => {
    if (hours === 1) return 'час';
    if (hours > 1 && hours < 5) return 'часа';
    return 'часов';
  };

  // Обновляем компонент каждую минуту
  useEffect(() => {
    const timer = setInterval(() => {
      // Форсируем обновление компонента
      setIsOpen((prev) => prev);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white p-4 rounded-full shadow-lg hover:bg-gray-50"
      >
        ℹ️
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-6 w-80">
          <h3 className="font-bold text-lg mb-4">Информация о рулетке</h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Осталось прокруток:</p>
              <p className="font-semibold">
                {wheel.maxSpins === -1
                  ? '∞'
                  : `${wheel.maxSpins - wheel.spinsUsed} из ${wheel.maxSpins}`}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Срок действия:</p>
              <p className="font-semibold">{formatTimeLeft()}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Варианты:</p>
              <ul className="space-y-2">
                {wheel.options.map((option, index) => (
                  <li key={option.id} className="flex items-center gap-2">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      #{index + 1}
                    </span>
                    <span className="text-sm">{option.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WheelGamePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const isGuestMode = searchParams.get('mode') === 'guest';

  const [wheel, setWheel] = useState<Wheel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'error' | 'success';
  }>({
    show: false,
    message: '',
    type: 'error',
  });

  useEffect(() => {
    const fetchWheel = async () => {
      try {
        // Используем разные эндпоинты для гостя и владельца
        const endpoint = isGuestMode
          ? `/api/wheels/${params.id}/public`
          : `/api/wheels/${params.id}`;

        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setWheel(data);
        } else {
          const error = await response.json();
          setError(error.error);
        }
      } catch {
        setError('Не удалось загрузить рулетку');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchWheel();
    }
  }, [params.id, isGuestMode]);

  const handleSpinStart = async () => {
    try {
      // Используем разные эндпоинты для спина гостя и владельца
      const endpoint = isGuestMode
        ? `/api/wheels/${params.id}/guest-spin`
        : `/api/wheels/${params.id}/spin`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedOption: null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setNotification({
          show: true,
          message: error.error,
          type: 'error',
        });
        return;
      }

      setIsSpinning(true);
      setNotification({ show: false, message: '', type: 'error' });
    } catch {
      setNotification({
        show: true,
        message: 'Ошибка при запуске рулетки',
        type: 'error',
      });
    }
  };

  const handleSpinComplete = async (option: { id: string; text: string }) => {
    setSelectedOption(option);
    setIsSpinning(false);

    try {
      const endpoint = isGuestMode
        ? `/api/wheels/${params.id}/guest-spin-result`
        : `/api/wheels/${params.id}/spin-result`;

      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedOption: option.text,
        }),
      });

      // Обновляем данные рулетки после прокрутки
      const wheelResponse = await fetch(
        isGuestMode
          ? `/api/wheels/${params.id}/public`
          : `/api/wheels/${params.id}`
      );
      if (wheelResponse.ok) {
        const updatedWheel = await wheelResponse.json();
        setWheel(updatedWheel);
      }

      if (isGuestMode) {
        setNotification({
          show: true,
          message: 'Спасибо за участие! Это была ваша единственная попытка.',
          type: 'success',
        });
      }
    } catch {
      console.error('Error saving spin result');
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error || !wheel) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Notification
          type="error"
          message={error || 'Рулетка не найдена'}
          show
        />
      </div>
    );
  }

  // Преобразуем опции для колеса, добавляя номера
  const wheelItems = wheel.options.map((option, index) => ({
    id: Number(option.id),
    text: `#${index + 1}`,
    color: '#E5E7EB', // Серый цвет
  }));

  return (
    <div
      className={`min-h-screen relative ${backgroundStyles[wheel.background]}`}
    >
      {/* Затемняющий оверлей */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold text-white mb-12">{wheel.name}</h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
          <WheelSpinner
            items={wheelItems}
            onSpinComplete={handleSpinComplete}
            isSpinning={isSpinning}
            onSpinStart={handleSpinStart}
          />
        </div>

        {selectedOption && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Выпал подарок:
            </h2>
            <p className="text-3xl font-bold text-pink-200">
              {wheel.options[Number(selectedOption.text.slice(1)) - 1].text}
            </p>
          </div>
        )}

        {notification.show && (
          <Notification
            type={notification.type}
            message={notification.message}
            show={notification.show}
          />
        )}
      </div>

      <WheelInfo wheel={wheel} />
    </div>
  );
}
