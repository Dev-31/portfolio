'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const heroTitles = [
  'I design systems that learn, evolve, and deliver meaningful impact.',
  'Where curiosity meets execution.',
  'Turning ideas into systems that learn.',
  'Solving problems at human scale and machine speed.',
  'Designing clarity in a noisy world.',
  'Thinking deeply. Building simply.',
  'Shaping technology with discipline and vision.',
  'Engineering what the future quietly demands.'
];

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState(heroTitles[0]);
  const [titleIndex, setTitleIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  // Randomized title on load + gentle cycling
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroTitles.length);
    setTitleIndex(randomIndex);
    setCurrentTitle(heroTitles[randomIndex]);

    const interval = setInterval(() => {
      setTitleIndex(prev => {
        const next = (prev + 1) % heroTitles.length;
        setCurrentTitle(heroTitles[next]);
        return next;
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Interactive cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center"
    >

      {/* Left orb */}
      <motion.div
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.35), rgba(147,51,234,0.25))',
          filter: 'blur(110px)',
          position: 'absolute',
          top: '25%',
          left: '-25%',
          borderRadius: '50%',
          opacity: 0.9
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Right orb */}
      <motion.div
        style={{
          x: -mousePosition.x,
          y: -mousePosition.y,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(147,51,234,0.35), rgba(236,72,153,0.25))',
          filter: 'blur(110px)',
          position: 'absolute',
          bottom: '25%',
          right: '-25%',
          borderRadius: '50%',
          opacity: 0.9
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1.5 }}
      />

      {/* Main container */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >

        {/* Title */}
        <div className="mb-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={titleIndex}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -120, opacity: 0 }}
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="font-light"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
                textShadow: '0 0 100px rgba(255,255,255,0.1)'
              }}
            >
              {currentTitle}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-16"
        >
          <div
            className="flex flex-wrap justify-center gap-3"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              color: 'rgb(156,163,175)',
              fontWeight: 300
            }}
          >
            {['AI Engineer', 'Cloud Architect', 'Cybersecurity Specialist'].map(
              (text, i) => (
                <motion.span
                  key={text}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.1, duration: 0.5 }}
                >
                  {text}
                  {i < 2 && (
                    <span
                      style={{
                        margin: '0 0.6rem',
                        color: 'rgb(59,130,246)'
                      }}
                    >
                      ·
                    </span>
                  )}
                </motion.span>
              )
            )}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div
            style={{
              position: 'relative',
              padding: '2.5rem',
              backdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(255,255,255,0.025)',
              borderRadius: '1.5rem',
              border: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            <blockquote
              style={{
                position: 'relative',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: 1.7,
                color: 'rgb(209,213,219)',
                fontWeight: 300,
                fontStyle: 'italic'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '-0.6rem',
                  left: '-0.6rem',
                  fontSize: '2rem',
                  color: 'rgba(59,130,246,0.35)'
                }}
              >
                "
              </span>
              This website is a collaboration between me and the machines I work
              with. Because mastery today isn't about avoiding AI. It's about
              directing it with intention, taste, and vision.
              <span
                style={{
                  position: 'absolute',
                  bottom: '-1.2rem',
                  right: '-0.5rem',
                  fontSize: '2rem',
                  color: 'rgba(59,130,246,0.35)'
                }}
              >
                "
              </span>
            </blockquote>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="text-white"
            style={{
              padding: '1.2rem 3rem',
              borderRadius: '9999px',
              background:
                'linear-gradient(to right, rgb(59,130,246), rgb(147,51,234))',
              fontWeight: 500,
              fontSize: '1.125rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 20px 40px -10px rgba(59,130,246,0.25)'
            }}
          >
            View Projects
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: '1.2rem 3rem',
              borderRadius: '9999px',
              backdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              fontWeight: 500,
              fontSize: '1.125rem',
              color: 'white'
            }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-28 flex flex-col items-center"
        >
          <motion.div
            style={{
              width: '2px',
              height: '5rem',
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)'
            }}
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
