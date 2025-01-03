'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isDocPage =
    ['/terms', '/privacy', '/cookies'].includes(pathname) ||
    !['/'].includes(pathname);

  const containerAnimation = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  };

  const itemAnimation = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.header
      className={`absolute w-full z-10 ${
        isDocPage ? 'bg-white/50 backdrop-blur-md shadow-sm' : ''
      }`}
      initial={containerAnimation.initial}
      animate={containerAnimation.animate}
      transition={containerAnimation.transition}
    >
      <nav className="container mx-auto px-4 py-6">
        <motion.div
          className="flex justify-between items-center"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={itemAnimation}>
            <Link
              href="/"
              className={`text-2xl font-bold flex items-center ${
                isDocPage ? 'text-purple-600' : 'text-white'
              }`}
            >
              <motion.span
                className="mr-2"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                🎁
              </motion.span>
              Gifty
            </Link>
          </motion.div>

          <motion.div className="space-x-6" variants={staggerChildren}>
            <motion.span variants={itemAnimation}>
              <Link
                href="/login"
                className={`hover:text-pink-200 transition-colors ${
                  isDocPage
                    ? 'text-purple-600 hover:text-purple-800'
                    : 'text-white'
                }`}
              >
                Войти
              </Link>
            </motion.span>

            <motion.span variants={itemAnimation}>
              <Link
                href="/register"
                className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  isDocPage
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-white text-purple-600 hover:bg-pink-100'
                }`}
              >
                Регистрация
              </Link>
            </motion.span>
          </motion.div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
