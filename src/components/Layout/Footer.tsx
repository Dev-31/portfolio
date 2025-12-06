export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-light mb-4">Dev Sopariwala</h3>
            <p className="text-sm text-gray-400">
              AI Engineer, Cloud Architect & Cybersecurity Specialist
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">About</a>
              <a href="#projects" className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">Projects</a>
              <a href="#contact" className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">Connect</h4>
            <div className="space-y-2">
              <a href="https://linkedin.com/in/devsopariwala" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">LinkedIn</a>
              <a href="https://github.com/Dev-31" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">GitHub</a>
              <a href="mailto:devsopariwala22@gmail.com" className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">Email</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p className="mb-2">© {new Date().getFullYear()} Dev Sopariwala. All rights reserved.</p>
          <p className="text-xs italic">
            Built in collaboration with human intuition and AI assistance.<br />
            Directed by Dev Sopariwala.
          </p>
        </div>
      </div>
    </footer>
  );
}