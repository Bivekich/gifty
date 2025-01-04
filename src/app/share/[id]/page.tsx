'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface WheelData {
  id: string;
  name: string;
  background: string;
}

export default function SharePage() {
  const params = useParams();
  const [wheelData, setWheelData] = useState<WheelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchWheel = async () => {
      try {
        const response = await fetch(`/api/wheels/${params.id}/public`);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке рулетки');
        }
        const data = await response.json();
        setWheelData(data);
      } catch {
        setError('Не удалось загрузить рулетку');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchWheel();
    }
  }, [params.id]);

  const handleCopyLink = async () => {
    try {
      const playLink = `${window.location.origin}/wheel/${params.id}?mode=guest`;
      await navigator.clipboard.writeText(playLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Не удалось скопировать ссылку');
    }
  };

  if (loading) return <div className="pt-32">Загрузка...</div>;
  if (error || !wheelData)
    return <div className="pt-32">Ошибка: {error || 'Рулетка не найдена'}</div>;

  const playLink = `/wheel/${params.id}?mode=guest`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-white pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-800 mb-4">
              {wheelData.name}
            </h1>
            <p className="text-gray-600">
              Поделитесь этой ссылкой с друзьями, чтобы они могли крутить
              рулетку:
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}${playLink}`}
                className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-gray-700"
              />
              <button
                onClick={handleCopyLink}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {copied ? 'Скопировано!' : 'Копировать'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Хотите попробовать сами?
            </h2>
            <Link
              href={playLink}
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Открыть рулетку
            </Link>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Создайте свою рулетку на Gifty и удивите своих друзей!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
