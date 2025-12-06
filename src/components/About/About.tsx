'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-12 text-center">About</h2>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-gray-300 leading-relaxed mb-6">
              I didn't start here.
            </p>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              I began asking questions no one seemed to ask—why systems fail when they shouldn't, 
              why solutions work in theory but crumble under pressure, why the gap between what's 
              possible and what's profitable stays so wide.
            </p>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              The answers led me through cybersecurity trenches, where I built deep learning systems 
              to detect DDoS attacks before they land. Through quantitative finance labs, automating 
              hedging strategies that reduce human error by 80%. Through cloud architectures on AWS, 
              where I engineered GenAI chatbots that retrieve answers from thousands of policy documents 
              in milliseconds.
            </p>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              But the real education came from the spaces between disciplines.
            </p>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Marketing taught me that the best technology is worthless if nobody understands its value. 
              Data analysis showed me that metrics without context are just noise. Product thinking revealed 
              that elegant code solving the wrong problem is just expensive art.
            </p>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Today, I build systems at the intersection of AI, cloud infrastructure, and security—not 
              because it's trendy, but because it's where the hardest, most meaningful problems live. 
              Problems that demand both technical depth and strategic clarity.
            </p>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              I work with AI transparently, treating it as a collaborator rather than a replacement. 
              This entire site was built in partnership with Claude, directed by human judgment, taste, 
              and vision.
            </p>
            
            <p className="text-gray-300 leading-relaxed">
              Currently based in Bangalore, I work with startups and enterprises who need someone who 
              can architect cloud-native solutions, secure them properly, and explain why they matter 
              in language that executives and engineers both understand.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}