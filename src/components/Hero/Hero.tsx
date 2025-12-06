'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// =====================
// TITLES
// =====================

const heroTitles: string[] = [
  "I design systems that learn, evolve, and deliver meaningful impact.",
  "Where curiosity meets execution.",
  "Turning ideas into systems that learn.",
  "Solving problems at human scale and machine speed.",
  "Designing clarity in a noisy world.",
  "Thinking deeply. Building simply.",
  "Shaping technology with discipline and vision.",
  "Engineering what the future quietly demands."
];

// =====================
// COMPONENT
// =====================

const Hero: React.FC = () => {
  const [currentTitle, setCurrentTitle] = useState<string>(heroTitles[0]);
  const [titleIndex, setTitleIndex] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLDivElement>(null);

  // Smooth fade/scale on scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Rotate hero title every 12s
  useEffect(() => {
    const random = Math.floor(Math.random() * heroTitles.length);
    setCurrentTitle(heroTitles[random]);
    setTitleIndex(random);

    const interval = setInterval(() => {
      setTitleIndex(prev => {
        const next = (prev + 1) % heroTitles.length;
        setCurrentTitle(heroTitles[next]);
        return next;
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Mouse-tracking gradient glow
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden"
    >
      {/* LEFT ANIMATED ORB */}
      <motion.div
        style={{
          x: mousePosition.x,
          y: mousePosition.y
        }}
        className="pointer-events-none absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
        // Tailwind-safe gradient without deprecated classes
        aria-hidden
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.3), rgba(147,51,234,0.2))'
          }}
        />
      </motion.div>

      {/* RIGHT ANIMATED ORB */}
      <motion.div
        style={{
          x: -mousePosition.x,
          y: -mousePosition.y
        }}
        className="pointer-events-none absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
        aria-hidden
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.3), rgba(236,72,153,0.25))'
          }}
        />
      </motion.div>

      {/* HERO CONTENT */}
      <motion.div
        style={{ opacity, scale, y: translateY }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        {/* TITLE */}
        <div className="mb-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={titleIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="font-light leading-tight"
              style={{
                fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
                letterSpacing: '-0.03em'
              }}
            >
              {currentTitle}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* SUBTITLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-16 text-gray-400 font-light text-xl md:text-2xl flex flex-wrap gap-3 justify-center"
        >
          {['AI Engineer', 'Cloud Architect', 'Cybersecurity Specialist'].map((role, i) => (
            <React.Fragment key={role}>
              <span>{role}</span>
              {i < 2 && <span className="text-blue-500">·</span>}
            </React.Fragment>
          ))}
        </motion.div>

        {/* QUOTE BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10">
            <p className="relative text-gray-300 italic text-lg md:text-xl leading-relaxed font-light">
              “This website is a collaboration between me and the machines I work with.
              Because mastery today isn't about avoiding AI.
              It's about directing it with intention, taste, and vision.”
            </p>
          </div>
        </motion.div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {/* VIEW PROJECTS */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full text-lg font-medium shadow-lg"
            style={{
              background: 'linear-gradient(to right, rgb(59,130,246), rgb(147,51,234))'
            }}
          >
            View Projects →
          </motion.a>

          {/* CONTACT */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full border border-white/15 text-lg font-medium backdrop-blur-xl hover:bg-white/10 transition"
          >
            Get in Touch
          </motion.a>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-24 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="text-gray-500 text-sm tracking-[0.3em] uppercase"
          >
            Scroll
          </motion.div>

          <div className="w-px h-16 bg-linear-to-b from-gray-600 to-transparent mt-4"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
