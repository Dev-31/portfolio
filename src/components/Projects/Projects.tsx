'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: "Cryptocurrency Hedging Bot",
    category: "Quantitative Finance / Automation",
    description: "Automated hedging system monitoring real-time crypto portfolio exposure across multiple exchanges. Implements delta-neutral strategies with integrated risk analytics and Telegram notifications.",
    tags: ["Python", "Risk Management", "API Integration", "Telegram Bot"],
    github: "https://github.com/Dev-31/Hedging-Bot",
    featured: true
  },
  {
    title: "DDoS Intrusion Detection System",
    category: "Cybersecurity / Deep Learning",
    description: "Deep learning-based IDS using CNN, RNN, and LSTM architectures on the UNSW-NB15 dataset. Achieves high accuracy in detecting distributed denial-of-service attacks through behavioral pattern analysis.",
    tags: ["Python", "TensorFlow", "Deep Learning", "Network Security"],
    github: "https://github.com/Dev-31/Intrusion-Detection-System-for-DDoS-Attack-using-Deep-Learning",
    featured: true
  },
  {
    title: "DVWA Kubernetes Lab",
    category: "DevOps / Security Testing",
    description: "Kubernetes-deployed Damn Vulnerable Web Application environment for security testing and training. Provides containerized, scalable infrastructure for penetration testing practice.",
    tags: ["Kubernetes", "Docker", "Security", "DevOps"],
    github: "https://github.com/Dev-31/DVWA-k8s-lab",
    featured: false
  },
  {
    title: "WatchdogAI",
    category: "AI / Monitoring",
    description: "AI-powered monitoring and alerting system designed to track system metrics and anomalies. Implements intelligent detection patterns for proactive issue identification.",
    tags: ["Python", "AI", "Monitoring", "Automation"],
    github: "https://github.com/Dev-31/WatchdogAI",
    featured: false
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-40 px-6 bg-black relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-tight">
            Selected Work
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Building systems that solve real problems at the intersection of AI, security, and infrastructure.
          </p>
        </motion.div>
        
        <div className="space-y-6">
          {projects.map((project, idx) => (
            <motion.a
              key={idx}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="block group"
            >
              <div className="relative bg-zinc-950/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-10 hover:border-blue-500/50 transition-all duration-500 hover:bg-zinc-900/50">
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex-1">
                    <div className="mb-3">
                      <span className="text-sm text-blue-400 font-medium tracking-wide uppercase">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-light mb-4 group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-lg text-gray-400 leading-relaxed mb-6 max-w-3xl">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIdx) => (
                        <span 
                          key={tagIdx} 
                          className="px-4 py-2 bg-zinc-800/50 text-sm text-gray-300 rounded-lg border border-zinc-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-end">
                    <div className="flex items-center gap-2 text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm font-medium">View Project</span>
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}