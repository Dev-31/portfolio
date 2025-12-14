import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, ExternalLink } from 'lucide-react';

const Blog = () => {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4 block">
              Blog
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-shadow-deep mb-6">
              Thoughts & Insights
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Reflections on AI, technology, markets, and the future of intelligent systems.
            </p>
          </motion.div>

          {/* Coming soon / Notion integration notice */}
          <motion.div
            className="glass rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <svg viewBox="0 0 100 100" className="w-10 h-10 fill-accent">
                <path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.39-8.16-3.113L3.3 79.94c-2.333-3.113-3.3-5.443-3.3-8.167V11.113c0-3.497 1.553-6.413 6.017-6.8z"/>
              </svg>
            </div>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Blog Coming Soon
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-lg mx-auto">
              I'm setting up a Notion-powered blog where I'll share insights on AI, market analysis, 
              mental models, and reflections on building intelligent systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://linkedin.com/in/devsopariwala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full hover:bg-accent transition-all font-body"
              >
                Follow on LinkedIn
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:border-accent hover:text-accent transition-all font-body"
              >
                Get Notified
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Placeholder for future posts */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-display font-bold text-foreground mb-6">
              Topics I'll Explore
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "AI & Machine Learning Insights",
                "Market Analysis & Trends",
                "Building Scalable Systems",
                "Career & Learning Journey",
                "Cybersecurity Perspectives",
                "The Future of Work"
              ].map((topic, index) => (
                <div
                  key={topic}
                  className="p-4 glass rounded-xl text-muted-foreground font-body flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {topic}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;