'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'client',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to send');
      
      setStatus('success');
      setFormData({ name: '', email: '', role: 'client', message: '' });
      
      if (typeof window !== 'undefined' && (window as any).umami) {
        (window as any).umami.track('contact-form-submit', { role: formData.role });
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8"
      onSubmit={handleSubmit}
    >
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-3 text-gray-300 tracking-wide">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-6 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-lg backdrop-blur-sm"
          placeholder="Your name"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-3 text-gray-300 tracking-wide">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-6 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-lg backdrop-blur-sm"
          placeholder="your@email.com"
        />
      </div>

      {/* Role Selection - Radio Buttons (Clear and Prominent) */}
      <div>
        <label className="block text-sm font-medium mb-4 text-gray-300 tracking-wide">
          I am a
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'client' })}
            className={`relative px-6 py-5 rounded-xl border-2 transition-all duration-300 text-left ${
              formData.role === 'client'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-lg mb-1">Potential Client</div>
                <div className="text-sm text-gray-400">Looking to collaborate</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                formData.role === 'client' ? 'border-blue-500' : 'border-zinc-600'
              }`}>
                {formData.role === 'client' && (
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                )}
              </div>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'recruiter' })}
            className={`relative px-6 py-5 rounded-xl border-2 transition-all duration-300 text-left ${
              formData.role === 'recruiter'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-lg mb-1">Recruiter</div>
                <div className="text-sm text-gray-400">Hiring opportunity</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                formData.role === 'recruiter' ? 'border-blue-500' : 'border-zinc-600'
              }`}>
                {formData.role === 'recruiter' && (
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                )}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-3 text-gray-300 tracking-wide">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-6 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:outline-none focus:border-blue-500 transition-all resize-none text-lg backdrop-blur-sm"
          placeholder="Tell me about your project or opportunity..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-8 py-5 bg-white text-black rounded-xl font-medium text-lg hover:bg-gray-100 disabled:bg-gray-700 disabled:text-gray-400 transition-all duration-300 hover:scale-[1.02]"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {/* Status Messages */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center"
        >
          Message sent successfully! I'll respond within 24 hours.
        </motion.div>
      )}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center"
        >
          Failed to send. Please try again or email me directly at devsopariwala22@gmail.com
        </motion.div>
      )}
    </motion.form>
  );
}