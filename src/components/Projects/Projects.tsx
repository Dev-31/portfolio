'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: "Crypto Hedging & Risk Management System",
    category: "AI / Fintech",
    description: "Automated delta-neutral hedging bot monitoring real-time exposure across multiple exchanges with integrated risk analytics.",
    tags: ["Python", "Quantitative Finance", "Telegram Bot", "Risk Management"],
    metrics: ["80% reduction in manual intervention", "Sub-second execution latency", "15% improved risk-adjusted returns"],
    github: "https://github.com/Dev-31/crypto-hedging-bot"
  },
  {
    title: "AI-Powered Chatbot with RAG Architecture",
    category: "AI / Cloud",
    description: "GenAI chatbot integrating Amazon Lex, Bedrock foundation models, and S3 documents using Retrieval-Augmented Generation.",
    tags: ["AWS", "Bedrock", "RAG", "Lex", "JavaScript"],
    metrics: ["96% intent classification accuracy", "<500ms average response time", "Deployed on AWS free tier"],
    github: "https://github.com/Dev-31/aws-rag-chatbot"
  },
  {
    title: "DDoS Intrusion Detection System",
    category: "Cybersecurity / ML",
    description: "Deep learning-based IDS using CNN, RNN, and LSTM on UNSW-NB15 dataset achieving 96.97% detection accuracy.",
    tags: ["Deep Learning", "Cybersecurity", "Python", "TensorFlow"],
    metrics: ["96.97% detection accuracy", "15% improvement with balancing", "2.1% false positive rate"],
    github: "https://github.com/Dev-31/ddos-ids"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-light mb-16 text-center"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-800 rounded-lg p-6 bg-[#0f0f0f] hover:border-blue-500 transition-colors group"
            >
              <div className="mb-4">
                <span className="text-xs text-blue-400 font-medium">{project.category}</span>
                <h3 className="text-xl font-light mt-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
              </div>

              <p className="text-sm text-gray-400 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="px-2 py-1 bg-gray-800 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-1 mb-4">
                {project.metrics.map((metric, metricIdx) => (
                  <p key={metricIdx} className="text-xs text-gray-500">
                    • {metric}
                  </p>
                ))}
              </div>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
                >
                  View on GitHub →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
