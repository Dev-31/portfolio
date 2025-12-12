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
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'} mb-16 md:mb-24`}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Content card */}
      <div className={`w-full md:w-[45%] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
        <div className="glass rounded-2xl p-6 md:p-8 hover:scale-[1.01] transition-transform duration-300">
          {/* Year badge */}
          <span className="inline-block px-3 py-1 text-xs font-body tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-4">
            {milestone.year}
          </span>
          
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2 text-shadow-subtle">
            {milestone.title}
          </h3>
          
          <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-4">
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
            <div className="pt-4 border-t border-border/30 mt-4">
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                {milestone.description}
              </p>
              <div className="space-y-2">
                {milestone.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
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
  const pathRef = useRef<SVGPathElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Gentle curved path - not too curvy, natural flow
  const generatePath = () => {
    const height = milestones.length * 200;
    let path = 'M 50 0';
    
    milestones.forEach((_, index) => {
      const y = index * 200 + 100;
      const isLeft = index % 2 === 0;
      const controlX = isLeft ? 20 : 80;
      const endX = isLeft ? 30 : 70;
      
      // Gentle bezier curves alternating left and right
      path += ` Q ${controlX} ${y - 50}, ${endX} ${y}`;
      path += ` Q ${50} ${y + 50}, 50 ${y + 100}`;
    });
    
    return path;
  };

  return (
    <section id="journey" className="relative py-24 md:py-32" ref={containerRef}>
      {/* Section header */}
      <div className="text-center mb-16 md:mb-24 px-6">
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

      {/* Timeline container */}
      <div className="relative max-w-5xl mx-auto px-6">
        {/* SVG curved path - visible on desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden md:block pointer-events-none">
          <svg
            width="100"
            height={milestones.length * 200 + 100}
            className="overflow-visible"
            style={{ marginLeft: '-50px' }}
          >
            {/* Background path */}
            <path
              d={generatePath()}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Animated path */}
            <motion.path
              ref={pathRef}
              d={generatePath()}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength }}
            />
            
            {/* Milestone dots */}
            {milestones.map((_, index) => {
              const y = index * 200 + 100;
              const isLeft = index % 2 === 0;
              const x = isLeft ? 30 : 70;
              
              return (
                <motion.circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="8"
                  fill="hsl(var(--background))"
                  stroke="hsl(var(--accent))"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                />
              );
            })}
          </svg>
        </div>

        {/* Mobile vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:hidden">
          <motion.div
            className="w-full bg-accent origin-top"
            style={{ scaleY: pathLength, height: '100%' }}
          />
        </div>

        {/* Milestone cards */}
        <div className="relative">
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
