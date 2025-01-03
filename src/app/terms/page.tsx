'use client';

import { motion } from 'framer-motion';

export default function Terms() {
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
            Пользовательское соглашение
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
                Настоящее Пользовательское соглашение регулирует отношения между
                пользователем и сервисом Gifty. Используя наш сервис, вы
                соглашаетесь с условиями данного соглашения.
              </p>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                2. Условия использования
              </h2>
              <ul className="list-disc list-inside space-y-3 text-gray-600">
                <li>Сервис предоставляется на условиях "как есть" (as is)</li>
                <li>
                  Пользователь обязуется не использовать сервис для нарушения
                  законодательства РФ
                </li>
                <li>
                  Администрация сервиса не несет ответственности за содержание
                  созданных пользователями рулеток
                </li>
              </ul>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                3. Конфиденциальность
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Мы обязуемся сохранять вашу конфиденциальность и защищать
                предоставленную вами информацию. Подробнее о том, как мы
                обрабатываем ваши данные, читайте в Политике конфиденциальности.
              </p>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                4. Оплата и возврат средств
              </h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  Оплата услуг производится согласно выбранному тарифу. Мы
                  поддерживаем следующие способы оплаты:
                </p>
                <ul className="list-disc list-inside pl-4">
                  <li>Банковские карты</li>
                  <li>Электронные кошельки</li>
                  <li>Система быстрых платежей</li>
                </ul>
                <p>
                  Возврат средств возможен в течение 14 дней с момента оплаты,
                  если услуга не была использована.
                </p>
              </div>
            </motion.section>

            <motion.section variants={itemAnimation}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                5. Изменение условий
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Мы оставляем за собой право изменять условия данного соглашения.
                Актуальная версия всегда доступна на этой странице. Продолжая
                использовать сервис после внесения изменений, вы соглашаетесь с
                новыми условиями.
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
