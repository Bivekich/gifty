'use client';

import { motion } from 'framer-motion';

export default function Cookies() {
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-white">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>

      <div className="relative pt-32 pb-20">
        <motion.div
          className="container mx-auto px-4"
          variants={containerAnimation}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-4xl font-bold text-center mb-12 text-purple-800"
            variants={itemAnimation}
          >
            Использование cookies
          </motion.h1>

          <motion.div
            className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 space-y-8"
            variants={itemAnimation}
          >
            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                1. Что такое cookies?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Cookies - это небольшие текстовые файлы, которые сохраняются на
                вашем устройстве при посещении нашего сайта. Они помогают нам
                сделать ваше взаимодействие с сервисом более удобным и
                персонализированным.
              </p>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                2. Какие cookies мы используем
              </h2>
              <ul className="list-disc list-inside space-y-3 text-gray-600">
                <li>
                  <span className="font-semibold">Необходимые cookies:</span>{' '}
                  обеспечивают работу основных функций сайта
                </li>
                <li>
                  <span className="font-semibold">Функциональные cookies:</span>{' '}
                  запоминают ваши предпочтения и настройки
                </li>
                <li>
                  <span className="font-semibold">Аналитические cookies:</span>{' '}
                  помогают нам улучшать работу сервиса
                </li>
              </ul>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                3. Управление cookies
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Вы можете управлять использованием cookies через настройки
                вашего браузера:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Отключить все cookies</li>
                <li>Получать уведомления об использовании cookies</li>
                <li>Удалять cookies после каждого посещения</li>
              </ul>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                4. Срок хранения
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Разные типы cookies хранятся разное время:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4 text-gray-600">
                <li>Сессионные cookies удаляются после закрытия браузера</li>
                <li>Постоянные cookies могут храниться до 12 месяцев</li>
              </ul>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                5. Дополнительная информация
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Если у вас есть вопросы об использовании cookies на нашем сайте,
                пожалуйста, свяжитесь с нами через форму обратной связи или по
                email. Продолжая использовать наш сайт, вы соглашаетесь с
                использованием cookies.
              </p>
            </motion.section>

            <motion.div
              className="pt-8 mt-8 border-t border-gray-200 text-gray-500 text-sm"
              variants={itemAnimation}
            >
              <p>
                Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
