'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import heroTitles from './hero-titles.json';

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Smooth mouse tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      mouseX.set((clientX / innerWidth - 0.5) * 30);
      mouseY.set((clientY / innerHeight - 0.5) * 30);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={heroRef} 
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#000000',
        color: '#ffffff',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px'
      }}
    >
      {/* Animated grid with depth */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.06) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        transform: 'perspective(800px) rotateX(60deg) scale(2)',
        transformOrigin: 'center bottom',
        opacity: 0.3
      }} />

      {/* Floating gradient orbs with parallax */}
      <motion.div 
        style={{ 
          x: useTransform(smoothMouseX, [-30, 30], [-60, 60]),
          y: useTransform(smoothMouseY, [-30, 30], [-60, 60]),
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
      
      <motion.div 
        style={{ 
          x: useTransform(smoothMouseX, [-30, 30], [60, -60]),
          y: useTransform(smoothMouseY, [-30, 30], [60, -60]),
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)',
          filter: 'blur(90px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />

      <motion.div 
        style={{ opacity, scale, y }}
        className="relative z-10 w-full max-w-6xl mx-auto text-center"
      >
        {/* Hero Title - Perfect sizing */}
        <div style={{ marginBottom: '32px', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={titleIndex}
              initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -60, filter: 'blur(10px)' }}
              transition={{ 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                fontSize: 'clamp(36px, 7vw, 84px)',
                fontWeight: '600',
                letterSpacing: '-0.04em',
                lineHeight: '1.1',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                background: 'linear-gradient(135deg, #ffffff 30%, rgba(255,255,255,0.5) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                maxWidth: '1000px',
                margin: '0 auto',
                padding: '0 20px'
              }}
            >
              {currentTitle}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle with proper spacing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{ marginBottom: '48px' }}
        >
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '16px',
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: 'rgba(156, 163, 175, 0.9)',
            fontWeight: '400',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.01em'
          }}>
            {["AI Engineer", "Cloud Architect", "Cybersecurity Specialist"].map((text, i) => (
              <motion.span
                key={text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.8 + i * 0.1, 
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {text}
                {i < 2 && (
                  <span style={{ 
                    margin: '0 16px', 
                    color: 'rgba(59, 130, 246, 0.5)',
                    fontSize: '6px',
                    verticalAlign: 'middle'
                  }}>●</span>
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Quote card with perfect typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.1, 
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{ 
            maxWidth: '780px', 
            margin: '0 auto 56px',
            padding: '0 20px'
          }}
        >
          <div style={{
            position: 'relative',
            padding: 'clamp(32px, 5vw, 48px)',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'saturate(180%) blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <blockquote style={{
              fontSize: 'clamp(15px, 2vw, 19px)',
              lineHeight: '1.7',
              color: 'rgba(229, 231, 235, 0.9)',
              fontWeight: '300',
              fontStyle: 'italic',
              fontFamily: 'Georgia, "Times New Roman", serif',
              position: 'relative',
              margin: 0
            }}>
              This website is a collaboration between me and the machines I work with.
              Because mastery today isn't about avoiding AI.
              It's about directing it with intention, taste, and vision.
            </blockquote>
          </div>
        </motion.div>

        {/* CTA Buttons with smooth hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.4, 
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{
            display: 'flex',
            flexDirection: isMounted && typeof window !== 'undefined' && window.innerWidth < 640 ? 'column' : 'row',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              padding: '16px 40px',
              background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '500',
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              boxShadow: '0 4px 24px rgba(59, 130, 246, 0.3)',
              overflow: 'hidden',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '-0.01em'
            }}
          >
            <span>View Work</span>
            <motion.svg
              style={{ width: '18px', height: '18px' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '16px 40px',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '500',
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              letterSpacing: '-0.01em'
            }}
          >
            Let's Connect
          </motion.a>
        </motion.div>

        {/* Minimal scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={{ marginTop: '80px' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: '1px',
              height: '48px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4), transparent)',
              margin: '0 auto'
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;