'use client';

import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      icon: '🎲',
      title: 'Случайный выбор',
      description:
        'Наша рулетка использует современный алгоритм случайного выбора, делая процесс полностью непредсказуемым и захватывающим',
    },
    {
      icon: '🎨',
      title: 'Персонализация',
      description:
        'Настройте внешний вид рулетки под любой праздник или событие',
    },
    {
      icon: '🔒',
      title: 'Безопасность',
      description:
        'Все данные надежно защищены, а доступ к рулетке есть только у тех, кому вы отправили ссылку',
    },
    {
      icon: '⚡',
      title: 'Мгновенный результат',
      description:
        'Создавайте рулетку за считанные минуты и сразу делитесь ею с друзьями',
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
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-purple-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Почему выбирают Gifty
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 gap-12"
          variants={containerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl"
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
                className="text-3xl mb-4 inline-block"
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
