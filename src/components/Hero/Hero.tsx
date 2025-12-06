'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroTitles from './hero-titles.json';

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroTitles.length);
    setCurrentTitle(heroTitles[randomIndex]);
    setTitleIndex(randomIndex);

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
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Ambient gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Rotating Hero Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={titleIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-10 leading-tight"
            >
              {currentTitle}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-2xl md:text-3xl text-gray-400 mb-16 font-light tracking-wide"
          >
            AI Engineer · Cloud Architect · Cybersecurity Specialist
          </motion.p>

          {/* Signature Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500" />
              <blockquote className="pl-8 text-lg md:text-xl text-gray-300 italic leading-relaxed font-light">
                "This website is a collaboration between me and the machines I work with.
                Because mastery today isn't about avoiding AI.
                It's about directing it with intention, taste, and vision."
              </blockquote>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a
              href="#projects"
              className="group relative px-10 py-5 bg-white text-black rounded-full font-medium text-lg overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#contact"
              className="px-10 py-5 border-2 border-white/20 rounded-full font-medium text-lg hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-32"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm text-gray-500 uppercase tracking-widest">Scroll</span>
              <div className="w-6 h-10 border-2 border-gray-600 rounded-full relative">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full absolute left-1/2 top-2 -translate-x-1/2"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;