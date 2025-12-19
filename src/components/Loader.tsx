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
      setTimeout(() => setPhase('tagline'), 1800),
      setTimeout(() => setPhase('exit'), 2500),
      setTimeout(onComplete, 3200),
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
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* DS Monogram Logo - Bold unified design */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <svg 
                width="120" 
                height="60" 
                viewBox="0 0 120 60" 
                className="text-foreground"
              >
                {/* D letter - Clean, separate */}
                <motion.path
                  d="M 10 10 L 10 50 L 28 50 C 45 50, 52 38, 52 30 C 52 22, 45 10, 28 10 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                {/* S letter - Clean, separate, positioned to the right */}
                <motion.path
                  d="M 100 16 C 92 8, 72 10, 72 20 C 72 30, 100 28, 100 40 C 100 52, 78 54, 68 46"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                />
              </svg>
              
              {/* Glow effect with pulse */}
              <motion.div
                className="absolute inset-0 blur-xl rounded-full"
                style={{ background: 'hsl(var(--accent) / 0.25)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 0.6, 0.4], 
                  scale: [0.8, 1.1, 1] 
                }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              />
            </motion.div>

            {/* Name - letter by letter reveal */}
            {(phase === 'name' || phase === 'tagline') && (
              <div className="flex gap-1 md:gap-2 overflow-hidden">
                {nameLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground"
                    initial={{ y: 40, opacity: 0 }}
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
                className="text-muted-foreground font-body text-sm md:text-base tracking-widest uppercase"
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
            className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-border/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-border/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
