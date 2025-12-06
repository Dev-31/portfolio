'use client';

import { motion } from 'framer-motion';

const values = [
  {
    title: "Transparent AI Collaboration",
    description: "I build with AI openly, treating it as a tool that amplifies human judgment rather than replaces it."
  },
  {
    title: "Depth Over Breadth",
    description: "Master the fundamentals deeply. Surface-level knowledge creates fragile systems."
  },
  {
    title: "Solve Real Problems",
    description: "Technology for its own sake is just expensive art. Build what people actually need."
  },
  {
    title: "Clear Communication",
    description: "The best solution is worthless if stakeholders can't understand why it matters."
  },
  {
    title: "Security by Design",
    description: "Security isn't a feature you add later—it's a foundation you build on from day one."
  },
  {
    title: "Continuous Learning",
    description: "The field evolves daily. Staying still means falling behind."
  }
];

export default function Values() {
  return (
    <section id="values" className="py-32 px-6 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-light mb-16 text-center"
        >
          Values
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-800 rounded-lg p-6 bg-[#0a0a0a] hover:border-blue-500 transition-colors"
            >
              <h3 className="text-lg font-medium mb-3 text-blue-400">{value.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}