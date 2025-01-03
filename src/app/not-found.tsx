'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const giftAnimation = {
    rotate: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    jump: {
      y: [0, -15, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const sparkleAnimation = {
    scale: [0.8, 1.2, 0.8],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-white flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 text-center relative"
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="text-9xl font-bold mb-8 relative inline-block"
          variants={itemAnimation}
        >
          <motion.div
            className="relative z-10 text-purple-600"
            animate={giftAnimation.rotate}
          >
            4
            <motion.span className="inline-block" animate={giftAnimation.jump}>
              🎁
            </motion.span>
            4
          </motion.div>
          <motion.div
            className="absolute -top-8 -right-8 text-4xl"
            animate={sparkleAnimation}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -left-8 text-4xl"
            animate={sparkleAnimation}
          >
            ✨
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold mb-6 text-purple-800"
          variants={itemAnimation}
        >
          Упс! Страница не найдена
        </motion.h1>

        <motion.p
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          variants={itemAnimation}
        >
          Похоже, подарок потерялся где-то по пути. Не волнуйтесь, у нас есть
          много других интересных страниц!
        </motion.p>

        <motion.div variants={itemAnimation}>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <span className="mr-2">🏠</span>
            Вернуться на главную
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
