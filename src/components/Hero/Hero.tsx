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
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // ENHANCED: Smooth mouse tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  // Parallax layers with different speeds
  const parallaxLayer1 = useTransform(smoothMouseX, [-30, 30], [-80, 80]);
  const parallaxLayer2 = useTransform(smoothMouseX, [-30, 30], [-40, 40]);
  const parallaxLayer3 = useTransform(smoothMouseX, [-30, 30], [-20, 20]);
  const parallaxLayerY1 = useTransform(smoothMouseY, [-30, 30], [-80, 80]);
  const parallaxLayerY2 = useTransform(smoothMouseY, [-30, 30], [-40, 40]);
  const parallaxLayerY3 = useTransform(smoothMouseY, [-30, 30], [-20, 20]);

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
      mouseX.set((clientX / innerWidth - 0.5) * 40);
      mouseY.set((clientY / innerHeight - 0.5) * 40);
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
      {/* ENHANCED: Animated grid with depth and parallax */}
      <motion.div 
        style={{
          x: parallaxLayer3,
          y: parallaxLayerY3,
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: 'perspective(800px) rotateX(60deg) scale(2)',
          transformOrigin: 'center bottom',
          opacity: 0.4
        }}
      />

      {/* NEW: Floating code snippets in background */}
      <motion.div
        style={{
          x: parallaxLayer1,
          y: parallaxLayerY1,
          position: 'absolute',
          top: '15%',
          left: '5%',
          opacity: 0.08,
          filter: 'blur(1px)',
          fontSize: '14px',
          fontFamily: 'monospace',
          color: '#3b82f6',
          lineHeight: 1.8,
          pointerEvents: 'none'
        }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <pre>{`const buildSystem = (idea) => {
  return {
    ai: 'Claude',
    cloud: 'AWS',
    security: 'First'
  };
};`}</pre>
      </motion.div>

      <motion.div
        style={{
          x: parallaxLayer2,
          y: parallaxLayerY2,
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          opacity: 0.08,
          filter: 'blur(1px)',
          fontSize: '14px',
          fontFamily: 'monospace',
          color: '#8b5cf6',
          lineHeight: 1.8,
          pointerEvents: 'none'
        }}
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <pre>{`async function deploy() {
  await scale();
  await secure();
  return impact;
}`}</pre>
      </motion.div>

      {/* ENHANCED: Floating gradient orbs with STRONG parallax */}
      <motion.div 
        style={{ 
          x: parallaxLayer1,
          y: parallaxLayerY1,
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25), transparent 70%)',
          filter: 'blur(90px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.4, 0.25]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        style={{ 
          x: parallaxLayer2,
          y: parallaxLayerY2,
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25), transparent 70%)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.35, 0.25]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* NEW: Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(139, 92, 246, 0.4)',
            boxShadow: i % 2 === 0 
              ? '0 0 20px rgba(59, 130, 246, 0.6)' 
              : '0 0 20px rgba(139, 92, 246, 0.6)',
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`,
            pointerEvents: 'none'
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div 
        style={{ opacity, scale, y }}
        className="relative z-10 w-full max-w-6xl mx-auto text-center"
      >
        {/* ENHANCED: Hero Title with better crossfade */}
        <div style={{ marginBottom: '32px', minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={titleIndex}
              initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -80, filter: 'blur(12px)' }}
              transition={{ 
                duration: 1.4, 
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                fontSize: 'clamp(40px, 7.5vw, 90px)',
                fontWeight: '600',
                letterSpacing: '-0.05em',
                lineHeight: '1.1',
                fontFamily: "'Space Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                background: 'linear-gradient(135deg, #ffffff 20%, rgba(255,255,255,0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '0 20px',
                textShadow: '0 0 80px rgba(59, 130, 246, 0.3)'
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
          transition={{ delay: 0.8, duration: 1.2 }}
          style={{ marginBottom: '56px' }}
        >
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '16px',
            fontSize: 'clamp(15px, 2vw, 19px)',
            color: 'rgba(156, 163, 175, 0.95)',
            fontWeight: '400',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            letterSpacing: '0.01em'
          }}>
            {["AI Engineer", "Cloud Architect", "Cybersecurity Specialist"].map((text, i) => (
              <motion.span
                key={text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1 + i * 0.15, 
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {text}
                {i < 2 && (
                  <span style={{ 
                    margin: '0 16px', 
                    color: 'rgba(59, 130, 246, 0.5)',
                    fontSize: '8px',
                    verticalAlign: 'middle'
                  }}>●</span>
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ENHANCED: Quote card with better depth */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.4, 
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{ 
            maxWidth: '820px', 
            margin: '0 auto 64px',
            padding: '0 20px'
          }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 100px rgba(59, 130, 246, 0.15)'
            }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'relative',
              padding: 'clamp(36px, 5vw, 52px)',
              background: 'rgba(255, 255, 255, 0.025)',
              backdropFilter: 'saturate(180%) blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '28px',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Gradient border on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'absolute',
                inset: -1,
                borderRadius: '28px',
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none'
              }}
            />
            
            <blockquote style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              lineHeight: '1.8',
              color: 'rgba(229, 231, 235, 0.95)',
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

        {/* ENHANCED: CTA Buttons with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.7, 
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{
            display: 'flex',
            flexDirection: isMounted && typeof window !== 'undefined' && window.innerWidth < 640 ? 'column' : 'row',
            gap: '18px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              padding: '18px 44px',
              background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))',
              borderRadius: '14px',
              fontSize: '17px',
              fontWeight: '500',
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              overflow: 'hidden',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              letterSpacing: '-0.01em'
            }}
          >
            <span style={{ position: 'relative', zIndex: 10 }}>View Work</span>
            <motion.svg
              style={{ width: '18px', height: '18px', position: 'relative', zIndex: 10 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
            
            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                transform: 'skewX(-20deg)',
                pointerEvents: 'none'
              }}
            />
          </motion.a>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06, y: -3, borderColor: 'rgba(59, 130, 246, 0.5)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '18px 44px',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '14px',
              fontSize: '17px',
              fontWeight: '500',
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              letterSpacing: '-0.01em'
            }}
          >
            Let's Connect
          </motion.a>
        </motion.div>

        {/* ENHANCED: Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1.2 }}
          style={{ marginTop: '100px' }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: '1px',
              height: '60px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent)',
              margin: '0 auto',
              position: 'relative'
            }}
          >
            <motion.div
              animate={{ 
                scaleY: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '2px',
                height: '20px',
                background: 'rgb(59, 130, 246)',
                boxShadow: '0 0 10px rgb(59, 130, 246)',
                borderRadius: '2px'
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;