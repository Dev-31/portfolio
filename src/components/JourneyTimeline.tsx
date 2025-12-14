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
    summary: "Started B.Tech in IT with Honors in Cybersecurity at Christ University",
    description: "Joined Christ University, Bangalore to pursue B.Tech in Information Technology with Honors in Cybersecurity. This marked the start of a journey into the world of computing, algorithms, and system design.",
    highlights: ["Started exploring programming", "Built foundation in CS fundamentals", "CGPA: 8.75/10"]
  },
  {
    year: "2022",
    title: "Leadership & Growth",
    summary: "Developed soft skills through leadership roles and community volunteering",
    description: "Stepped into leadership roles and began volunteering for various initiatives, developing soft skills alongside technical expertise. Learned the value of collaboration and teamwork.",
    highlights: ["Leadership development", "Community volunteering", "Team collaboration"]
  },
  {
    year: "2023-24",
    title: "Building Communities",
    summary: "Founded E&I Club, organized UNICEF events, Top 7 at India Cyber Summit",
    description: "Founded and led the Entrepreneurship & Innovation Club. Organized impactful events with UNICEF and Karnataka Government. Emerged in Top 7 at India Cyber Summit Hackathon, cementing passion for cybersecurity.",
    highlights: ["Founded E&I Club", "UNICEF collaborations", "India Cyber Summit - Top 7", "Cybersecurity enthusiast"]
  },
  {
    year: "2024",
    title: "Professional Foundations",
    summary: "Cloud trainee, Core Placement Coordinator, Triveni Global internship",
    description: "Gained real-world experience through internships and took on significant responsibilities. Built my first major cybersecurity project — a DDoS Detection IDS using Deep Learning.",
    highlights: ["Cloud trainee", "Core Placement Coordinator", "Triveni Global Internship", "DDoS IDS Deep Learning Project"]
  },
  {
    year: "2025",
    title: "Projects Explosion",
    summary: "Hedging Bot, Jupiter Investments intern, Shopify store, AWS Chatbot, WatchdogAI",
    description: "A year of intense building and creation. From quantitative finance bots to AI chatbots, every project pushed boundaries. Participated in Mumbai Hacks — one of India's biggest hackathons.",
    highlights: ["Hedging Bot (Quantitative Finance)", "Jupiter Investments Intern", "Shopify Website Store", "AWS Lex Chatbot with RAG", "WatchdogAI", "Mumbai Hacks Hackathon"]
  },
  {
    year: "Present",
    title: "Vision & Future",
    summary: "Associate Software Engineer at Prodapt Solutions, building scalable systems",
    description: "Currently working as Associate Software Engineer at Prodapt Solutions, continuing to build intelligent systems that make real impact. The journey continues with a focus on AI and cloud innovation.",
    highlights: ["Prodapt Solutions", "Full Stack Java Training", "Scalable Applications", "Future: AI & Cloud Innovation"]
  }
];

const MilestoneCard = ({ 
  milestone, 
  index, 
  isLeft 
}: { 
  milestone: JourneyMilestone; 
  index: number;
  isLeft: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center min-h-[70vh] snap-start ${isLeft ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Content card */}
      <div className={`w-full md:w-[42%] ${isLeft ? 'md:mr-auto md:pl-8' : 'md:ml-auto md:pr-8'}`}>
        <div className="glass rounded-2xl p-6 md:p-8 hover:scale-[1.02] transition-transform duration-300">
          {/* Year badge */}
          <span className="inline-block px-4 py-1.5 text-xs font-body tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-4">
            {milestone.year}
          </span>
          
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 text-shadow-subtle">
            {milestone.title}
          </h3>
          
          <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
            {milestone.summary}
          </p>

          {/* View More button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-body text-accent hover:text-accent/80 transition-colors"
          >
            {isExpanded ? 'Show Less' : 'View More'}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Expanded content */}
          <motion.div
            initial={false}
            animate={{ 
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-5 border-t border-border/30 mt-5">
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                {milestone.description}
              </p>
              <div className="space-y-2">
                {milestone.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-foreground font-body text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
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

  // Calculate SVG dimensions based on milestones
  const svgHeight = milestones.length * 70; // vh units equivalent in percentage

  return (
    <section id="journey" className="relative py-16 md:py-24" ref={containerRef}>
      {/* Section header */}
      <div className="text-center mb-12 md:mb-16 px-6">
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
          From curious student to engineer with vision — each chapter shapes the next.
        </motion.p>
      </div>

      {/* Timeline container with magnetic scroll */}
      <div className="relative max-w-6xl mx-auto px-6 snap-y snap-mandatory">
        {/* SVG curved path - desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full hidden md:block pointer-events-none" style={{ width: '400px' }}>
          <svg
            viewBox="0 0 400 600"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Background path - gentle S-curves */}
            <path
              d="M 200 0 
                 C 200 30, 80 50, 80 100 
                 C 80 150, 320 170, 320 220 
                 C 320 270, 80 290, 80 340 
                 C 80 390, 320 410, 320 460 
                 C 320 510, 80 530, 80 580 
                 C 80 600, 200 600, 200 600"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Animated path */}
            <motion.path
              d="M 200 0 
                 C 200 30, 80 50, 80 100 
                 C 80 150, 320 170, 320 220 
                 C 320 270, 80 290, 80 340 
                 C 80 390, 320 410, 320 460 
                 C 320 510, 80 530, 80 580 
                 C 80 600, 200 600, 200 600"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength }}
            />
            
            {/* Milestone dots */}
            {milestones.map((_, index) => {
              const positions = [
                { x: 200, y: 0 },
                { x: 80, y: 100 },
                { x: 320, y: 220 },
                { x: 80, y: 340 },
                { x: 320, y: 460 },
                { x: 80, y: 580 },
              ];
              const pos = positions[index] || { x: 200, y: 600 };
              
              return (
                <motion.circle
                  key={index}
                  cx={pos.x}
                  cy={pos.y}
                  r="10"
                  fill="hsl(var(--background))"
                  stroke="hsl(var(--accent))"
                  strokeWidth="3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ delay: 0.2 }}
                />
              );
            })}
          </svg>
        </div>

        {/* Mobile vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:hidden">
          <motion.div
            className="w-full bg-accent origin-top"
            style={{ scaleY: pathLength, height: '100%' }}
          />
        </div>

        {/* Milestone cards */}
        <div className="relative ml-12 md:ml-0">
          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={index}
              milestone={milestone}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
