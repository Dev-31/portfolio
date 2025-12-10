import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          className="text-lg font-serif italic text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          "Built in collaboration with human intuition and AI assistance.
          <br />
          <span className="text-foreground">Directed by Dev Sopariwala.</span>"
        </motion.p>

        {/* Social links */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://github.com/Dev-31"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/devsopariwala"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:devsopariwala22@gmail.com"
            className="p-3 rounded-full glass hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <p className="text-sm text-muted-foreground font-body">
          © {new Date().getFullYear()} Dev Sopariwala. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;