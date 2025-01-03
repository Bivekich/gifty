'use client';

import { motion } from 'framer-motion';

export default function Privacy() {
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
            Политика конфиденциальности
          </motion.h1>

          <motion.div
            className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 space-y-8"
            variants={itemAnimation}
          >
            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                1. Общие положения
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Мы уважаем вашу конфиденциальность и стремимся защитить ваши
                персональные данные. В этой политике описано, как мы собираем,
                используем и защищаем вашу информацию.
              </p>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                2. Сбор информации
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Мы собираем следующие типы информации:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Email адрес для регистрации и связи</li>
                <li>Информация о созданных рулетках и подарках</li>
                <li>Технические данные (IP адрес, тип браузера)</li>
                <li>Файлы cookies для улучшения работы сервиса</li>
              </ul>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                3. Использование информации
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Собранная информация используется для:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Предоставления доступа к сервису</li>
                <li>Улучшения качества обслуживания</li>
                <li>Отправки уведомлений о работе сервиса</li>
                <li>Технической поддержки пользователей</li>
              </ul>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                4. Защита информации
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Мы применяем современные технические средства для защиты ваших
                данных. Доступ к персональным данным имеют только авторизованные
                сотрудники, которые дали согласие на обеспечение
                конфиденциальности.
              </p>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                5. Права пользователей
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Вы имеете право:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Получить информацию о хранящихся данных</li>
                <li>Требовать исправления неточных данных</li>
                <li>Требовать удаления ваших данных</li>
                <li>Отозвать согласие на обработку данных</li>
              </ul>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                6. Изменения политики
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Мы оставляем за собой право вносить изменения в политику
                конфиденциальности. Актуальная версия всегда доступна на этой
                странице. Продолжая использовать сервис после изменений, вы
                соглашаетесь с обновленной политикой.
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
