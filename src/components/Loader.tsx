import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [phase, setPhase] = useState<'logo' | 'name' | 'tagline' | 'exit'>('logo');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('name'), 1000),
      setTimeout(() => setPhase('tagline'), 2200),
      setTimeout(() => setPhase('exit'), 3000),
      setTimeout(onComplete, 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const nameLetters = "DEV SOPARIWALA".split('');

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.02]">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="loader-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#loader-grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Bold DS Monogram */}
            <motion.div
              className="relative w-28 h-28 md:w-36 md:h-36"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Bold D shape */}
                <motion.path
                  d="M 25 15 L 25 85 L 50 85 C 78 85 88 65 88 50 C 88 35 78 15 50 15 L 25 15"
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                />
                {/* Bold S shape integrated */}
                <motion.path
                  d="M 70 32 C 55 28 42 32 42 44 C 42 56 58 54 66 58 C 74 62 76 72 66 78 C 56 84 42 80 38 74"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                />
              </svg>
              
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, delay: 0.8, repeat: Infinity }}
                style={{
                  background: 'radial-gradient(circle, hsl(var(--accent) / 0.2) 0%, transparent 70%)',
                }}
              />
            </motion.div>

            {/* Name reveal - letter by letter */}
            {(phase === 'name' || phase === 'tagline') && (
              <div className="flex gap-[2px] md:gap-1 overflow-hidden">
                {nameLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-2xl md:text-4xl lg:text-5xl font-display font-extrabold text-foreground"
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.04,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Tagline */}
            {phase === 'tagline' && (
              <motion.p
                className="text-muted-foreground font-body text-sm md:text-base tracking-[0.2em] uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                Built with intention
              </motion.p>
            )}
          </div>

          {/* Decorative corner elements */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-border/40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-border/40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
