'use client';

import { motion } from 'framer-motion';

const skillsData = [
  {
    category: "AI & Machine Learning",
    skills: [
      { name: "Generative AI (AWS Bedrock, Claude)", evidence: "Built production RAG chatbot" },
      { name: "Deep Learning (CNN, RNN, LSTM)", evidence: "96.97% accuracy DDoS detection" },
      { name: "TensorFlow & PyTorch", evidence: "Multiple deployed models" },
      { name: "Agentic AI Systems", evidence: "Automated decision-making workflows" }
    ]
  },
  {
    category: "Cloud & Infrastructure",
    skills: [
      { name: "AWS (EC2, S3, Lambda, Bedrock)", evidence: "Serverless production deployments" },
      { name: "Cloud Architecture", evidence: "Scalable, fault-tolerant systems" },
      { name: "Docker & Containerization", evidence: "Automated deployment pipelines" },
      { name: "Infrastructure as Code", evidence: "Reproducible cloud environments" }
    ]
  },
  {
    category: "Cybersecurity",
    skills: [
      { name: "Network Security", evidence: "Intrusion detection systems" },
      { name: "Cryptography", evidence: "Secure data transmission protocols" },
      { name: "Threat Analysis", evidence: "Real-time attack pattern recognition" },
      { name: "Security Audits", evidence: "Vulnerability assessment projects" }
    ]
  },
  {
    category: "Development & Tools",
    skills: [
      { name: "Python, Java, C++", evidence: "Production-grade applications" },
      { name: "SQL & Database Design", evidence: "Optimized query performance" },
      { name: "Git & CI/CD", evidence: "Automated testing pipelines" },
      { name: "Linux System Administration", evidence: "Server management" }
    ]
  },
  {
    category: "Marketing & Product",
    skills: [
      { name: "SEO & Content Strategy", evidence: "Improved organic traffic by 40%" },
      { name: "Google Analytics & Data Analysis", evidence: "Data-driven campaign optimization" },
      { name: "Email Marketing Automation", evidence: "Designed conversion-focused flows" },
      { name: "Market Analysis", evidence: "Competitive positioning research" }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-light mb-16 text-center"
        >
          Skills
        </motion.h2>
        
        <div className="space-y-12">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-800 rounded-lg p-8 bg-[#0a0a0a]"
            >
              <h3 className="text-2xl font-light mb-6 text-blue-400">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-100">{skill.name}</p>
                      <p className="text-sm text-gray-400">{skill.evidence}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}