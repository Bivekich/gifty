'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Notification from '@/components/ui/Notification';
import Image from 'next/image';

const baseTemplates = [
  {
    name: 'День рождения',
    background: 'birthday',
    options: [
      'Любимая пицца на выбор',
      'Сертификат на 1000₽ в онлайн-магазин',
      'Билет в кино на любой фильм',
      'Подписка на месяц в любимый сервис',
      'Доставка любимых сладостей',
    ],
  },
  {
    name: 'Новый год',
    background: 'newyear',
    options: [
      'Подарочная карта Steam на 1000₽',
      'Сертификат в любимое кафе',
      'Набор новогодних сладостей',
      'Подписка на онлайн-кинотеатр',
      'Доставка праздничного ужина',
    ],
  },
];

const backgrounds = [
  { id: 'standard', name: 'Стандартный', preview: '/backgrounds/standard.jpg' },
  {
    id: 'birthday',
    name: 'День рождения',
    preview: '/backgrounds/birthday.jpg',
  },
  { id: 'newyear', name: 'Новый год', preview: '/backgrounds/newyear.jpg' },
];

function CreateWheelForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const [wheelData, setWheelData] = useState({
    name: '',
    options: [{ id: '1', text: '' }],
    background: 'standard',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const addOption = () => {
    if (wheelData.options.length >= 5 && type === 'trial') {
      setStatus('error');
      setMessage('В пробной версии можно добавить максимум 5 вариантов');
      return;
    }
    setWheelData({
      ...wheelData,
      options: [
        ...wheelData.options,
        { id: String(wheelData.options.length + 1), text: '' },
      ],
    });
  };

  const removeOption = (id: string) => {
    if (wheelData.options.length <= 1) {
      setStatus('error');
      setMessage('Должен быть хотя бы один вариант');
      return;
    }
    setWheelData({
      ...wheelData,
      options: wheelData.options.filter((option) => option.id !== id),
    });
  };

  const handleOptionChange = (id: string, value: string) => {
    setWheelData({
      ...wheelData,
      options: wheelData.options.map((option) =>
        option.id === id ? { ...option, text: value } : option
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setMessage('');

    // Проверяем, что все поля заполнены
    if (!wheelData.name.trim()) {
      setStatus('error');
      setMessage('Введите название рулетки');
      setLoading(false);
      return;
    }

    if (wheelData.options.some((option) => !option.text.trim())) {
      setStatus('error');
      setMessage('Заполните все варианты');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/wheels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: wheelData.name,
          options: wheelData.options,
          type: type?.toUpperCase() || 'TRIAL',
          background: wheelData.background,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Рулетка успешно создана');
        setTimeout(() => {
          router.push(`/dashboard/wheels/${data.wheelId}`);
        }, 1500);
      } else {
        setStatus('error');
        setMessage(data.error);
      }
    } catch {
      setStatus('error');
      setMessage('Не удалось создать рулетку');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template: (typeof baseTemplates)[0]) => {
    setWheelData({
      name: template.name,
      options: template.options.map((text, index) => ({
        id: String(index + 1),
        text,
      })),
      background: template.background,
    });
  };

  const handleBackgroundSelect = (backgroundId: string) => {
    if (type === 'trial' && backgroundId !== 'standard') {
      setStatus('error');
      setMessage('В пробной версии доступен только стандартный фон');
      return;
    }
    setWheelData({ ...wheelData, background: backgroundId });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Создание новой рулетки
      </h1>

      {/* Шаблоны */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Выберите шаблон
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {baseTemplates.map((template) => (
            <button
              key={template.name}
              onClick={() => handleTemplateSelect(template)}
              className="p-4 border rounded-lg hover:border-purple-500 transition-colors text-left"
            >
              <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={`/backgrounds/${template.background}.jpg`}
                  alt={template.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600">
                {template.options.length} готовых вариантов
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Выбор фона */}
      {type === 'paid' && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Выберите фон
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {backgrounds.map((bg) => (
              <button
                key={bg.id}
                onClick={() => handleBackgroundSelect(bg.id)}
                className={`relative p-2 border rounded-lg transition-all ${
                  wheelData.background === bg.id
                    ? 'border-purple-500 ring-2 ring-purple-200'
                    : 'hover:border-purple-300'
                }`}
              >
                <div className="relative h-24 mb-2 rounded overflow-hidden">
                  <Image
                    src={bg.preview}
                    alt={bg.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-center text-gray-700">{bg.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <Notification
        type={status === 'success' ? 'success' : 'error'}
        message={message}
        show={status !== 'idle'}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Название рулетки
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            value={wheelData.name}
            onChange={(e) =>
              setWheelData({ ...wheelData, name: e.target.value })
            }
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Варианты подарков
            </h2>
            <button
              type="button"
              onClick={addOption}
              className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Добавить вариант
            </button>
          </div>

          <div className="space-y-4">
            {wheelData.options.map((option) => (
              <div key={option.id} className="flex gap-4">
                <input
                  type="text"
                  required
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={option.text}
                  onChange={(e) =>
                    handleOptionChange(option.id, e.target.value)
                  }
                  placeholder="Введите вариант подарка"
                />
                <button
                  type="button"
                  onClick={() => removeOption(option.id)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Создание...' : 'Создать рулетку'}
        </button>
      </form>
    </div>
  );
}

export default function CreateWheel() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <CreateWheelForm />
    </Suspense>
  );
}
