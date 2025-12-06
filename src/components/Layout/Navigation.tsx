'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-light tracking-tight hover:text-blue-400 transition-colors"
        >
          Dev Sopariwala
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-sm hover:text-blue-400 transition-colors">About</a>
          <a href="#skills" className="text-sm hover:text-blue-400 transition-colors">Skills</a>
          <a href="#projects" className="text-sm hover:text-blue-400 transition-colors">Projects</a>
          <a href="#values" className="text-sm hover:text-blue-400 transition-colors">Values</a>
          <a href="#contact" className="text-sm hover:text-blue-400 transition-colors">Contact</a>
        </div>

        <a
          href="#contact"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  );
}
