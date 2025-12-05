import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const heroTitles = [
  "I build intelligence with intention.",
  "Where curiosity meets execution.",
  "Turning ideas into systems that learn.",
  "Solving problems at human scale and machine speed.",
  "Designing clarity in a noisy world.",
  "Thinking deeply. Building simply.",
  "Shaping technology with discipline and vision.",
  "Engineering what the future quietly demands."
];

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    // Random title on mount
    const randomIndex = Math.floor(Math.random() * heroTitles.length);
    setCurrentTitle(heroTitles[randomIndex]);
    setTitleIndex(randomIndex);

    // Auto-cycle every 12 seconds
    const interval = setInterval(() => {
      setTitleIndex((prev) => {
        const next = (prev + 1) % heroTitles.length;
        setCurrentTitle(heroTitles[next]);
        return next;
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20 opacity-50" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Rotating Hero Title */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={titleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
          >
            {currentTitle}
          </motion.h1>
        </AnimatePresence>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 font-light"
        >
          AI Engineer. Cloud Architect. Cybersecurity Specialist.
        </motion.p>

        {/* Signature Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-2xl mx-auto mb-12 border-l-2 border-blue-500/50 pl-6 text-left"
        >
          <p className="text-gray-300 italic leading-relaxed">
            "This website is a collaboration between me and the machines I work with.
            Because mastery today isn't about avoiding AI.
            It's about directing it with intention, taste, and vision."
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-200"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-transparent border border-gray-600 hover:border-gray-400 rounded-lg font-medium transition-colors duration-200"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20"
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full mx-auto relative">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full absolute left-1/2 top-2 -translate-x-1/2"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;