'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface NotificationProps {
  type: 'success' | 'error';
  message: string | null;
  show: boolean;
}

export default function Notification({
  type,
  message,
  show,
}: NotificationProps) {
  return (
    <AnimatePresence mode="wait">
      {show && message && (
        <motion.div
          key="notification"
          className={`${
            type === 'success'
              ? 'bg-green-100 border-green-400 text-green-700'
              : 'bg-red-100 border-red-400 text-red-700'
          } px-4 py-3 rounded mb-6 border overflow-hidden`}
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 500,
              damping: 30,
            },
          }}
          exit={{
            opacity: 0,
            y: -10,
            transition: {
              duration: 0.2,
            },
          }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.1, duration: 0.2 },
            }}
            exit={{ opacity: 0 }}
          >
            {message}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
