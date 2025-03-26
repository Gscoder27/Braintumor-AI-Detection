
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Your message has been sent successfully!");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const faqs = [
    {
      question: "What is NeuroDetect?",
      answer: "NeuroDetect is an AI-powered platform that helps medical professionals detect and analyze brain tumors from MRI scans using advanced deep learning algorithms.",
    },
    {
      question: "How accurate is the tumor detection?",
      answer: "Our algorithm has been validated with a 94% accuracy rate in clinical trials, comparing favorably with expert radiologists. However, it is designed as a supportive tool for professionals, not a replacement for expert diagnosis.",
    },
    {
      question: "Is my patients' data secure?",
      answer: "Absolutely. We prioritize data security and privacy. All uploads are encrypted, and we comply with HIPAA and GDPR requirements. We do not store MRI scans after analysis unless explicitly requested.",
    },
    {
      question: "Can I integrate NeuroDetect with my hospital's systems?",
      answer: "Yes, we offer API integration solutions that can work with most hospital management systems and PACS. Our team can provide technical support for custom integrations.",
    },
    {
      question: "Do you offer training for medical staff?",
      answer: "Yes, we provide comprehensive training materials and live sessions for medical professionals to help them make the most of our platform.",
    },
  ];
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background pointer-events-none" />
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <span className="text-sm font-medium">Contact Us</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Get in Touch
            </h1>
            
            <p className="text-lg text-foreground/70 mb-8">
              Have questions about NeuroDetect? Our team is here to help you with anything you need.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Info Section */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form */}
              <div className="flex-1">
                <div className="glass rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-foreground">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="input-field min-h-[150px]"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full btn-primary" 
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2" />
                          Sending Message...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="lg:w-96">
                <div className="glass rounded-xl p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-primary/10 mr-4">
                        <MapPin size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Address</h3>
                        <p className="text-foreground/70">123 Medical Center Drive<br />San Francisco, CA 94143</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-primary/10 mr-4">
                        <Mail size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Email</h3>
                        <p className="text-foreground/70">info@neurodetect.com<br />support@neurodetect.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-primary/10 mr-4">
                        <Phone size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Phone</h3>
                        <p className="text-foreground/70">+1 (415) 555-0123<br />+1 (415) 555-0124</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass rounded-xl p-8">
                  <h2 className="text-xl font-bold mb-4 text-foreground">Office Hours</h2>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-foreground">Monday - Friday:</span>
                      <span className="text-foreground/70">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">Saturday:</span>
                      <span className="text-foreground/70">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">Sunday:</span>
                      <span className="text-foreground/70">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30 dark:bg-secondary/10">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
                <MessageSquare size={24} className="text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
              <p className="text-lg text-foreground/70">
                Find answers to common questions about NeuroDetect
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="glass rounded-xl mb-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-foreground/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="text-center mt-12">
              <p className="text-foreground/70 mb-4">Still have questions?</p>
              <Button className="btn-primary">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
