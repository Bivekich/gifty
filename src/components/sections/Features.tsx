'use client';

import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      icon: '🎯',
      title: 'Простота использования',
      description:
        'Создайте рулетку за пару минут и поделитесь ей с друзьями или коллегами',
    },
    {
      icon: '🎨',
      title: 'Красивый дизайн',
      description:
        'Множество готовых шаблонов и возможность настроить внешний вид под свои нужды',
    },
    {
      icon: '🔒',
      title: 'Безопасность',
      description:
        'Защита от накруток и честное распределение призов между участниками',
    },
    {
      icon: '🚀',
      title: 'Быстрая работа',
      description:
        'Мгновенная генерация результатов и плавная анимация вращения колеса',
    },
  ];

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardAnimation = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const iconAnimation = {
    hidden: { scale: 0 },
    show: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-purple-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Почему выбирают нас
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-lg"
              variants={cardAnimation}
              whileHover={{
                y: -5,
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
              }}
              transition={{
                type: 'tween',
                ease: 'easeInOut',
                duration: 0.3,
              }}
            >
              <motion.div
                className="text-4xl mb-4 inline-block"
                variants={iconAnimation}
              >
                {feature.icon}
              </motion.div>
              <motion.h3
                className="text-xl font-semibold mb-3 text-purple-700"
                variants={cardAnimation}
              >
                {feature.title}
              </motion.h3>
              <motion.p className="text-gray-600" variants={cardAnimation}>
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
