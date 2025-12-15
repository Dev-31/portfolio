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
            {/* DS Monogram Logo */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <svg 
                width="80" 
                height="80" 
                viewBox="0 0 80 80" 
                className="text-foreground"
              >
                {/* D letter */}
                <motion.path
                  d="M15 15 L15 65 L35 65 C50 65 60 55 60 40 C60 25 50 15 35 15 L15 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                {/* S letter - overlapping */}
                <motion.path
                  d="M55 25 C55 25 65 25 65 35 C65 42 58 45 50 47 C42 49 35 52 35 60 C35 68 45 70 55 70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                />
              </svg>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-xl bg-accent/20 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0.3] }}
                transition={{ duration: 1, delay: 0.5 }}
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
