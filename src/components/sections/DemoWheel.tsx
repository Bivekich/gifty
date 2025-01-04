'use client';

import { motion } from 'framer-motion';
import WheelSpinner from '@/components/WheelSpinner';

export default function DemoWheel() {
  const demoItems = [
    { id: 1, text: 'Яндекс.Плюс', color: '#FF6B6B' },
    { id: 2, text: 'Сертификат Ozon', color: '#4ECDC4' },
    { id: 3, text: 'Wildberries 1000₽', color: '#45B7D1' },
    { id: 4, text: 'Netflix месяц', color: '#96CEB4' },
    { id: 5, text: 'Литрес подписка', color: '#D4A5A5' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-purple-800 mb-6">
              Попробуйте прямо сейчас
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Это демо-версия нашей волшебной рулетки. Представьте, как здорово
              будет создать свою уникальную рулетку с подарками, которые можно
              моментально отправить победителю!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <WheelSpinner items={demoItems} isDemo={true} />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">
                  В личном кабинете доступно:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Создание пробной рулетки
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    До 5 вариантов подарков
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>3 прокрутки
                    для тестирования
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Базовые шаблоны оформления
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Возможность поделиться ссылкой
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Просмотр результатов
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Срок действия 24 часа
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-2xl shadow-lg text-white">
                <h3 className="text-xl font-semibold mb-4">
                  Откройте магию праздника в платной версии:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-pink-200 mr-2">✓</span>
                    До 30 уникальных подарков
                  </li>
                  <li className="flex items-center">
                    <span className="text-pink-200 mr-2">✓</span>
                    Безлимитные прокрутки для всех участников
                  </li>
                  <li className="flex items-center">
                    <span className="text-pink-200 mr-2">✓</span>
                    Шаблоны для любого праздника
                  </li>
                  <li className="flex items-center">
                    <span className="text-pink-200 mr-2">✓</span>
                    Загрузка своих фотографий на фон
                  </li>
                  <li className="flex items-center">
                    <span className="text-pink-200 mr-2">✓</span>
                    Полная настройка внешнего вида
                  </li>
                  <li className="flex items-center">
                    <span className="text-pink-200 mr-2">✓</span>
                    Срок действия 7 дней
                  </li>
                  <li className="flex items-start text-sm mt-4 text-pink-100">
                    <span className="text-pink-200 mr-2 mt-1">💫</span>
                    Создавайте уникальные рулетки с цифровыми подарками, которые
                    можно моментально отправить победителю. Выбирайте из
                    популярных сервисов или добавляйте свои!
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
