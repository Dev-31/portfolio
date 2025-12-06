import ContactForm from './ContactForm';
import ResumeChooser from './ResumeChooser';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light mb-8 text-center">Get in Touch</h2>
        <p className="text-center text-gray-400 mb-12">
          Whether you're looking to hire or collaborate, I'd love to hear from you.
        </p>
        
        <ContactForm />
        <ResumeChooser />
      </div>
    </section>
  );
}