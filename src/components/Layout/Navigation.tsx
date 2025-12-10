'use client';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
        transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      <div style={{
        maxWidth: '90rem',
        margin: '0 auto',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo - Fixed: Removed nested motion.a inside motion.a */}
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <motion.div
            style={{ scale: logoScale }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Geometric animated logo */}
              <motion.div
                style={{
                  width: '48px',
                  height: '48px',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                {/* Outer rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '50%',
                    borderTopColor: 'rgb(59, 130, 246)',
                    borderRightColor: 'rgb(139, 92, 246)'
                  }}
                />
                
                {/* Middle pulsing circle */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    inset: '6px',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)',
                    borderRadius: '50%'
                  }}
                />
                
                {/* Center initials */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: 'white',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  letterSpacing: '-0.05em'
                }}>
                  DS
                </div>
                
                {/* Inner dot accent */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '4px',
                    height: '4px',
                    background: 'rgb(59, 130, 246)',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgb(59, 130, 246)'
                  }}
                />
              </motion.div>

              {/* Name and tagline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '500',
                    color: 'white',
                    letterSpacing: '-0.02em',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    position: 'relative'
                  }}
                >
                  Dev Sopariwala
                </div>
                
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    fontSize: '11px',
                    color: 'rgb(156, 163, 175)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: '500',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                  }}
                >
                  Building with Intention
                </motion.div>
              </div>
            </div>
          </motion.div>
        </a>

        {/* Navigation links - Desktop */}
        <div style={{ display: 'none' }} className="md:flex md:items-center md:gap-12">
          {[
            { label: 'Story', href: '#story' },
            { label: 'Work', href: '#projects' },
            { label: 'Thoughts', href: '#blog' },
            { label: 'Connect', href: '#contact' }
          ].map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.6 }}
              whileHover={{ y: -2 }}
              style={{
                fontSize: '15px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                position: 'relative',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                transition: 'color 0.3s'
              }}
              className="nav-link"
            >
              {item.label}
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, rgb(59, 130, 246), rgb(139, 92, 246))',
                  transformOrigin: 'left',
                  borderRadius: '2px'
                }}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'none',
            padding: '12px 28px',
            background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            color: 'white',
            textDecoration: 'none',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="md:block"
        >
          <span style={{ position: 'relative', zIndex: 10 }}>Let's Build</span>
          
          {/* Shimmer */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
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
      </div>

      <style jsx>{`
        .nav-link:hover {
          color: white;
        }
        @media (min-width: 768px) {
          .md\\:flex {
            display: flex !important;
          }
          .md\\:items-center {
            align-items: center !important;
          }
          .md\\:gap-12 {
            gap: 3rem !important;
          }
          .md\\:block {
            display: block !important;
          }
        }
      `}</style>
    </motion.nav>
  );
}