import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, MessageSquare, Phone, MapPin, Send, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      toast.success("Message sent successfully! We'll get back to you soon.");
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      details: "support@neurodetect.com",
      link: "mailto:support@neurodetect.com",
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      details: "123 Innovation Drive, San Francisco, CA 94107",
      link: "https://maps.google.com/?q=San+Francisco",
    }
  ];

  const socialLinks = [
    { 
      platform: "linkedin", 
      icon: <Linkedin size={20} className="text-foreground" />, 
      label: "Follow us on LinkedIn",
      url: "https://linkedin.com"
    },
    { 
      platform: "twitter", 
      icon: <Twitter size={20} className="text-foreground" />, 
      label: "Follow us on X", 
      url: "https://x.com"
    },
    { 
      platform: "facebook", 
      icon: <Facebook size={20} className="text-foreground" />, 
      label: "Like us on Facebook",
      url: "https://facebook.com" 
    },
    { 
      platform: "instagram", 
      icon: <Instagram size={20} className="text-foreground" />, 
      label: "Follow us on Instagram",
      url: "https://instagram.com" 
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
        
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center animate-slideDown">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Contact Us</h1>
            <p className="text-lg text-foreground/80 mb-8">
              Have questions about our brain tumor detection platform? We're here to help! Reach out using any of the methods below.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info & Form Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-10">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start space-x-4 animate-slideUp"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{item.title}</h3>
                        <a 
                          href={item.link} 
                          className="text-foreground/70 hover:text-primary transition-colors"
                          target={item.title === "Location" ? "_blank" : undefined}
                          rel={item.title === "Location" ? "noopener noreferrer" : undefined}
                        >
                          {item.details}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6">
                  <h3 className="font-medium text-lg mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <HoverCard key={social.platform}>
                        <HoverCardTrigger asChild>
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary transition-colors duration-300 transform hover:scale-110"
                            aria-label={`${social.platform} profile`}
                          >
                            <span className="sr-only">{social.platform}</span>
                            {social.icon}
                          </a>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-auto p-2">
                          <p className="text-sm">{social.label}</p>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-3 animate-slideUp" style={{ animationDelay: "300ms" }}>
                <div className="glass rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <MessageSquare size={24} className="text-primary mr-3" />
                    <h2 className="text-2xl font-bold">Send Us a Message</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          className="input-field"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          className="input-field"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help you?"
                        className="input-field"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message here..."
                        className="input-field min-h-[120px] resize-y"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="btn-primary w-full" 
                      disabled={submitting}
                    >
                      {submitting ? (
                        <div className="flex items-center justify-center">
                          <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2" />
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send size={16} className="mr-2" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "How accurate is your brain tumor detection?",
                  answer: "Our deep learning model has achieved an accuracy rate of over 90% in detecting the presence of brain tumors from MRI scans. However, it should be used as a supportive tool for healthcare professionals, not as a standalone diagnostic tool."
                },
                {
                  question: "What types of brain tumors can your system detect?",
                  answer: "Our system can detect various types of brain tumors including gliomas, meningiomas, pituitary tumors, and other common brain tumors. The system continues to improve as we train it with more diverse datasets."
                },
                {
                  question: "Is my medical data secure on your platform?",
                  answer: "Absolutely. We prioritize the security and privacy of your medical data. All uploads are encrypted and we comply with HIPAA and other relevant healthcare data privacy regulations. We do not share your data with third parties without explicit consent."
                },
                {
                  question: "How long does it take to get results?",
                  answer: "Our advanced deep learning algorithms typically process an MRI scan in just a few seconds. The entire process from upload to receiving results usually takes less than a minute, depending on your internet speed."
                },
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="glass rounded-xl p-6 animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-foreground/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
