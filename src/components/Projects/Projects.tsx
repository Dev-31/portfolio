'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const projects = [
  {
    title: "Cryptocurrency Hedging Bot",
    category: "Quantitative Finance",
    description:
      "Automated hedging system monitoring real-time crypto portfolio exposure across multiple exchanges. Implements delta-neutral strategies with integrated risk analytics and Telegram notifications.",
    tags: ["Python", "Risk Management", "API Integration", "Automation"],
    github: "https://github.com/Dev-31/Hedging-Bot",
    accentColor: { r: 59, g: 130, b: 246 }
  },
  {
    title: "DDoS Intrusion Detection System",
    category: "Cybersecurity",
    description:
      "Deep learning-based IDS using CNN, RNN, and LSTM architectures on the UNSW-NB15 dataset. Achieves high accuracy in detecting distributed denial-of-service attacks through behavioral pattern analysis.",
    tags: ["Python", "TensorFlow", "Deep Learning", "Network Security"],
    github:
      "https://github.com/Dev-31/Intrusion-Detection-System-for-DDoS-Attack-using-Deep-Learning",
    accentColor: { r: 147, g: 51, b: 234 }
  },
  {
    title: "DVWA Kubernetes Lab",
    category: "DevOps & Security",
    description:
      "Kubernetes-deployed Damn Vulnerable Web Application environment for security testing and training. Provides containerized, scalable infrastructure for penetration testing practice.",
    tags: ["Kubernetes", "Docker", "Security", "Infrastructure"],
    github: "https://github.com/Dev-31/DVWA-k8s-lab",
    accentColor: { r: 16, g: 185, b: 129 }
  },
  {
    title: "WatchdogAI",
    category: "AI Monitoring",
    description:
      "AI-powered monitoring and alerting system designed to track system metrics and anomalies. Implements intelligent detection patterns for proactive issue identification.",
    tags: ["Python", "AI", "Monitoring", "Automation"],
    github: "https://github.com/Dev-31/WatchdogAI",
    accentColor: { r: 249, g: 115, b: 22 }
  }
];

const ProjectCard = ({ project, index }: any) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const { r, g, b } = project.accentColor;

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <motion.a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03, y: -10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group block relative"
      >
        <div
          style={{
            position: 'relative',
            backdropFilter: 'blur(28px)',
            background: `rgba(0,0,0,0.65)`,
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            boxShadow: `0 25px 50px -12px rgba(0,0,0,0.35)`,
            overflow: 'hidden',
            transition: 'all 0.5s'
          }}
        >
          {/* Glow orb */}
          <div
            className="group-hover:opacity-30"
            style={{
              position: 'absolute',
              right: '-5rem',
              top: '-5rem',
              width: '15rem',
              height: '15rem',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.25), transparent)`,
              filter: 'blur(60px)',
              opacity: 0,
              transition: 'opacity 0.6s'
            }}
          />

          <div style={{ position: 'relative', zIndex: 10 }}>
            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <span
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  backdropFilter: 'blur(18px)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: `rgb(${r}, ${g}, ${b})`
                }}
              >
                {project.category}
              </span>

              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(16px)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: `rgb(${r}, ${g}, ${b})`
                }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3
              className="group-hover:translate-x-2 transition-transform"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 300,
                marginBottom: '1rem'
              }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: '1.125rem',
                color: 'rgb(156,163,175)',
                lineHeight: 1.7,
                marginBottom: '2rem',
                fontWeight: 300
              }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map((tag: string, tagIndex: number) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: index * 0.2 + tagIndex * 0.1,
                    duration: 0.4
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem',
                    backdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgb(209,213,219)',
                    transition: 'all 0.3s'
                  }}
                  className="hover:bg-white/10"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* CTA */}
            <div
              className="group-hover:gap-3 transition-all"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: `rgb(${r}, ${g}, ${b})`, fontWeight: 500 }}
            >
              View Project
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-black px-6 py-40 overflow-hidden"
    >
      {/* Background gradients */}
      <div
        className="absolute rounded-full blur-[150px]"
        style={{
          top: 0,
          left: '25%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent)'
        }}
      />
      <div
        className="absolute rounded-full blur-[150px]"
        style={{
          bottom: 0,
          right: '25%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(147,51,234,0.1), transparent)'
        }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="mx-auto mb-6 h-[2px] w-24"
            style={{
              background: 'linear-gradient(to right, rgb(59,130,246), rgb(147,51,234))'
            }}
          />

          <h2
            style={{
              fontSize: 'clamp(3.75rem, 8vw, 6rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(to right, white, rgb(107,114,128))',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Selected Work
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-gray-400 text-xl font-light leading-relaxed">
            Building systems that solve real problems at the intersection of AI, security, and infrastructure.
          </p>
        </motion.div>

        {/* Project list */}
        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
