import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Philosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="philosophy" className="min-h-screen flex items-center justify-center px-6 py-24">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Section label */}
          <span className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-8 block">
            AI Philosophy
          </span>

          {/* Main quote with dramatic shadow */}
          <div className="relative">
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-foreground text-shadow-glow">
              <span className="text-accent text-6xl md:text-7xl font-display absolute -left-4 md:-left-8 -top-4 opacity-20">"</span>
              This website is a collaboration between me and the machines I work with. 
              <span className="block mt-4 text-accent">
                Because mastery today isn't about avoiding AI.
              </span>
              <span className="block mt-2">
                It's about directing it with{' '}
                <span className="relative inline-block">
                  intention
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent/50" />
                </span>
                ,{' '}
                <span className="relative inline-block">
                  taste
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent/50" />
                </span>
                , and{' '}
                <span className="relative inline-block">
                  vision
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent/50" />
                </span>
                .
              </span>
              <span className="text-accent text-6xl md:text-7xl font-display absolute -right-4 md:-right-8 bottom-0 opacity-20">"</span>
            </blockquote>

            {/* Shadow effect */}
            <div 
              className="absolute inset-0 text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-accent/5 blur-md -z-10"
              style={{ transform: 'translate(6px, 6px)' }}
            >
              This website is a collaboration between me and the machines I work with.
            </div>
          </div>

          {/* Attribution */}
          <motion.p
            className="mt-12 text-muted-foreground font-body text-sm tracking-wide"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            — Dev Sopariwala
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;