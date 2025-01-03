'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
    <motion.footer
      className="bg-purple-900 text-white py-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerAnimation}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerAnimation}
        >
          {/* О нас */}
          <motion.div className="space-y-4" variants={itemAnimation}>
            <Link
              href="/"
              className="text-2xl font-bold flex items-center mb-6"
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
            <p className="text-purple-200 text-sm">
              Создавайте уникальные моменты радости с помощью нашей праздничной
              рулетки подарков
            </p>
          </motion.div>

          {/* Документы */}
          <motion.div variants={itemAnimation}>
            <h3 className="text-lg font-semibold mb-4">Документы</h3>
            <ul className="space-y-2">
              {['terms', 'privacy', 'cookies'].map((link, index) => (
                <motion.li
                  key={link}
                  variants={itemAnimation}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href={`/${link}`}
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    {link === 'terms' && 'Пользовательское соглашение'}
                    {link === 'privacy' && 'Политика конфиденциальности'}
                    {link === 'cookies' && 'Использование cookies'}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Контакты */}
          <motion.div variants={itemAnimation}>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2">
              {[
                { href: 'https://vk.com', text: 'VK' },
                { href: 'https://t.me', text: 'Telegram' },
                { href: 'mailto:support@gifty.ru', text: 'support@gifty.ru' },
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  variants={itemAnimation}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="text-purple-200 hover:text-white transition-colors flex items-center"
                  >
                    <span className="mr-2">{link.text}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Нижняя часть футера */}
        <motion.div
          className="border-t border-purple-800 mt-12 pt-8"
          variants={itemAnimation}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200 text-sm mb-4 md:mb-0">
              © {currentYear} Gifty. Все права защищены.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
