'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'client',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // FIXED: Provide correct type for focusedField
  const [focusedField, setFocusedField] = useState<"name" | "email" | "role" | "message" | null>(null);

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
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1.25rem 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '1rem',
    fontSize: '1.125rem',
    color: 'white',
    outline: 'none',
    transition: 'all 0.3s'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* NAME */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          marginBottom: '0.75rem',
          color: 'rgb(156, 163, 175)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em'
        }}>
          Name
        </label>

        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            borderColor: focusedField === 'name' ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.08)',
            backgroundColor: focusedField === 'name' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)'
          }}
          placeholder="Your name"
        />
      </motion.div>

      {/* EMAIL */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          marginBottom: '0.75rem',
          color: 'rgb(156, 163, 175)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em'
        }}>
          Email
        </label>

        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            borderColor: focusedField === 'email' ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.08)',
            backgroundColor: focusedField === 'email' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)'
          }}
          placeholder="your@email.com"
        />
      </motion.div>

      {/* ROLE */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          marginBottom: '1rem',
          color: 'rgb(156, 163, 175)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em'
        }}>
          I am a
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            { value: 'client', label: 'Potential Client', desc: 'Looking to collaborate' },
            { value: 'recruiter', label: 'Recruiter', desc: 'Hiring opportunity' }
          ].map(option => (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, role: option.value })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                backdropFilter: 'blur(16px)',
                border: `2px solid ${formData.role === option.value ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.08)'}`,
                backgroundColor: formData.role === option.value ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.02)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ fontSize: '1.125rem', fontWeight: '500', color: 'white' }}>
                {option.label}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'rgb(156,163,175)' }}>
                {option.desc}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* MESSAGE */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          marginBottom: '0.75rem',
          color: 'rgb(156, 163, 175)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em'
        }}>
          Message
        </label>

        <textarea
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            resize: 'none',
            borderColor: focusedField === 'message' ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.08)',
            backgroundColor: focusedField === 'message' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)'
          }}
          placeholder="Tell me about your project or opportunity..."
        />
      </motion.div>

      {/* SUBMIT BUTTON */}
      <motion.button
        type="button"
        onClick={handleSubmit}
        disabled={status === 'loading'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          padding: '1.5rem 2rem',
          borderRadius: '1rem',
          fontSize: '1.125rem',
          background: 'linear-gradient(to right, rgb(59,130,246), rgb(147,51,234))',
          color: 'white',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.5 : 1
        }}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </motion.button>

      {/* SUCCESS MESSAGE */}
      {status === 'success' && (
        <div style={{ color: 'rgb(52,211,153)', textAlign: 'center' }}>
          Message sent successfully.
        </div>
      )}

      {/* ERROR MESSAGE */}
      {status === 'error' && (
        <div style={{ color: 'rgb(248,113,113)', textAlign: 'center' }}>
          Failed to send message. Please try again.
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section id="contact" ref={sectionRef} style={{ padding: '8rem 1.5rem', background: 'black' }}>
      <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} style={{
        fontSize: '4rem',
        textAlign: 'center',
        color: 'white',
        marginBottom: '2rem'
      }}>
        Get in Touch
      </motion.h2>

      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
