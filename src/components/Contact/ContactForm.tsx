'use client';

import React, { useState, useRef, ChangeEvent, FocusEvent } from 'react';
import { motion, useInView } from 'framer-motion';

// ============================================================================
// Types
// ============================================================================

interface FormData {
  name: string;
  email: string;
  role: 'client' | 'recruiter';
  message: string;
}

type FocusField = keyof FormData | null;

// ============================================================================
// Contact Form Component
// ============================================================================

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: 'client',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<FocusField>(null);

  // Unified handler
  const handleInput = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill all fields');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed');

      setStatus('success');
      setFormData({ name: '', email: '', role: 'client', message: '' });

      if (typeof window !== 'undefined' && (window as any).umami) {
        (window as any).umami.track('contact-form-submit', { role: formData.role });
      }
    } catch (error) {
      setStatus('error');
    }
  };

  // Shared input styles
  const inputBase: React.CSSProperties = {
    width: '100%',
    padding: '1.25rem 1.5rem',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: '1rem',
    border: '1px solid rgba(255,255,255,0.08)',
    fontSize: '1.125rem',
    color: 'white',
    outline: 'none',
    transition: 'all 0.25s',
    backdropFilter: 'blur(14px)'
  };

  // =============================================================================
  // Component JSX
  // =============================================================================

  return (
    <div className="flex flex-col gap-8">

      {/* NAME FIELD */}
      <FieldWrapper label="Name">
        <input
          type="text"
          value={formData.name}
          placeholder="Your name"
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput('name', e.target.value)}
          style={{
            ...inputBase,
            borderColor:
              focusedField === 'name'
                ? 'rgba(59,130,246,0.5)'
                : 'rgba(255,255,255,0.08)'
          }}
        />
      </FieldWrapper>

      {/* EMAIL FIELD */}
      <FieldWrapper label="Email">
        <input
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput('email', e.target.value)}
          style={{
            ...inputBase,
            borderColor:
              focusedField === 'email'
                ? 'rgba(59,130,246,0.5)'
                : 'rgba(255,255,255,0.08)'
          }}
        />
      </FieldWrapper>

      {/* ROLE SELECTION */}
      <div>
        <Label text="I am a" />

        <div className="grid gap-4 md:grid-cols-2">
          {roleOptions.map(option => (
            <RoleCard
              key={option.value}
              option={option}
              selected={formData.role === option.value}
              onSelect={() => handleInput('role', option.value)}
            />
          ))}
        </div>
      </div>

      {/* MESSAGE FIELD */}
      <FieldWrapper label="Message">
        <textarea
          rows={6}
          placeholder="Tell me about your project or opportunity..."
          value={formData.message}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInput('message', e.target.value)}
          style={{
            ...inputBase,
            resize: 'none',
            borderColor:
              focusedField === 'message'
                ? 'rgba(59,130,246,0.5)'
                : 'rgba(255,255,255,0.08)'
          }}
        />
      </FieldWrapper>

      {/* SUBMIT BUTTON */}
      <SubmitButton status={status} onSubmit={handleSubmit} />

      {/* SUCCESS MESSAGE */}
      {status === 'success' && <SuccessBox />}

      {/* ERROR MESSAGE */}
      {status === 'error' && <ErrorBox />}
    </div>
  );
};

// ============================================================================
// Small UI Components
// ============================================================================

const Label: React.FC<{ text: string }> = ({ text }) => (
  <label className="block mb-3 text-sm tracking-wider uppercase font-medium text-gray-400">
    {text}
  </label>
);

const FieldWrapper: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    <Label text={label} />
    {children}
  </motion.div>
);

// ============================================================================
// Role Card Component
// ============================================================================

const roleOptions = [
  { value: 'client' as const, label: 'Potential Client', desc: 'Looking to collaborate' },
  { value: 'recruiter' as const, label: 'Recruiter', desc: 'Hiring opportunity' }
];

const RoleCard: React.FC<{
  option: { value: 'client' | 'recruiter'; label: string; desc: string };
  selected: boolean;
  onSelect: () => void;
}> = ({ option, selected, onSelect }) => (
  <motion.button
    type="button"
    onClick={onSelect}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    className="text-left relative p-6 rounded-xl border backdrop-blur-xl transition-all"
    style={{
      borderColor: selected ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.1)',
      backgroundColor: selected ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.03)'
    }}
  >
    <div className="text-lg font-medium text-white mb-1 flex justify-between items-center">
      {option.label}
      <span className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
        selected ? 'border-blue-500' : 'border-gray-600'
      }`}>
        {selected && <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
      </span>
    </div>

    <p className="text-sm text-gray-400">{option.desc}</p>
  </motion.button>
);

// ============================================================================
// Submit Button Component
// ============================================================================

const SubmitButton: React.FC<{
  status: 'idle' | 'loading' | 'success' | 'error';
  onSubmit: () => void;
}> = ({ status, onSubmit }) => (
  <motion.button
    type="button"
    onClick={onSubmit}
    disabled={status === 'loading'}
    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
    whileTap={{ scale: 0.97 }}
    className="w-full py-5 rounded-xl text-lg font-medium text-white shadow-xl transition-all"
    style={{
      background: 'linear-gradient(to right, rgb(59,130,246), rgb(147,51,234))',
      opacity: status === 'loading' ? 0.6 : 1
    }}
  >
    {status === 'loading' ? (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="mx-auto w-6 h-6 border-2 border-white border-t-transparent rounded-full"
      />
    ) : (
      'Send Message'
    )}
  </motion.button>
);

// ============================================================================
// Status Components
// ============================================================================

const SuccessBox = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="p-5 text-center rounded-xl border backdrop-blur-xl"
    style={{
      background: 'rgba(16,185,129,0.1)',
      borderColor: 'rgba(16,185,129,0.2)',
      color: 'rgb(52,211,153)'
    }}
  >
    Message sent successfully. I will respond within 24 hours.
  </motion.div>
);

const ErrorBox = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="p-5 text-center rounded-xl border backdrop-blur-xl"
    style={{
      background: 'rgba(239,68,68,0.1)',
      borderColor: 'rgba(239,68,68,0.2)',
      color: 'rgb(248,113,113)'
    }}
  >
    Failed to send. Email me at{" "}
    <a className="underline" href="mailto:devsopariwala22@gmail.com">
      devsopariwala22@gmail.com
    </a>
  </motion.div>
);

// ============================================================================
// SECTION WRAPPER
// ============================================================================

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-6 bg-black overflow-hidden"
    >
      {/* Background blur orb */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent)'
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-white font-light"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
          >
            Get in Touch
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto font-light mt-4">
            Whether you're looking to hire or collaborate, I'd love to hear from you.
          </p>
        </motion.div>

        {/* Form */}
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
