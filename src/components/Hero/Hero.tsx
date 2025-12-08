'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import heroTitles from './hero-titles.json';

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

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
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 2);
      mouseY.set((clientY / innerHeight - 0.5) * 2);
      
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 40,
        y: (clientY / innerHeight - 0.5) * 40
      });
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
        background: 'black',
        color: 'white',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Dynamic 3D grid background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.08) 2px, transparent 2px), linear-gradient(90deg, rgba(59, 130, 246, 0.08) 2px, transparent 2px)',
          backgroundSize: '80px 80px',
          transform: 'perspective(1000px) rotateX(60deg) scale(2)',
          transformOrigin: 'center bottom',
          opacity: 0.4
        }}
        animate={{
          backgroundPosition: ['0px 0px', '80px 80px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating orbs with parallax */}
      <motion.div 
        style={{ 
          x: useTransform(smoothMouseX, [-1, 1], [-100, 100]),
          y: useTransform(smoothMouseY, [-1, 1], [-100, 100]),
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25), transparent 70%)',
          filter: 'blur(100px)',
          borderRadius: '50%'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <motion.div 
        style={{ 
          x: useTransform(smoothMouseX, [-1, 1], [100, -100]),
          y: useTransform(smoothMouseY, [-1, 1], [100, -100]),
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25), transparent 70%)',
          filter: 'blur(120px)',
          borderRadius: '50%'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      {/* Particle system */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: i % 2 === 0 ? 'rgb(59, 130, 246)' : 'rgb(139, 92, 246)',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            boxShadow: '0 0 20px currentColor'
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div 
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        {/* Animated title with letter reveal */}
        <div style={{ marginBottom: '40px', overflow: 'hidden' }}>
          <motion.div
            key={titleIndex}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              duration: 1, 
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              fontSize: 'clamp(48px, 12vw, 140px)',
              fontWeight: '700',
              letterSpacing: '-0.05em',
              lineHeight: 0.95,
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 80px rgba(255,255,255,0.1)',
              position: 'relative'
            }}
          >
            {currentTitle}
            
            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '10%',
                right: '10%',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, rgb(59, 130, 246), rgb(139, 92, 246), transparent)',
                transformOrigin: 'center'
              }}
            />
          </motion.div>
        </div>

        {/* Animated subtitle with stagger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ marginBottom: '60px' }}
        >
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '20px',
            fontSize: 'clamp(16px, 3vw, 24px)',
            color: 'rgb(156, 163, 175)',
            fontWeight: '400',
            fontFamily: 'SF Pro Text, -apple-system, sans-serif'
          }}>
            {["AI Engineer", "Cloud Architect", "Cybersecurity Specialist"].map((text, i) => (
              <motion.span
                key={text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.8 }}
                style={{
                  position: 'relative',
                  padding: '8px 0'
                }}
              >
                {text}
                {i < 2 && (
                  <span style={{ 
                    margin: '0 20px', 
                    color: 'rgb(59, 130, 246)',
                    fontSize: '8px',
                    verticalAlign: 'middle'
                  }}>●</span>
                )}
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, rgb(59, 130, 246), rgb(139, 92, 246))',
                    transformOrigin: 'left'
                  }}
                />
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Quote with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ maxWidth: '900px', margin: '0 auto 80px' }}
        >
          <div style={{
            position: 'relative',
            padding: '48px',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '32px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}>
            {/* Accent gradient border */}
            <div style={{
              position: 'absolute',
              inset: 0,
              padding: '2px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
              borderRadius: '32px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: 0.5
            }} />

            <blockquote style={{
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              lineHeight: 1.8,
              color: 'rgb(209, 213, 219)',
              fontWeight: '300',
              fontStyle: 'italic',
              fontFamily: 'SF Pro Text, -apple-system, sans-serif',
              position: 'relative'
            }}>
              <span style={{ fontSize: '48px', color: 'rgba(59, 130, 246, 0.3)', position: 'absolute', top: '-20px', left: '-10px' }}>"</span>
              This website is a collaboration between me and the machines I work with.
              Because mastery today isn't about avoiding AI.
              It's about directing it with intention, taste, and vision.
              <span style={{ fontSize: '48px', color: 'rgba(59, 130, 246, 0.3)', position: 'absolute', bottom: '-40px', right: '-10px' }}>"</span>
            </blockquote>
          </div>
        </motion.div>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          style={{
            display: 'flex',
            flexDirection: isMounted && window.innerWidth < 640 ? 'column' : 'row',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'relative',
              padding: '20px 48px',
              background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              textDecoration: 'none',
              fontFamily: 'SF Pro Text, -apple-system, sans-serif',
              boxShadow: '0 20px 60px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span style={{ position: 'relative', zIndex: 10 }}>View Work</span>
            <motion.svg
              style={{ width: '20px', height: '20px', position: 'relative', zIndex: 10 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              whileHover={{ x: 4 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
            
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                transform: 'skewX(-20deg)'
              }}
            />
          </motion.a>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '20px 48px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              textDecoration: 'none',
              fontFamily: 'SF Pro Text, -apple-system, sans-serif',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s'
            }}
          >
            Let's Connect
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ marginTop: '120px' }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: '2px',
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
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8px',
                height: '8px',
                background: 'rgb(59, 130, 246)',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgb(59, 130, 246)'
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;