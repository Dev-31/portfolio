'use client';

import { motion } from 'framer-motion';

export default function ResumeChooser() {
  const handleDownload = (type: 'technical' | 'marketing') => {
    // Correct file paths
    const filePath = type === 'technical' 
      ? '/resumes/technical-resume.pdf'
      : '/resumes/marketing-resume.pdf';
    
    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = filePath;
    link.download = `Dev-Sopariwala-${type === 'technical' ? 'Technical' : 'Marketing'}-Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).umami) {
      (window as any).umami.track('resume-download', { type });
    }

    // Fallback: Open in new tab if download fails
    setTimeout(() => {
      window.open(filePath, '_blank');
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-3xl mx-auto mt-20"
    >
      <div className="relative bg-zinc-950/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-10">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-light mb-3">Choose Your Lens</h3>
          <p className="text-gray-400 text-lg font-light">
            View my experience through different perspectives
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Technical Resume */}
          <button
            onClick={() => handleDownload('technical')}
            className="group relative overflow-hidden bg-linear-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/20 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2 text-left">Technical Resume</h4>
              <p className="text-sm text-gray-400 text-left mb-4">
                AI, Cloud Architecture, Cybersecurity & Development
              </p>
              <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                <span>Download PDF</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          {/* Marketing Resume */}
          <button
            onClick={() => handleDownload('marketing')}
            className="group relative overflow-hidden bg-linear-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2 text-left">Marketing Resume</h4>
              <p className="text-sm text-gray-400 text-left mb-4">
                Strategy, Analytics, Operations & Growth
              </p>
              <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                <span>Download PDF</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Helper text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          If download doesn't start automatically, the PDF will open in a new tab
        </p>
      </div>
    </motion.div>
  );
}