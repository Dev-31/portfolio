'use client';
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function StorySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const paragraphs = [
    "I didn't start with answers. I started with questions.",
    
    "In 2021, I entered Christ University not knowing exactly what I was building toward, only that I wanted to understand how systems work—technical systems, market systems, human systems. The kind of questions that don't fit neatly into a single discipline.",
    
    "By 2022, I was volunteering, leading early teams, trying to figure out where curiosity meets execution. A year later, I co-founded the Entrepreneurship & Innovation Club, not because I had it all figured out, but because I wanted to create a space where ideas could collide with reality.",
    
    "That's when things started clicking. AI wasn't just a tool—it was a collaborator. Cloud architecture wasn't just infrastructure—it was possibility. Cybersecurity wasn't just defense—it was strategic thinking. Marketing wasn't separate from engineering—it was the language that made technology matter.",
    
    "I built systems. Risk management bots. Intrusion detection models. Monitoring tools. But I also started paying attention to why businesses succeed or fail, how markets move, what makes a solution valuable beyond its code.",
    
    "This website is a collaboration between me and the machines I work with. Because mastery today isn't about avoiding AI. It's about directing it with intention, taste, and vision. I don't hide the fact that AI amplifies what I do. I'm transparent about it because pretending otherwise misses the point.",
    
    "I'm drawn to problems that sit at intersections—technical depth meets strategic clarity, systems thinking meets market reality. I build tools that work, but I'm equally interested in understanding why they need to exist in the first place.",
    
    "Currently based in Bangalore, I work at the edge of AI, cloud infrastructure, and security. I write about markets and technology. I analyze what's changing and what stays the same. I build systems that solve real problems, and I think carefully about what problems are worth solving.",
    
    "The questions are still there. But now, I know how to build the answers."
  ];

  return (
    <section
      ref={sectionRef}
      id="story"
      style={{
        position: 'relative',
        padding: '200px 32px',
        background: 'black',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background */}
      <motion.div
        style={{ y }}
        className="ambient-bg"
      >
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08), transparent)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }} />
      </motion.div>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '80px'
          }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, rgb(59, 130, 246), rgb(139, 92, 246))',
              transformOrigin: 'left'
            }}
          />
          <span style={{
            fontSize: '13px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgb(156, 163, 175)',
            fontWeight: '500',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            The Story
          </span>
        </motion.div>

        {/* Story content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {paragraphs.map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{
                fontSize: index === 0 ? '32px' : index === paragraphs.length - 1 ? '28px' : '20px',
                lineHeight: index === 0 ? 1.3 : 1.7,
                color: index === 0 || index === paragraphs.length - 1 ? 'white' : 'rgb(209, 213, 219)',
                fontWeight: index === 0 || index === paragraphs.length - 1 ? '400' : '300',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                letterSpacing: '-0.01em',
                position: 'relative',
                paddingLeft: index === 5 ? '40px' : '0',
                fontStyle: index === 5 ? 'italic' : 'normal'
              }}
            >
              {/* Quote indicator for the AI philosophy paragraph */}
              {index === 5 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    background: 'linear-gradient(180deg, rgb(59, 130, 246), rgb(139, 92, 246))',
                    transformOrigin: 'top',
                    borderRadius: '2px'
                  }}
                />
              )}
              
              {text}
              
              {/* Emphasis on last paragraph */}
              {index === paragraphs.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
                  style={{
                    marginTop: '20px',
                    width: '100px',
                    height: '2px',
                    background: 'linear-gradient(90deg, rgb(59, 130, 246), transparent)',
                    transformOrigin: 'left'
                  }}
                />
              )}
            </motion.p>
          ))}
        </div>

        {/* Timeline markers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 1 }}
          style={{
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '40px 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          {['2021', '2022', '2023', '2024', 'Now'].map((year, i) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2 + i * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: i === 4 ? 'rgb(59, 130, 246)' : 'rgba(255, 255, 255, 0.2)',
                boxShadow: i === 4 ? '0 0 20px rgb(59, 130, 246)' : 'none'
              }} />
              <span style={{
                fontSize: '13px',
                color: i === 4 ? 'rgb(59, 130, 246)' : 'rgb(156, 163, 175)',
                fontWeight: '500',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                {year}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}