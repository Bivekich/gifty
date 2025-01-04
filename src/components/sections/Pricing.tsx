'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Pricing() {
  const plans = [
    {
      name: 'Пробный',
      price: '0 ₽',
      description: 'Попробуйте бесплатно',
      features: [
        '1 рулетка',
        'До 5 вариантов подарков',
        '3 прокрутки',
        'Базовые шаблоны',
        'Срок действия 24 часа',
      ],
    },
    {
      name: 'Основной',
      price: '499 ₽',
      description: 'Полный доступ',
      isPopular: true,
      features: [
        '1 рулетка',
        'До 30 вариантов подарков',
        'Неограниченные прокрутки',
        'Все шаблоны',
        'Срок действия 7 дней',
        'Кастомизация дизайна',
      ],
    },
  ];

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: 30,
    },
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-purple-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Выберите свой тариф
        </motion.h2>
        <motion.div
          className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto"
          variants={containerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative bg-white rounded-3xl shadow-lg overflow-hidden h-full flex flex-col w-full md:w-[480px] ${
                plan.isPopular ? 'md:scale-105' : ''
              }`}
              variants={cardAnimation}
              whileHover={{
                y: -10,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {plan.isPopular && (
                <div className="absolute top-4 right-4 z-10">
                  <motion.span
                    className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm px-4 py-1.5 rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 10,
                      delay: 0.5,
                    }}
                  >
                    Популярный выбор
                  </motion.span>
                </div>
              )}
              <div
                className={`p-8 flex flex-col flex-grow ${
                  plan.isPopular
                    ? 'bg-gradient-to-br from-purple-600 to-pink-500 text-white'
                    : ''
                }`}
              >
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">{plan.price}</div>
                  <p
                    className={
                      plan.isPopular ? 'text-pink-100' : 'text-gray-500'
                    }
                  >
                    {plan.description}
                  </p>
                </motion.div>
                <motion.ul className="space-y-4 mt-8 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * featureIndex }}
                    >
                      <span className="mr-2">✓</span>
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>
                <Link
                  href="/dashboard"
                  className={`block w-full py-3 px-6 text-center rounded-full font-semibold transition-all ${
                    plan.isPopular
                      ? 'bg-white text-purple-600 hover:bg-pink-100'
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  Выбрать тариф
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
