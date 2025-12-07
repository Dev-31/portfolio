import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.85]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      <div style={{ 
        maxWidth: '90rem', 
        margin: '0 auto', 
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <motion.a
          href="/"
          style={{ scale: logoScale, opacity: logoOpacity }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group"
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '2.75rem',
                height: '2.75rem',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                className="group-hover:opacity-100"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.3s'
                }}
              />
              
              <svg 
                style={{ width: '1.5rem', height: '1.5rem', color: 'rgb(59, 130, 246)', position: 'relative', zIndex: 10 }} 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
              <motion.div
                style={{
                  fontSize: '1.375rem',
                  fontWeight: '600',
                  letterSpacing: '-0.02em',
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                  background: 'linear-gradient(135deg, white, rgba(255, 255, 255, 0.7))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  position: 'relative'
                }}
              >
                Dev Sopariwala
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    bottom: '-0.25rem',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, rgb(59, 130, 246), rgb(147, 51, 234))',
                    transformOrigin: 'left'
                  }}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: '0.625rem',
                  color: 'rgb(156, 163, 175)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  fontFamily: 'SF Pro Text, -apple-system, sans-serif'
                }}
              >
                AI Engineer
              </motion.div>
            </div>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '3rem' }}>
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              whileHover={{ y: -2 }}
              className="hover-link"
              style={{
                fontSize: '0.9375rem',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                position: 'relative',
                fontFamily: 'SF Pro Text, -apple-system, sans-serif',
                transition: 'color 0.3s'
              }}
            >
              {link.label}

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: '-0.5rem',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, rgb(59, 130, 246), rgb(147, 51, 234))',
                  borderRadius: '2px'
                }}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block"
          style={{
            padding: '0.75rem 1.75rem',
            background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234))',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'white',
            textDecoration: 'none',
            fontFamily: 'SF Pro Text, -apple-system, sans-serif',
            boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.5)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <span style={{ position: 'relative', zIndex: 10 }}>Let's Talk</span>

          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              transform: 'skewX(-20deg)'
            }}
          />
        </motion.a>

        {/* Burger menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
          style={{
            padding: '0.5rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'block'
          }}
        >
          <div style={{ width: '1.5rem', height: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'white',
                borderRadius: '2px',
                transition: 'all 0.3s'
              }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'white',
                borderRadius: '2px',
                transition: 'all 0.3s'
              }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'white',
                borderRadius: '2px',
                transition: 'all 0.3s'
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '1.5rem 2rem',
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)'
          }}
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'block',
                padding: '1rem 0',
                fontSize: '1.125rem',
                fontWeight: '400',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'SF Pro Text, -apple-system, sans-serif',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {link.label}
            </motion.a>
          ))}
          
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: 'block',
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234))',
              borderRadius: '0.75rem',
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: '500',
              color: 'white',
              textDecoration: 'none',
              fontFamily: 'SF Pro Text, -apple-system, sans-serif'
            }}
          >
            Let's Talk
          </motion.a>
        </motion.div>
      )}

      <style jsx>{`
        .hover-link:hover {
          color: white;
        }
        .group-hover\\:opacity-100:hover {
          opacity: 1;
        }

        @media (min-width: 768px) {
          .md\\:flex { display: flex !important; }
          .md\\:block { display: block !important; }
          .md\\:hidden { display: none !important; }
        }

        .hidden { display: none; }
      `}</style>
    </motion.nav>
  );
}
