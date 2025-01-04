'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CallToAction() {
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textAnimation = {
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

  const buttonAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const decorationAnimation = {
    hidden: { opacity: 0, scale: 0 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
        delay: 0.4,
      },
    },
  };

  return (
    <motion.section
      className="relative py-20 bg-gradient-to-r from-purple-600 to-pink-500 text-white overflow-hidden"
      variants={containerAnimation}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Декоративные элементы */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        variants={decorationAnimation}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
        variants={decorationAnimation}
      />

      <div className="container relative mx-auto px-4 text-center">
        <motion.h2 className="text-4xl font-bold mb-8" variants={textAnimation}>
          Готовы создать праздник?
        </motion.h2>
        <motion.div variants={buttonAnimation}>
          <Link
            href="/dashboard"
            className="group bg-white text-purple-600 px-8 py-4 rounded-full font-semibold inline-flex items-center hover:bg-pink-100 transition-all"
          >
            <motion.span
              className="mr-2"
              animate={{
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              ✨
            </motion.span>
            <span>Начать бесплатно</span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
