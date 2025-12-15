import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "AI & Machine Learning",
    skills: ["TensorFlow", "Scikit-learn", "GenAI", "AWS Bedrock", "RAG Architecture", "Deep Learning", "CNN/RNN/LSTM", "OpenCV"]
  },
  {
    name: "Cloud & DevOps",
    skills: ["AWS (EC2, S3, Lambda, Lex)", "Kubernetes", "Docker", "CloudFront", "Linux", "CI/CD", "Minikube"]
  },
  {
    name: "Cybersecurity",
    skills: ["Intrusion Detection Systems", "Network Security", "Vulnerability Assessment", "Incident Response", "DDoS Detection", "Cryptography"]
  },
  {
    name: "Programming",
    skills: ["Python", "Java", "C++", "SQL", "Bash/Shell", "JavaScript", "HTML/CSS", "React"]
  },
  {
    name: "Data & Analytics",
    skills: ["Pandas", "NumPy", "Matplotlib", "MySQL", "Power BI", "Tableau", "Excel", "Data Transformation"]
  },
  {
    name: "Strategy & Marketing",
    skills: ["Google Analytics", "SEO", "Email Marketing", "Content Strategy", "Google Search Console", "Market Analysis"]
  }
];

const Skills = () => {
  return (
    <div className="relative min-h-screen">
      <CursorGlow />
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
              Skills
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-shadow-deep mb-6">
              The Tools I Think With
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A comprehensive toolkit built through years of learning, building, and pushing boundaries.
            </p>
          </motion.div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.name}
                className="glass rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-display font-bold text-foreground mb-6 text-shadow-subtle">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm font-body bg-accent/10 text-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
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

export default Skills;