'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const Wheel = dynamic(
  () => import('react-custom-roulette').then((mod) => mod.Wheel),
  {
    ssr: false,
  }
);

export interface WheelSpinnerProps {
  items: Array<{
    id: number;
    text: string;
    color: string;
  }>;
  isDemo?: boolean;
  isSpinning?: boolean;
  onSpinStart?: () => Promise<void>;
  onSpinComplete?: (option: { id: string; text: string }) => Promise<void>;
  isGameMode?: boolean;
}

export default function WheelSpinner({
  items,
  isDemo = false,
  isSpinning = false,
  onSpinStart,
  onSpinComplete,
  isGameMode = false,
}: WheelSpinnerProps) {
  const [showWinModal, setShowWinModal] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [mustSpin, setMustSpin] = useState(false);

  const data = items.map((item) => ({
    option: isGameMode ? `#${items.indexOf(item) + 1}` : item.text,
    style: {
      backgroundColor: item.color,
      textColor: '#000000',
      fontFamily: 'Inter',
    },
  }));

  const handleSpinClick = async () => {
    if (mustSpin || isSpinning) return;
    setShowWinModal(false);

    if (onSpinStart) {
      await onSpinStart();
    }

    const newPrizeNumber = Math.floor(Math.random() * items.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleSpinComplete = () => {
    setMustSpin(false);
    if (isDemo) {
      setShowWinModal(true);
    }
    if (onSpinComplete) {
      onSpinComplete({
        id: String(items[prizeNumber].id),
        text: items[prizeNumber].text,
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        <Wheel
          mustStartSpinning={isDemo ? mustSpin : isSpinning}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleSpinComplete}
          spinDuration={0.8}
          startingOptionIndex={0}
          radiusLineWidth={1}
          radiusLineColor="#ddd"
          outerBorderWidth={2}
          outerBorderColor="#ddd"
          fontSize={14}
          textDistance={60}
          pointerProps={{
            src: '',
            style: { display: 'none' },
          }}
        />
        <div
          className="absolute -right-4 top-20 w-0 h-0 z-50"
          style={{
            borderLeft: '30px solid transparent',
            borderRight: '30px solid transparent',
            borderTop: '60px solid #ef4444',
            transform: 'rotate(45deg) translateX(-40px)',
          }}
        />
      </div>

      <button
        onClick={handleSpinClick}
        disabled={mustSpin || isSpinning}
        className={`mt-8 px-8 py-3 rounded-full font-semibold text-white transition-all ${
          mustSpin || isSpinning
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg hover:-translate-y-1'
        }`}
      >
        {mustSpin || isSpinning ? 'Крутится...' : 'Крутить'}
      </button>

      <AnimatePresence>
        {showWinModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50"
            onClick={() => setShowWinModal(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-purple-800 mb-4">
                  Поздравляем!
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Вы выиграли:{' '}
                  <span className="font-semibold">
                    {items[prizeNumber].text}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Это демо-версия рулетки. В личном кабинете вы сможете создать
                  свою рулетку с собственными призами и настройками!
                </p>
                <button
                  onClick={() => setShowWinModal(false)}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
