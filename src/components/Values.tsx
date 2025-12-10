import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const values = [
  { name: "Clarity", description: "Cutting through complexity to find elegant solutions" },
  { name: "Curiosity", description: "Never stopping the pursuit of understanding" },
  { name: "Precision", description: "Attention to detail in every line of code" },
  { name: "Adaptability", description: "Thriving in rapidly evolving landscapes" },
  { name: "Intentionality", description: "Purpose-driven decisions and actions" },
  { name: "Integrity", description: "Building trust through consistent action" }
];

const Values = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4 block">
            Core Values
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-shadow-deep">
            What Drives Me
          </h2>
        </motion.div>

        {/* Values grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.name}
              className="text-center p-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-3xl font-display font-bold text-foreground mb-3 text-shadow-subtle">
                {value.name}
              </h3>
              <p className="text-muted-foreground font-body">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;