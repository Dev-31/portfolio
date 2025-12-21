import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const heroTitles = [
  "Engineer with vision. I build systems that learn, scale, and shape real impact.",
  "Thinker and builder crafting intelligent systems with purpose and precision.",
  "Curiosity fuels me. Logic guides me. Scalable intelligent systems are what I create.",
  "I design systems that learn, evolve, and deliver meaningful impact.",
  "Engineering clarity, shaping intelligence, building solutions that matter.",
  "Where logic meets imagination, I build systems that think and scale.",
  "I craft intelligent systems built on curiosity, reason, and real-world impact."
];

const Hero = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex(prev => (prev + 1) % heroTitles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('philosophy');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20 md:pt-20">
      {/* Gradient background for light mode visibility */}
      <div className="absolute inset-0 gradient-subtle" />
      
      {/* Radial glow behind content */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(var(--accent) / 0.08) 0%, transparent 60%)'
        }}
      />
      
      {/* Subtle grid background - increased opacity for visibility */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Name with cinematic shadow effect */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight text-shadow-deep">
            Dev Sopariwala
          </h1>
          {/* Shadow duplicate for depth */}
          <h1 
            className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight text-accent/10 blur-sm -z-10"
            style={{ transform: 'translate(6px, 6px)' }}
          >
            Dev Sopariwala
          </h1>
        </motion.div>

        {/* Dynamic rotating title with shadow */}
        <div className="h-24 md:h-20 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTitleIndex}
              className="relative"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg md:text-xl lg:text-2xl font-serif italic text-muted-foreground max-w-3xl mx-auto px-4 text-shadow-subtle">
                "{heroTitles[currentTitleIndex]}"
              </p>
              {/* Shadow layer */}
              <p 
                className="absolute inset-0 text-lg md:text-xl lg:text-2xl font-serif italic text-accent/5 blur-[2px] -z-10 px-4"
                style={{ transform: 'translate(4px, 4px)' }}
              >
                "{heroTitles[currentTitleIndex]}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-muted-foreground font-body text-sm md:text-base tracking-wide mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Exploring the intersection of AI, Cloud Systems, and Strategic Thinking
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="#journey"
            className="px-8 py-4 bg-foreground text-background font-display font-medium tracking-wide rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105"
          >
            Explore My Journey
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-border text-foreground font-display font-medium tracking-wide rounded-full hover:border-accent hover:text-accent transition-all duration-300"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator - positioned with more space */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.2 },
          y: { repeat: Infinity, duration: 2 }
        }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </section>
  );
};

export default Hero;
