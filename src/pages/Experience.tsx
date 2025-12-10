import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import { Calendar, MapPin, Building } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: 'work' | 'internship';
}

const experiences: Experience[] = [
  {
    title: "Trainee - Full Stack Java",
    company: "Prodapt Solutions",
    location: "Bangalore",
    period: "September 2025 - Present",
    description: [
      "Training in Full Stack Java (Java 8, SQL, JDE, HTML, CSS, JS, React, Cloud) to build scalable applications.",
      "Developing soft skills through Agile standups, confidence-building workshops, and collaboration sessions by Tiny Magiq."
    ],
    type: 'work'
  },
  {
    title: "Website Operations Intern",
    company: "White Peacock Store",
    location: "Remote",
    period: "July 2025 – August 2025",
    description: [
      "Managed Google Analytics to track website traffic, customer behavior, and campaign performance for insights.",
      "Oversaw Google Merchant Center and Business Profile to ensure accurate product listings and improved online visibility.",
      "Designed and maintained email marketing flows to engage customers and drive repeat purchases.",
      "Developed and executed content strategy while planning and coordinating multi-channel digital marketing initiatives."
    ],
    type: 'internship'
  },
  {
    title: "Marketing Intern",
    company: "Jupiter Investments",
    location: "Surat",
    period: "May 2025 – June 2025",
    description: [
      "Executed lead generation campaigns through door-to-door outreach, directly acquiring new clients.",
      "Designed and implemented automated email workflows to improve marketing efficiency and client communication.",
      "Drafted, scheduled, and executed targeted marketing email campaigns to drive client acquisition."
    ],
    type: 'internship'
  },
  {
    title: "Database Development Intern",
    company: "Triveni Global Software Services LLP",
    location: "Remote",
    period: "April 2024 – June 2024",
    description: [
      "Developed and managed client databases using MySQL Workbench, enhancing practical database management skills.",
      "Collaborated in development meetings, contributing to effective, solution-oriented brainstorming sessions."
    ],
    type: 'internship'
  }
];

const Experience = () => {
  return (
    <div className="relative min-h-screen">
      <CursorGlow />
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
              Experience
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-shadow-deep mb-6">
              The Journey So Far
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From internships to full-time roles, each experience has shaped my approach to building intelligent systems.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%]'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-accent border-4 border-background -translate-x-1/2" />

                <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className={`glass rounded-2xl p-6 md:p-8 ${index % 2 === 0 ? '' : ''}`}>
                    {/* Type badge */}
                    <span className={`inline-block px-3 py-1 text-xs font-body uppercase tracking-wide rounded-full mb-4 ${
                      exp.type === 'work' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {exp.type === 'work' ? 'Full Time' : 'Internship'}
                    </span>

                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                      {exp.title}
                    </h3>

                    <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}>
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                    </div>

                    <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-muted-foreground font-body text-sm leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
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

export default Experience;