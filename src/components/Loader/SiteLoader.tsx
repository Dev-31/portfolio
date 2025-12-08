'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SiteLoaderProps = {
  onLoadComplete?: () => void
}

export default function SiteLoader({ onLoadComplete }: SiteLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            if (onLoadComplete) onLoadComplete();
          }, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Animated background grid */}
          <motion.div
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              transform: 'perspective(500px) rotateX(60deg)',
              transformOrigin: 'center center'
            }}
          />

          {/* Rotating rings */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10 - i * 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  position: 'absolute',
                  width: 300 + i * 100 + 'px',
                  height: 300 + i * 100 + 'px',
                  border: '1px solid',
                  borderColor: 'rgba(59, 130, 246, ' + (0.1 - i * 0.03) + ')',
                  borderRadius: '50%',
                  borderTopColor: 'rgba(59, 130, 246, ' + (0.4 - i * 0.1) + ')',
                  borderRightColor:
                    'rgba(139, 92, 246, ' + (0.4 - i * 0.1) + ')'
                }}
              />
            ))}
          </div>

          {/* Central logo container */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            {/* Main logo circle */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '180px',
                height: '180px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Outer glow ring */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  inset: -20,
                  background:
                    'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent 70%)',
                  filter: 'blur(30px)',
                  borderRadius: '50%'
                }}
              />

              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '3px solid transparent',
                  borderTopColor: 'rgb(59, 130, 246)',
                  borderRightColor: 'rgb(139, 92, 246)',
                  borderRadius: '50%'
                }}
              />

              {/* Inner circle background */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  position: 'absolute',
                  inset: 20,
                  background:
                    'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                  borderRadius: '50%',
                  backdropFilter: 'blur(10px)'
                }}
              />

              {/* DS initials */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{
                  fontSize: '64px',
                  fontWeight: '700',
                  color: 'white',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  letterSpacing: '-0.05em',
                  position: 'relative',
                  zIndex: 10,
                  textShadow: '0 0 40px rgba(59, 130, 246, 0.8)'
                }}
              >
                DS
              </motion.div>

              {/* Orbiting particles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.5
                  }}
                  style={{
                    position: 'absolute',
                    inset: -10,
                    transformOrigin: 'center'
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.25
                    }}
                    style={{
                      width: '8px',
                      height: '8px',
                      background: 'rgb(59, 130, 246)',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      boxShadow: '0 0 20px rgb(59, 130, 246)'
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Name reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              style={{
                marginTop: '48px',
                textAlign: 'center'
              }}
            >
              <motion.h1
                style={{
                  fontSize: '48px',
                  fontWeight: '600',
                  color: 'white',
                  letterSpacing: '-0.03em',
                  marginBottom: '12px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                Dev Sopariwala
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                style={{
                  height: '2px',
                  width: '120px',
                  background:
                    'linear-gradient(90deg, rgb(59, 130, 246), rgb(139, 92, 246))',
                  margin: '0 auto 16px',
                  transformOrigin: 'center'
                }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{
                  fontSize: '14px',
                  color: 'rgb(156, 163, 175)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                Building with Intention
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              style={{
                marginTop: '60px',
                width: '300px',
                margin: '60px auto 0'
              }}
            >
              <div
                style={{
                  height: '2px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: progress + '%' }}
                  style={{
                    height: '100%',
                    background:
                      'linear-gradient(90deg, rgb(59, 130, 246), rgb(139, 92, 246))',
                    position: 'relative'
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100px',
                      height: '100%',
                      background:
                        'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)'
                    }}
                  />
                </motion.div>
              </div>

              <motion.div
                style={{
                  marginTop: '12px',
                  textAlign: 'center',
                  fontSize: '13px',
                  color: 'rgb(156, 163, 175)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  letterSpacing: '0.05em'
                }}
              >
                {progress}%
              </motion.div>
            </motion.div>
          </div>

          {/* Exit animation scan lines */}
          {progress === 100 && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 0 percent, rgba(59, 130, 246, 0.1) 50 percent, transparent 100 percent)',
                transformOrigin: 'top'
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
