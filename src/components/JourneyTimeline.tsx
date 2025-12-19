import { useRef, useState, useEffect } from 'react';
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

// Desktop milestone card - alternating left/right
const DesktopMilestoneCard = ({ milestone, index }: { milestone: JourneyMilestone; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isExpanded, setIsExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      style={{ minHeight: '200px' }}
    >
      {/* Content card */}
      <motion.div
        className={`w-[calc(50%-3rem)] ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="glass rounded-2xl p-6">
          <span className="inline-block px-3 py-1 text-sm font-display font-bold bg-accent text-accent-foreground rounded-full mb-3">
            {milestone.year}
          </span>
          
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2 text-shadow-subtle">
            {milestone.title}
          </h3>
          
          <p className="text-muted-foreground font-body text-sm mb-3">
            {milestone.summary}
          </p>

          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-foreground/80 font-body mb-3 text-sm leading-relaxed">
              {milestone.description}
            </p>
            <div className={`space-y-1.5 ${isLeft ? 'flex flex-col items-end' : ''}`}>
              {milestone.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 ${isLeft ? 'flex-row-reverse' : ''}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-xs text-foreground font-body">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`mt-3 flex items-center gap-1 text-accent text-sm font-body hover:underline transition-all ${isLeft ? 'ml-auto' : 'mr-auto'}`}
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
      <div className="w-[calc(50%-3rem)]" />
    </div>
  );
};

// Mobile milestone card - single column with height reporting
const MobileMilestoneCard = ({ milestone, index, onHeightChange }: { 
  milestone: JourneyMilestone; 
  index: number;
  onHeightChange?: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    // Trigger height recalculation after animation
    setTimeout(() => onHeightChange?.(), 350);
  };

  return (
    <div ref={ref} className="relative pl-8">
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="glass rounded-xl p-5">
          <span className="inline-block px-3 py-1 text-sm font-display font-bold bg-accent text-accent-foreground rounded-full mb-3">
            {milestone.year}
          </span>
          
          <h3 className="text-lg font-display font-bold text-foreground mb-2 text-shadow-subtle">
            {milestone.title}
          </h3>
          
          <p className="text-muted-foreground font-body text-sm mb-3">
            {milestone.summary}
          </p>

          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-foreground/80 font-body mb-3 text-sm leading-relaxed">
              {milestone.description}
            </p>
            <div className="space-y-1.5">
              {milestone.highlights.map((highlight, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-xs text-foreground font-body">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <button
            onClick={handleToggle}
            className="mt-3 flex items-center gap-1 text-accent text-sm font-body hover:underline transition-all"
          >
            {isExpanded ? (
              <>View Less <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>View More <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const JourneyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const [mobileLineHeight, setMobileLineHeight] = useState(milestones.length * 200);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Recalculate mobile line height based on actual content
  const updateMobileLineHeight = () => {
    if (mobileContentRef.current) {
      const height = mobileContentRef.current.offsetHeight;
      setMobileLineHeight(height);
    }
  };

  useEffect(() => {
    updateMobileLineHeight();
    window.addEventListener('resize', updateMobileLineHeight);
    return () => window.removeEventListener('resize', updateMobileLineHeight);
  }, []);

  // Calculate SVG path dimensions based on milestones
  const totalHeight = milestones.length * 220;
  const amplitude = 120;

  // Generate flowing S-curve path for desktop
  const generateDesktopPath = () => {
    const points: string[] = [];
    const segmentHeight = totalHeight / milestones.length;
    
    points.push(`M 200 0`);
    
    milestones.forEach((_, index) => {
      const y1 = index * segmentHeight;
      const y2 = (index + 0.5) * segmentHeight;
      const y3 = (index + 1) * segmentHeight;
      
      const direction = index % 2 === 0 ? 1 : -1;
      const x1 = 200;
      const x2 = 200 + (amplitude * direction);
      const x3 = 200;
      
      points.push(`C ${x1} ${y1 + segmentHeight * 0.25}, ${x2} ${y2 - segmentHeight * 0.15}, ${x2} ${y2}`);
      points.push(`C ${x2} ${y2 + segmentHeight * 0.15}, ${x3} ${y3 - segmentHeight * 0.25}, ${x3} ${y3}`);
    });
    
    return points.join(' ');
  };

  const desktopPath = generateDesktopPath();

  return (
    <section id="journey" className="py-24 px-4 md:px-6" ref={containerRef}>
      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
        <motion.span
          className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          My Journey
        </motion.span>
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-shadow-deep"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          The Path So Far
        </motion.h2>
        <motion.p
          className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Scroll through the chapters of my journey — from curious student to engineer with vision.
        </motion.p>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden md:block relative max-w-5xl mx-auto">
        {/* Flowing curved SVG path */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-0 overflow-visible pointer-events-none"
          width="400"
          height={totalHeight}
          viewBox={`0 0 400 ${totalHeight}`}
          preserveAspectRatio="none"
        >
          {/* Background path */}
          <path
            d={desktopPath}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Animated progress path */}
          <motion.path
            d={desktopPath}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        {/* Milestone dots on the path */}
        {milestones.map((_, index) => {
          const segmentHeight = totalHeight / milestones.length;
          const y = (index + 0.5) * segmentHeight;
          const direction = index % 2 === 0 ? 1 : -1;
          const x = 200 + (amplitude * direction);
          
          return (
            <motion.div
              key={index}
              className="absolute w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg z-10"
              style={{
                left: `calc(50% + ${(x - 200)}px - 8px)`,
                top: `${y}px`,
              }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.3 }}
            />
          );
        })}

        {/* Milestone cards */}
        <div className="space-y-8" style={{ minHeight: totalHeight }}>
          {milestones.map((milestone, index) => (
            <DesktopMilestoneCard key={index} milestone={milestone} index={index} />
          ))}
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden relative max-w-lg mx-auto">
        {/* Dynamic vertical line - adjusts to content height */}
        <div 
          className="absolute left-[19px] top-0 w-0.5 bg-border transition-all duration-300"
          style={{ height: `${mobileLineHeight}px` }}
        />
        <motion.div
          className="absolute left-[18px] top-0 w-1 bg-accent origin-top"
          style={{ 
            height: `${mobileLineHeight}px`,
            scaleY: pathLength 
          }}
        />

        {/* Milestone dots */}
        {milestones.map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-3 h-3 rounded-full bg-accent border-2 border-background shadow-md z-10"
            style={{
              left: '13px',
              top: `${index * (mobileLineHeight / milestones.length) + 28}px`,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          />
        ))}

        {/* Mobile cards */}
        <div ref={mobileContentRef} className="space-y-6">
          {milestones.map((milestone, index) => (
            <MobileMilestoneCard 
              key={index} 
              milestone={milestone} 
              index={index}
              onHeightChange={updateMobileLineHeight}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;