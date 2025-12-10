'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Terminal typing animation
  useEffect(() => {
    setIsMounted(true);
    const lines = [
      '> Initializing systems...',
      '> Loading AI frameworks... ✓',
      '> Connecting to cloud... ✓',
      '> Security protocols active... ✓',
      '> Building intelligent solutions...'
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setTerminalLines(prev => [...prev, lines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

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
        padding: '140px 24px 60px' // Fixed spacing for nav
      }}
    >
      {/* Ambient background grid */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          opacity: 0.4,
          pointerEvents: 'none'
        }}
      />

      {/* Subtle gradient orbs */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ 
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
      
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.2, 0.15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{ 
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent 70%)',
          filter: 'blur(90px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />

      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-5xl mx-auto"
      >
        {/* Main content container */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          
          {/* Name - One Line, Clear */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(48px, 8vw, 84px)',
              fontWeight: '600',
              letterSpacing: '-0.04em',
              lineHeight: '1.1',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              background: 'linear-gradient(135deg, #ffffff 40%, rgba(255,255,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px'
            }}
          >
            Dev Sopariwala
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(18px, 3vw, 28px)',
              fontWeight: '300',
              color: 'rgba(156, 163, 175, 0.9)',
              fontFamily: "'Inter', system-ui",
              letterSpacing: '-0.01em',
              marginBottom: '12px'
            }}
          >
            Building Intelligent Systems with Intention
          </motion.p>

          {/* Roles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ marginBottom: '56px' }}
          >
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '12px',
              fontSize: 'clamp(13px, 1.5vw, 16px)',
              color: 'rgba(156, 163, 175, 0.8)',
              fontWeight: '400',
              fontFamily: "'Inter', system-ui"
            }}>
              {["AI Engineer", "Cloud Architect", "Cybersecurity Specialist"].map((text, i) => (
                <motion.span
                  key={text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.6 + i * 0.1, 
                    duration: 0.5
                  }}
                  style={{
                    padding: '6px 16px',
                    background: 'rgba(59, 130, 246, 0.08)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '20px'
                  }}
                >
                  {text}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Terminal Window - The Creative Feature */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              maxWidth: '700px',
              margin: '0 auto 48px',
              padding: '0 20px'
            }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.01,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 100px rgba(59, 130, 246, 0.2)'
              }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'rgba(10, 10, 10, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.1) inset'
              }}
            >
              {/* Terminal Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28ca42' }} />
                </div>
                <span style={{
                  fontSize: '12px',
                  color: 'rgba(156, 163, 175, 0.7)',
                  fontFamily: 'monospace',
                  marginLeft: '12px'
                }}>
                  ~/dev-sopariwala
                </span>
              </div>

              {/* Terminal Content */}
              <div style={{
                padding: '20px',
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '1.8',
                minHeight: '180px'
              }}>
                <AnimatePresence>
                  {terminalLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        color: line.includes('✓') ? '#28ca42' : '#3b82f6',
                        marginBottom: '8px'
                      }}
                    >
                      {line}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Blinking cursor */}
                {terminalLines.length > 0 && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '16px',
                      background: '#3b82f6',
                      marginLeft: '4px',
                      verticalAlign: 'middle'
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* GLOWING Quote Card - Fixed with proper glow */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              maxWidth: '750px',
              margin: '0 auto 56px',
              padding: '0 20px'
            }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 80px rgba(59, 130, 246, 0.4), 0 0 120px rgba(139, 92, 246, 0.3)'
              }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'relative',
                padding: 'clamp(32px, 4vw, 44px)',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '24px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Animated gradient border */}
              <motion.div
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5))',
                    'linear-gradient(225deg, rgba(139, 92, 246, 0.5), rgba(59, 130, 246, 0.5))',
                    'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5))'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: '24px',
                  padding: '2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0.6,
                  pointerEvents: 'none'
                }}
              />

              <blockquote style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                lineHeight: '1.75',
                color: 'rgba(229, 231, 235, 0.95)',
                fontWeight: '300',
                fontStyle: 'italic',
                fontFamily: 'Georgia, serif',
                position: 'relative',
                margin: 0,
                textAlign: 'center'
              }}>
                "This website is a collaboration between me and the machines I work with. Because mastery today isn't about avoiding AI—it's about directing it with intention, taste, and vision."
              </blockquote>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
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
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{
                padding: '16px 40px',
                background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '500',
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: "'Inter', system-ui",
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              View Work
              <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{
                padding: '16px 40px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '500',
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: "'Inter', system-ui"
              }}
            >
              Let's Connect
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            style={{ marginTop: '80px' }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: '1px',
                height: '50px',
                background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.6), transparent)',
                margin: '0 auto'
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;