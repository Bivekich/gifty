'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const giftAnimation = {
    animate: {
      y: [0, -10, -5, -15, -5, -8, 0],
      rotate: [0, -3, 3, -3, 2, -1, 0],
      scale: [1, 1.1, 1.05, 1.1, 1.05, 1.02, 1],
    },
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatDelay: 1,
    },
  };

  const sparkleAnimation = {
    animate: {
      rotate: [0, 15, -15, 20, -20, 0],
      scale: [1, 1.2, 0.9, 1.1, 0.8, 1],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-pink-500 to-purple-600 text-white overflow-hidden flex items-center justify-center">
      {/* Декоративные элементы фона */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </motion.div>

      {/* Основной контент */}
      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Иконка */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
          >
            <motion.span
              className="text-6xl inline-block"
              animate={giftAnimation.animate}
              transition={giftAnimation.transition}
            >
              🎁
            </motion.span>
          </motion.div>

          {/* Заголовок */}
          <motion.h1
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-pink-200 text-transparent bg-clip-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Подарки стали веселее с Gifty!
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p
            className="text-2xl mb-12 text-pink-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Создавайте волшебные моменты с нашей праздничной рулеткой подарков
          </motion.p>

          {/* Кнопка */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="/dashboard"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold inline-flex items-center hover:bg-pink-100 transition-colors"
            >
              <motion.span
                className="mr-2"
                animate={sparkleAnimation.animate}
                transition={sparkleAnimation.transition}
              >
                ✨
              </motion.span>
              Создать праздничную рулетку
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
