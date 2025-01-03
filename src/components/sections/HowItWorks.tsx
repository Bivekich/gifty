'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      icon: '🎨',
      title: 'Создайте рулетку',
      description: 'Добавьте варианты подарков и украсьте её по своему вкусу',
    },
    {
      icon: '🎯',
      title: 'Поделитесь магией',
      description: 'Отправьте волшебную ссылку тому, кого хотите порадовать',
    },
    {
      icon: '🎉',
      title: 'Дарите радость',
      description: 'Запустите рулетку и создайте незабываемый момент',
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

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const iconAnimation = {
    hidden: { scale: 0, rotate: -180 },
    show: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-purple-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Три шага к волшебству
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-12"
          variants={containerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemAnimation}
            >
              <motion.div
                className="bg-gradient-to-br from-pink-400 to-purple-500 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                variants={iconAnimation}
              >
                <span className="text-4xl">{step.icon}</span>
              </motion.div>
              <motion.h3
                className="text-2xl font-semibold mb-4 text-purple-700"
                variants={itemAnimation}
              >
                {step.title}
              </motion.h3>
              <motion.p
                className="text-gray-600 text-lg"
                variants={itemAnimation}
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
