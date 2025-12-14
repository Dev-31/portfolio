import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FileText, Download, ArrowRight } from 'lucide-react';

const Resumes = () => {
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
              Resumes
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-shadow-deep mb-6">
              Choose Your Lens
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Two perspectives on my journey — technical depth or strategic breadth. Pick the one that resonates.
            </p>
          </motion.div>

          {/* Resume cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Resume */}
            <motion.div
              className="glass rounded-2xl p-8 md:p-10 text-center hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-accent" />
              </div>

              <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                Technical Resume
              </h2>
              <p className="text-muted-foreground font-body mb-6">
                Deep dive into technical skills, projects, and engineering expertise. Perfect for technical roles and engineering positions.
              </p>

              <div className="space-y-2 mb-8 text-sm text-muted-foreground">
                <p>• Software Engineering & Development</p>
                <p>• AI/ML & Deep Learning Projects</p>
                <p>• Cloud & DevOps Experience</p>
                <p>• Cybersecurity Focus</p>
              </div>

              <a
                href="/resumes/technical-resume.pdf"
                download="Dev_Sopariwala_Technical_Resume.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full hover:bg-accent transition-all font-body"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </motion.div>

            {/* Marketing Resume */}
            <motion.div
              className="glass rounded-2xl p-8 md:p-10 text-center hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-accent" />
              </div>

              <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                Marketing Resume
              </h2>
              <p className="text-muted-foreground font-body mb-6">
                Strategic perspective focusing on analytics, marketing, and business acumen. Ideal for marketing and strategy roles.
              </p>

              <div className="space-y-2 mb-8 text-sm text-muted-foreground">
                <p>• Marketing Strategy & Analytics</p>
                <p>• Data Visualization & Insights</p>
                <p>• Content & Email Marketing</p>
                <p>• SEO & Digital Marketing</p>
              </div>

              <a
                href="/resumes/marketing-resume.pdf"
                download="Dev_Sopariwala_Marketing_Resume.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full hover:bg-accent transition-all font-body"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </motion.div>
          </div>

          {/* Additional CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-muted-foreground font-body mb-4">
              Prefer to discuss in person?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-accent hover:underline font-body"
            >
              Let's connect
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resumes;