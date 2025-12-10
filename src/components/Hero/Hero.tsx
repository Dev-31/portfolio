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
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // FIXED: Reduced sensitivity for smoother parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 20, damping: 30, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 20, damping: 30, mass: 0.5 });

  // FIXED: Gentler parallax ranges
  const orb1X = useTransform(smoothMouseX, [-15, 15], [-30, 30]);
  const orb1Y = useTransform(smoothMouseY, [-15, 15], [-30, 30]);
  const orb2X = useTransform(smoothMouseX, [-15, 15], [30, -30]);
  const orb2Y = useTransform(smoothMouseY, [-15, 15], [30, -30]);

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
      // FIXED: Reduced range for smoother movement
      mouseX.set((clientX / innerWidth - 0.5) * 20);
      mouseY.set((clientY / innerHeight - 0.5) * 20);
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
        padding: '0 24px',
        paddingTop: '120px' // FIXED: Space for navigation
      }}
    >
      {/* FIXED: Simplified grid - no transform for better performance */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.3,
          pointerEvents: 'none'
        }}
      />

      {/* FIXED: More subtle floating orbs with GPU acceleration */}
      <motion.div 
        style={{ 
          x: orb1X,
          y: orb1Y,
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.18), transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          pointerEvents: 'none',
          willChange: 'transform'
        }}
      />
      
      <motion.div 
        style={{ 
          x: orb2X,
          y: orb2Y,
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18), transparent 70%)',
          filter: 'blur(90px)',
          borderRadius: '50%',
          pointerEvents: 'none',
          willChange: 'transform'
        }}
      />

      {/* FIXED: Fewer particles for better performance */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(59, 130, 246, 0.5)' : 'rgba(139, 92, 246, 0.5)',
            boxShadow: i % 2 === 0 
              ? '0 0 15px rgba(59, 130, 246, 0.8)' 
              : '0 0 15px rgba(139, 92, 246, 0.8)',
            left: `${15 + i * 15}%`,
            top: `${30 + (i % 2) * 30}%`,
            pointerEvents: 'none'
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.7, 0],
            scale: [0, 1.2, 0]
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div 
        style={{ opacity, scale, y }}
        className="relative z-10 w-full max-w-6xl mx-auto text-center"
      >
        {/* FIXED: Proper title sizing with safe area */}
        <div style={{ 
          marginBottom: '28px', 
          minHeight: '200px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '0 16px'
        }}>
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
                fontSize: 'clamp(32px, 6vw, 72px)', // FIXED: Smaller max size
                fontWeight: '600',
                letterSpacing: '-0.04em',
                lineHeight: '1.15',
                fontFamily: "'Space Grotesk', system-ui, -apple-system, sans-serif",
                background: 'linear-gradient(135deg, #ffffff 30%, rgba(255,255,255,0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                maxWidth: '950px',
                margin: '0 auto'
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
          transition={{ delay: 0.6, duration: 1 }}
          style={{ marginBottom: '48px' }}
        >
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '14px',
            fontSize: 'clamp(14px, 1.8vw, 18px)',
            color: 'rgba(156, 163, 175, 0.9)',
            fontWeight: '400',
            fontFamily: "'Inter', system-ui",
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
                    margin: '0 14px', 
                    color: 'rgba(59, 130, 246, 0.5)',
                    fontSize: '6px',
                    verticalAlign: 'middle'
                  }}>●</span>
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Quote card */}
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
          <motion.div
            whileHover={{ 
              scale: 1.01,
              transition: { duration: 0.3 }
            }}
            style={{
              position: 'relative',
              padding: 'clamp(32px, 5vw, 48px)',
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'saturate(180%) blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
            }}
          >
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
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
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
              fontFamily: "'Inter', system-ui",
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
              fontFamily: "'Inter', system-ui",
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              letterSpacing: '-0.01em'
            }}
          >
            Let's Connect
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
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