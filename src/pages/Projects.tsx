import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  github: string;
  type: string;
}

const projects: Project[] = [
  {
    id: "hedging-bot",
    title: "Risk Management & Hedging Bot",
    tagline: "Automated crypto hedging with real-time risk analytics",
    description: "A working prototype of an automated risk management system that monitors real-time spot positions and dynamically hedges directional exposure using perpetual futures or options. Integrates with live cryptocurrency exchange APIs (OKX, Bybit, Deribit) and provides Telegram-based interactive control.",
    tags: ["Python", "Quantitative Finance", "Telegram Bot", "API Integration", "Risk Analytics"],
    github: "https://github.com/Dev-31/Hedging-Bot",
    type: "Quantitative Finance"
  },
  {
    id: "ddos-ids",
    title: "DDoS Detection IDS",
    tagline: "Deep Learning-based Intrusion Detection System",
    description: "A Deep Learning-based Intrusion Detection System to detect and classify DDoS attacks using the UNSW-NB15 dataset. Achieved up to 96.97% accuracy using CNN, RNN, and LSTM models. Enhanced performance by 15% through SMOTE and ADASYN balancing techniques.",
    tags: ["Deep Learning", "CNN", "RNN", "LSTM", "Cybersecurity", "Python"],
    github: "https://github.com/Dev-31/Intrusion-Detection-System-for-DDoS-Attack-using-Deep-Learning",
    type: "Cybersecurity"
  },
  {
    id: "dvwa-k8s",
    title: "DVWA Kubernetes Lab",
    tagline: "Security testing environment on Kubernetes",
    description: "Deployment of the Damn Vulnerable Web Application (DVWA) on a local Kubernetes cluster using Minikube. A deliberately insecure web application designed for learning and practicing web security testing in a controlled environment.",
    tags: ["Kubernetes", "Docker", "Minikube", "DevSecOps", "Security Testing"],
    github: "https://github.com/Dev-31/DVWA-k8s-lab",
    type: "DevSecOps"
  },
  {
    id: "watchdog-ai",
    title: "WatchdogAI",
    tagline: "AI-powered data quality and misinformation detection",
    description: "A comprehensive pipeline for data quality assessment, misinformation detection, and sustainability tracking. Features pattern-based + ML misinformation detection, multi-dimensional quality scoring, exact and semantic duplicate removal, and environmental impact monitoring.",
    tags: ["AI/ML", "Data Quality", "Misinformation Detection", "Python", "NLP"],
    github: "https://github.com/Dev-31/WatchdogAI",
    type: "AI & Data"
  }
];

const Projects = () => {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4 block">
              Projects
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-shadow-deep mb-6">
              Systems Built With Purpose
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Each project represents a challenge conquered and a skill mastered. From quantitative finance to AI-powered detection systems.
            </p>
          </motion.div>

          {/* Projects list */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass rounded-2xl p-8 md:p-12 hover:scale-[1.01] transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <span className="text-accent text-sm font-body tracking-wide uppercase">
                      {project.type}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2 mb-3 text-shadow-subtle">
                      {project.title}
                    </h2>
                    <p className="text-lg text-accent font-serif italic mb-4">
                      {project.tagline}
                    </p>
                    <p className="text-muted-foreground font-body leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-body bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 bg-foreground text-background rounded-full hover:bg-accent transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-body">View Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
