import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  highlights: string[];
}

const milestones: JourneyMilestone[] = [
  {
    year: "2021",
    title: "The Beginning",
    description: "Joined Christ University, Bangalore to pursue B.Tech in Information Technology with Honors in Cybersecurity.",
    highlights: ["Started exploring programming", "Built foundation in CS fundamentals", "CGPA: 8.75/10"]
  },
  {
    year: "2022",
    title: "Leadership & Growth",
    description: "Stepped into leadership roles and began volunteering for various initiatives, developing soft skills alongside technical expertise.",
    highlights: ["Leadership development", "Community volunteering", "Team collaboration"]
  },
  {
    year: "2023-24",
    title: "Building Communities",
    description: "Founded and led the Entrepreneurship & Innovation Club. Organized impactful events with UNICEF and Karnataka Government. Emerged in Top 7 at India Cyber Summit Hackathon.",
    highlights: ["Founded E&I Club", "UNICEF collaborations", "India Cyber Summit - Top 7", "Cybersecurity enthusiast"]
  },
  {
    year: "2024",
    title: "Professional Foundations",
    description: "Gained real-world experience through internships and took on significant responsibilities. Built my first major cybersecurity project.",
    highlights: ["Cloud trainee", "Core Placement Coordinator", "Triveni Global Internship", "DDoS IDS Deep Learning Project"]
  },
  {
    year: "2025",
    title: "Projects Explosion",
    description: "A year of intense building and creation. From quantitative finance to AI chatbots, every project pushed boundaries.",
    highlights: ["Hedging Bot (Quantitative Finance)", "Jupiter Investments Intern", "Shopify Website Store", "AWS Lex Chatbot with RAG", "WatchdogAI", "Mumbai Hacks Hackathon"]
  },
  {
    year: "Present",
    title: "Vision & Future",
    description: "Currently working as Associate Software Engineer at Prodapt Solutions, continuing to build intelligent systems that make real impact.",
    highlights: ["Prodapt Solutions", "Full Stack Java Training", "Scalable Applications", "Future: AI & Cloud Innovation"]
  }
];

const MilestoneCard = ({ milestone, index }: { milestone: JourneyMilestone; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20 scroll-snap-start"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className={`max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
        {/* Year indicator */}
        <motion.div
          className={`flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">
            Chapter {index + 1}
          </span>
          <h2 className="text-7xl md:text-8xl lg:text-9xl font-display font-bold text-foreground/10 text-shadow-subtle">
            {milestone.year}
          </h2>
        </motion.div>

        {/* Content card */}
        <motion.div
          className={`glass rounded-2xl p-8 md:p-12 ${isEven ? 'md:order-first' : ''}`}
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 text-shadow-deep">
            {milestone.title}
          </h3>
          
          <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
            {milestone.description}
          </p>

          <div className="space-y-3">
            {milestone.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              >
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-foreground font-body">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const JourneyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative" ref={containerRef}>
      {/* Section header */}
      <div className="min-h-[50vh] flex items-center justify-center px-6">
        <div className="text-center">
          <motion.span
            className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Journey
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-shadow-deep"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            The Path So Far
          </motion.h2>
          <motion.p
            className="mt-4 text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Scroll through the chapters of my journey — from curious student to engineer with vision.
          </motion.p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <svg width="4" height="200" className="overflow-visible">
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="200"
            stroke="hsl(var(--border))"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <motion.line
            x1="2"
            y1="0"
            x2="2"
            y2="200"
            stroke="hsl(var(--accent))"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
      </div>

      {/* Milestones */}
      <div className="scroll-snap-y hide-scrollbar">
        {milestones.map((milestone, index) => (
          <MilestoneCard key={index} milestone={milestone} index={index} />
        ))}
      </div>
    </section>
  );
};

export default JourneyTimeline;