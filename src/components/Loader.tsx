import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [phase, setPhase] = useState<'logo' | 'name' | 'tagline' | 'exit'>('logo');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('name'), 800),
      setTimeout(() => setPhase('tagline'), 2000),
      setTimeout(() => setPhase('exit'), 2800),
      setTimeout(onComplete, 3400),
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
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* DS Monogram Logo */}
            <motion.div
              className="relative w-20 h-20 md:w-24 md:h-24"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* D shape */}
                <motion.path
                  d="M 20 15 L 20 85 L 45 85 C 70 85 80 65 80 50 C 80 35 70 15 45 15 L 20 15"
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                {/* S shape overlay */}
                <motion.path
                  d="M 65 30 C 50 30 40 35 40 45 C 40 55 50 55 60 55 C 70 55 75 60 75 70 C 75 80 65 85 50 85"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                />
              </svg>
            </motion.div>

            {/* Name reveal - letter by letter */}
            {(phase === 'name' || phase === 'tagline') && (
              <div className="flex gap-[2px] md:gap-1 overflow-hidden">
                {nameLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.4,
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
            className="absolute top-8 left-8 w-12 h-12 border-l border-t border-border/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-border/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
