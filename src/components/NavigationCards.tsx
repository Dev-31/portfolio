import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Briefcase, Layers, PenTool, FileText, Mail } from 'lucide-react';

interface NavCard {
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
}

const navCards: NavCard[] = [
  {
    title: "Skills",
    subtitle: "The tools I think with",
    href: "/skills",
    icon: <Code className="w-6 h-6" />
  },
  {
    title: "Projects",
    subtitle: "Systems built with purpose",
    href: "/projects",
    icon: <Layers className="w-6 h-6" />
  },
  {
    title: "Experience",
    subtitle: "The journey so far",
    href: "/experience",
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    title: "Blog",
    subtitle: "Thoughts, insights, reflections",
    href: "/blog",
    icon: <PenTool className="w-6 h-6" />
  },
  {
    title: "Resumes",
    subtitle: "Choose your lens",
    href: "/resumes",
    icon: <FileText className="w-6 h-6" />
  },
  {
    title: "Contact",
    subtitle: "Let's build something together",
    href: "/contact",
    icon: <Mail className="w-6 h-6" />
  }
];

const NavigationCards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="explore" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4 block">
            Explore
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-shadow-deep">
            Discover More
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={card.href}
                className="group block p-8 rounded-2xl glass hover:bg-card/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    {card.icon}
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted-foreground font-body">
                  {card.subtitle}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NavigationCards;