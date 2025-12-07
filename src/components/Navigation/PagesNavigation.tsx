'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type NavigationPage = {
  id: string;
  title: string;
  description: string;
  href: string;
  gradient: string;
  iconColor: string;
};

type NavigationCardProps = {
  page: NavigationPage;
  index: number;
};

const navigationPages: NavigationPage[] = [
  {
    id: 'skills',
    title: 'Skills',
    description: 'The foundations that shape how I build, solve, and deliver.',
    href: '#skills',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))',
    iconColor: 'rgb(59, 130, 246)'
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Systems I have built and the problems they were designed to solve.',
    href: '#projects',
    gradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.15), rgba(219, 39, 119, 0.15))',
    iconColor: 'rgb(147, 51, 234)'
  },
  {
    id: 'experience',
    title: 'Experience',
    description: 'The journey through roles, teams, and evolving expertise.',
    href: '#experience',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15))',
    iconColor: 'rgb(16, 185, 129)'
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Thoughts on technology, markets, and building intelligent systems.',
    href: '#blog',
    gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(234, 179, 8, 0.15))',
    iconColor: 'rgb(249, 115, 22)'
  },
  {
    id: 'resume',
    title: 'Resume',
    description: 'Two perspectives: technical depth and strategic thinking.',
    href: '#contact',
    gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(244, 114, 182, 0.15))',
    iconColor: 'rgb(236, 72, 153)'
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Let us build something meaningful together.',
    href: '#contact',
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(59, 130, 246, 0.15))',
    iconColor: 'rgb(99, 102, 241)'
  }
];

const NavigationCard = ({ page, index }: NavigationCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{ perspective: '1000px' }}
    >
      <motion.a
        href={page.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.03, y: -8 }}
        whileTap={{ scale: 0.97 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }}
        style={{
          display: 'block',
          position: 'relative',
          padding: '3.5rem 3rem',
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '2rem',
          overflow: 'hidden',
          cursor: 'pointer',
          textDecoration: 'none',
          color: 'white',
          boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: page.gradient,
            filter: 'blur(40px)'
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '2rem',
            padding: '2px',
            background: `linear-gradient(135deg, ${page.iconColor}, transparent)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: page.iconColor,
            transformOrigin: 'left'
          }}
        />

        {isHovered && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
                x: 40,
                y: -40
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: page.iconColor,
                top: '50%',
                left: '20%'
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
                x: -40,
                y: -40
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.7 }}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: page.iconColor,
                top: '50%',
                right: '20%'
              }}
            />
          </>
        )}

        <div style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ scale: 1 }}
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '1rem',
              background: `linear-gradient(135deg, ${page.iconColor}22, ${page.iconColor}11)`,
              border: `1px solid ${page.iconColor}33`,
              marginBottom: '1.5rem'
            }}
          >
            <svg
              style={{ width: '1.75rem', height: '1.75rem', color: page.iconColor }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </motion.div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem'
              }}
            >
              <h3
                style={{
                  fontSize: '2.25rem',
                  fontWeight: '200',
                  letterSpacing: '-0.03em',
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                  background: 'linear-gradient(135deg, white, rgba(255, 255, 255, 0.7))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {page.title}
              </h3>

              <motion.div
                initial={{ x: 0, rotate: -45 }}
                animate={isHovered ? { x: 8, rotate: 0 } : { x: 0, rotate: -45 }}
                transition={{ duration: 0.4 }}
                style={{ color: page.iconColor }}
              >
                <svg style={{ width: '1.75rem', height: '1.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                height: '1px',
                background: `linear-gradient(90deg, ${page.iconColor}, transparent)`,
                transformOrigin: 'left',
                marginBottom: '0.5rem'
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0.7 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: '1.0625rem',
              color: 'rgb(156, 163, 175)',
              lineHeight: '1.7',
              fontWeight: '300'
            }}
          >
            {page.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: page.iconColor,
              fontSize: '0.875rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <span>Explore</span>
            <motion.svg
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ width: '1rem', height: '1rem' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.div>
        </div>
      </motion.a>
    </motion.div>
  );
};

const PagesNavigation = () => {
  const sectionRef = useRef<HTMLOptionElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-150px' });

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '14rem 2rem',
        backgroundColor: 'black',
        overflow: 'hidden'
      }}
    >
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15), transparent 70%)',
          filter: 'blur(100px)'
        }}
      />

      <div style={{ maxWidth: '85rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', marginBottom: '8rem' }}
        >
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              width: '8rem',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), rgba(147,51,234,0.6), transparent)',
              margin: '0 auto 3rem'
            }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: '200',
              letterSpacing: '-0.04em',
              color: 'white',
              fontFamily: 'SF Pro Display, -apple-system'
            }}
          >
            Explore Further
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgb(156, 163, 175)',
              maxWidth: '42rem',
              margin: '0 auto',
              fontWeight: '300'
            }}
          >
            Dive deeper into my work, thoughts, and the journey that shaped how I build.
          </motion.p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
            gap: '2rem',
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          {navigationPages.map((page, index) => (
            <NavigationCard key={page.id} page={page} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PagesNavigation;
