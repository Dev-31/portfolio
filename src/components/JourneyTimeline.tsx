import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface JourneyMilestone {
  year: string;
  title: string;
  summary: string;
  description: string;
  highlights: string[];
}

const milestones: JourneyMilestone[] = [
  {
    year: "2021",
    title: "The Beginning",
    summary: "Started my journey at Christ University, Bangalore",
    description: "Joined Christ University, Bangalore to pursue B.Tech in Information Technology with Honors in Cybersecurity. This marked the beginning of an exciting journey into the world of technology.",
    highlights: ["Started exploring programming", "Built foundation in CS fundamentals", "CGPA: 8.75/10"]
  },
  {
    year: "2022",
    title: "Leadership & Growth",
    summary: "Developed leadership skills through volunteering",
    description: "Stepped into leadership roles and began volunteering for various initiatives, developing soft skills alongside technical expertise.",
    highlights: ["Leadership development", "Community volunteering", "Team collaboration"]
  },
  {
    year: "2023-24",
    title: "Building Communities",
    summary: "Founded E&I Club, competed at India Cyber Summit",
    description: "Founded and led the Entrepreneurship & Innovation Club. Organized impactful events with UNICEF and Karnataka Government. Emerged in Top 7 at India Cyber Summit Hackathon.",
    highlights: ["Founded E&I Club", "UNICEF collaborations", "India Cyber Summit - Top 7", "Cybersecurity enthusiast"]
  },
  {
    year: "2024",
    title: "Professional Foundations",
    summary: "Internships, coordination roles, and first major project",
    description: "Gained real-world experience through internships and took on significant responsibilities as Core Placement Coordinator. Built my first major cybersecurity project.",
    highlights: ["Cloud trainee", "Core Placement Coordinator", "Triveni Global Internship", "DDoS IDS Deep Learning Project"]
  },
  {
    year: "2025",
    title: "Projects Explosion",
    summary: "A year of intense building across multiple domains",
    description: "A year of intense building and creation. From quantitative finance to AI chatbots, every project pushed boundaries. Participated in Mumbai Hacks, one of India's biggest hackathons.",
    highlights: ["Hedging Bot (Quantitative Finance)", "Jupiter Investments Intern", "Shopify Website Store", "AWS Lex Chatbot with RAG", "WatchdogAI", "Mumbai Hacks Hackathon"]
  },
  {
    year: "Present",
    title: "Vision & Future",
    summary: "Associate Software Engineer at Prodapt Solutions",
    description: "Currently working as Associate Software Engineer at Prodapt Solutions, continuing to build intelligent systems that make real impact while pursuing innovation in AI and Cloud.",
    highlights: ["Prodapt Solutions", "Full Stack Java Training", "Scalable Applications", "Future: AI & Cloud Innovation"]
  }
];

const MilestoneCard = ({ milestone, index }: { milestone: JourneyMilestone; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [isExpanded, setIsExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`relative flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Timeline node */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg" />
      </motion.div>

      {/* Content card */}
      <motion.div
        className={`w-[calc(50%-2rem)] ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="glass rounded-2xl p-6 md:p-8">
          {/* Year badge */}
          <span className="inline-block px-3 py-1 text-sm font-display font-bold bg-accent text-accent-foreground rounded-full mb-4">
            {milestone.year}
          </span>
          
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 text-shadow-subtle">
            {milestone.title}
          </h3>
          
          <p className="text-muted-foreground font-body mb-4">
            {milestone.summary}
          </p>

          {/* Expandable content */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-foreground/80 font-body mb-4 text-sm leading-relaxed">
              {milestone.description}
            </p>
            <div className={`space-y-2 ${isLeft ? 'flex flex-col items-end' : ''}`}>
              {milestone.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 ${isLeft ? 'flex-row-reverse' : ''}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-sm text-foreground font-body">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* View More button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center gap-1 text-accent text-sm font-body hover:underline transition-all mx-auto"
            style={{ marginLeft: isLeft ? 'auto' : '0', marginRight: isLeft ? '0' : 'auto' }}
          >
            {isExpanded ? (
              <>View Less <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>View More <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </motion.div>

      {/* Empty space for opposite side */}
      <div className="w-[calc(50%-2rem)]" />
    </div>
  );
};

const JourneyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="py-24 px-6" ref={containerRef}>
      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
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

      {/* Timeline container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Flowing zigzag SVG path */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-8 overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Background path */}
          <path
            d="M 16 0 
               C 16 100, 16 150, 16 200
               C 16 250, 16 300, 16 350
               C 16 400, 16 450, 16 500
               C 16 550, 16 600, 16 650
               C 16 700, 16 750, 16 800
               C 16 850, 16 900, 16 950
               L 16 100%"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ height: '100%' }}
          />
          {/* Animated progress path */}
          <motion.path
            d="M 16 0 
               C 16 100, 16 150, 16 200
               C 16 250, 16 300, 16 350
               C 16 400, 16 450, 16 500
               C 16 550, 16 600, 16 650
               C 16 700, 16 750, 16 800
               C 16 850, 16 900, 16 950
               L 16 100%"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength, height: '100%' }}
          />
        </svg>

        {/* Milestone cards */}
        <div className="space-y-16 md:space-y-24">
          {milestones.map((milestone, index) => (
            <MilestoneCard key={index} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
