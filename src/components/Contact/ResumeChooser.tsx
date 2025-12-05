'use client';

import { motion } from 'framer-motion';

export default function ResumeChooser() {
  const handleDownload = (type: 'technical' | 'marketing') => {
    const fileName = type === 'technical' 
      ? 'Dev-Sopariwala-Technical-Resume.pdf'
      : 'Dev-Sopariwala-Marketing-Resume.pdf';
    
    const link = document.createElement('a');
    link.href = `/resumes/${fileName}`;
    link.download = fileName;
    link.click();

    // Track analytics
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track('resume-download', { type });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-16 p-8 bg-gray-900/50 border border-gray-800 rounded-xl"
    >
      <h3 className="text-2xl font-light mb-2 text-center">Choose Your Lens</h3>
      <p className="text-gray-400 text-center mb-6">
        View my experience through different perspectives
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => handleDownload('technical')}
          className="px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors group"
        >
          <span className="block text-lg mb-1">Technical Resume</span>
          <span className="block text-sm text-blue-200 opacity-80">
            AI, Cloud & Cybersecurity
          </span>
        </button>
        
        <button
          onClick={() => handleDownload('marketing')}
          className="px-6 py-4 bg-transparent border border-gray-600 hover:border-gray-400 rounded-lg font-medium transition-colors group"
        >
          <span className="block text-lg mb-1">Marketing Resume</span>
          <span className="block text-sm text-gray-400">
            Strategy, Analytics & Operations
          </span>
        </button>
      </div>
    </motion.div>
  );
}