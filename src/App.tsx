import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

const FLOATING_TEXTS = [
  "miss Thùy ", "i love you", "nhớ Thùy  lắm", "yêu Thùy ", "my everything", "Thùy ❤️ đạt ", "miss u", "thương T"
];

// Link ảnh thật của T mà bạn đã thay
const T_IMAGE_URL = "https://i.postimg.cc/wv1j3x0q/Thiet-ke-chua-co-ten-(6).png";

const FloatingWord = ({ text, delay }: { text: string, delay: number }) => {
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;

  return (
    <motion.div
      className="absolute text-pink-100/70 font-bold text-2xl md:text-4xl whitespace-nowrap pointer-events-none select-none font-cursive drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
      style={{ left: `${startX}%`, top: `${startY}%` }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1.2, 1, 0.5],
        x: [0, Math.random() * 300 - 150, Math.random() * 300 - 150],
        y: [0, Math.random() * 300 - 150, Math.random() * 300 - 150],
      }}
      transition={{
        duration: 10 + Math.random() * 10,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
    >
      {text}
    </motion.div>
  );
};

// Component tạo hạt lấp lánh (Blink Blink)
const SparkleDot = ({ delay }: { delay: number }) => {
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  const size = Math.random() * 4 + 2;

  return (
    <motion.div
      className="absolute bg-white rounded-full pointer-events-none"
      style={{ 
        left: `${startX}%`, 
        top: `${startY}%`, 
        width: size, 
        height: size,
        boxShadow: '0 0 12px 3px rgba(255, 255, 255, 0.9)'
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
      transition={{
        duration: 1.5 + Math.random() * 2,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );
};

export default function App() {
  const [showButton, setShowButton] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [words, setWords] = useState<{id: number, text: string, delay: number}[]>([]);
  const [sparkles, setSparkles] = useState<{id: number, delay: number}[]>([]);

  useEffect(() => {
    // Tạo chữ bay
    const generatedWords = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      text: FLOATING_TEXTS[Math.floor(Math.random() * FLOATING_TEXTS.length)],
      delay: Math.random() * 10
    }));
    setWords(generatedWords);

    // Tạo hạt lấp lánh
    const generatedSparkles = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 5
    }));
    setSparkles(generatedSparkles);

    // Hẹn giờ 5 giây
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-red-500 overflow-hidden flex items-center justify-center font-sans">
      {/* Hiệu ứng lấp lánh (Blink Blink) */}
      {sparkles.map((s) => (
        <SparkleDot key={`sparkle-${s.id}`} delay={s.delay} />
      ))}

      {/* Chữ bay lơ lửng */}
      {words.map((w) => (
        <FloatingWord key={`word-${w.id}`} text={w.text} delay={w.delay} />
      ))}

      <AnimatePresence mode="wait">
        {!revealed && showButton && (
          <motion.div
            key="button-container"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, y: -50 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="z-10 flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            >
              <Heart className="w-32 h-32 text-white fill-white drop-shadow-[0_0_50px_rgba(255,255,255,1)]" />
            </motion.div>
            
            <button
              onClick={() => setRevealed(true)}
              className="relative px-10 py-4 bg-white text-rose-500 rounded-full font-bold text-2xl shadow-[0_0_40px_rgba(255,255,255,0.8)] hover:scale-110 hover:shadow-[0_0_80px_rgba(255,255,255,1)] transition-all active:scale-95 cursor-pointer overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                <Sparkles className="w-6 h-6 animate-pulse text-rose-400" />
                Bấm vào đây nhé ❤️
                <Sparkles className="w-6 h-6 animate-pulse text-rose-400" />
              </span>
              {/* Hiệu ứng ánh sáng lướt qua nút */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
          </motion.div>
        )}

        {revealed && (
          <motion.div
            key="reveal-container"
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="z-20 flex flex-col items-center bg-white/20 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-[0_0_50px_rgba(255,255,255,0.4)] border border-white/50 max-w-md w-[90%]"
          >
            <motion.div
              initial={{ opacity: 0, rotate: -10, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
              className="relative w-56 h-56 md:w-72 md:h-72 mb-8 rounded-full overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.9)] border-8 border-white group"
            >
              <img
                src={T_IMAGE_URL}
                alt="My Love"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Ánh sáng lướt qua ảnh */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 animate-[shimmer_2.5s_infinite]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-5xl md:text-6xl font-extrabold text-white text-center mb-4 font-cursive"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.7)' }}
            >
              i love you T
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="relative mt-4 px-8 py-3 bg-white/30 rounded-full backdrop-blur-sm border border-white/60 shadow-[0_0_30px_rgba(255,255,255,0.6)] overflow-hidden"
            >
              <p className="relative z-10 text-2xl md:text-3xl text-white font-bold tracking-wider font-cursive drop-shadow-md">
                From TTĐ
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </motion.div>
            
            {/* Trái tim bay lên xung quanh ảnh */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-white/90 pointer-events-none"
                initial={{ 
                  opacity: 0, 
                  x: Math.random() * 400 - 200, 
                  y: 100,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  y: -500,
                  x: Math.random() * 400 - 200,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 3 + Math.random() * 3, 
                  repeat: Infinity, 
                  delay: Math.random() * 2 
                }}
              >
                <Heart className="w-10 h-10 fill-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
