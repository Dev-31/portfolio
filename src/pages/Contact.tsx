import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://portfolio-automations.app.n8n.cloud/webhook/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Message sent!",
          description: "Your message has activated my automated workflow. I'll get back to you soon.",
        });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or reach out via email directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="relative min-h-screen">
      <CursorGlow />
      <Navigation />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4 block">
              Contact
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-shadow-deep mb-6">
              Let's Build Together
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Have a project in mind? Want to collaborate? Or just want to say hello? 
              I'd love to hear from you.
            </p>
          </motion.div>

          {/* Form */}
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-body text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-accent transition-colors font-body"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-body text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-accent transition-colors font-body"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-body text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-accent transition-colors font-body resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-xl hover:bg-accent transition-all font-display font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-muted-foreground mt-6 font-body">
                Your message activates an automated workflow designed by me.
              </p>
            </motion.form>
          ) : (
            <motion.div
              className="glass rounded-2xl p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                Message Received!
              </h2>
              <p className="text-muted-foreground font-body mb-6">
                Thank you for reaching out. My automated system has received your message 
                and I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="text-accent hover:underline font-body"
              >
                Send another message
              </button>
            </motion.div>
          )}

          {/* Alternative contact */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-muted-foreground font-body mb-2">
              Prefer email directly?
            </p>
            <a
              href="mailto:hello@devsopariwala.com"
              className="text-accent hover:underline font-body"
            >
              hello@devsopariwala.com
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;