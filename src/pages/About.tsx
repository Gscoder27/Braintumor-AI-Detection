
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, Microscope, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
        
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center animate-slideDown">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">About NeuroDetect</h1>
            <p className="text-lg text-foreground/80 mb-8">
              Pioneering AI-powered brain tumor detection to assist medical professionals in making faster and more accurate diagnoses.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="p-3 rounded-full bg-primary/10">
                <Lightbulb size={28} className="text-primary" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-center mb-6">Our Mission</h2>
            
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              At NeuroDetect, we're on a mission to transform healthcare through the application of cutting-edge artificial intelligence. Our platform is designed to assist medical professionals in detecting brain tumors faster and with greater accuracy.
            </p>
            
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              We understand the critical importance of early detection in improving patient outcomes. By leveraging deep learning algorithms and computer vision technology, we've created a tool that can analyze MRI scans and identify potential tumors with a high degree of confidence.
            </p>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              Our goal is not to replace healthcare professionals, but to provide them with powerful tools that enhance their diagnostic capabilities and enable them to focus more of their valuable time on patient care.
            </p>
          </div>
        </div>
      </section>
      
      {/* Technology Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="p-3 rounded-full bg-primary/10">
                <Brain size={28} className="text-primary" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-center mb-6">Our Technology</h2>
            
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              NeuroDetect employs state-of-the-art deep learning models specifically trained on thousands of MRI scans to detect various types of brain tumors.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="glass rounded-xl p-6 animate-slideUp">
                <h3 className="text-xl font-semibold mb-3">Convolutional Neural Networks</h3>
                <p className="text-foreground/70">
                  Our platform utilizes specialized CNN architectures optimized for medical imaging analysis, allowing precise feature extraction from MRI scans.
                </p>
              </div>
              
              <div className="glass rounded-xl p-6 animate-slideUp" style={{ animationDelay: "100ms" }}>
                <h3 className="text-xl font-semibold mb-3">Transfer Learning</h3>
                <p className="text-foreground/70">
                  We leverage pre-trained models that have been fine-tuned on medical imaging datasets to achieve high accuracy with less training data.
                </p>
              </div>
              
              <div className="glass rounded-xl p-6 animate-slideUp" style={{ animationDelay: "200ms" }}>
                <h3 className="text-xl font-semibold mb-3">Image Segmentation</h3>
                <p className="text-foreground/70">
                  Advanced segmentation algorithms help identify tumor boundaries and provide detailed location information.
                </p>
              </div>
              
              <div className="glass rounded-xl p-6 animate-slideUp" style={{ animationDelay: "300ms" }}>
                <h3 className="text-xl font-semibold mb-3">Continuous Learning</h3>
                <p className="text-foreground/70">
                  Our models continuously improve through regular retraining with new validated data to increase accuracy over time.
                </p>
              </div>
            </div>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              While our technology is powerful, we maintain that it should be used as a supportive tool for healthcare professionals, not as a replacement for medical expertise and judgment.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="p-3 rounded-full bg-primary/10">
                <Users size={28} className="text-primary" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-center mb-10">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Emily Chen",
                  role: "Chief Medical Officer",
                  bio: "Neurosurgeon with over 15 years of experience, leading our medical validation team.",
                },
                {
                  name: "Dr. Michael Rodriguez",
                  role: "Lead Data Scientist",
                  bio: "PhD in Computer Science specializing in medical imaging and deep learning algorithms.",
                },
                {
                  name: "Sarah Johnson",
                  role: "CTO",
                  bio: "Former research scientist at MIT with expertise in AI applications for healthcare.",
                },
              ].map((member, index) => (
                <div 
                  key={index}
                  className="text-center animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-32 h-32 rounded-full bg-secondary/50 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-foreground/70">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <Zap size={40} className="mx-auto mb-6 text-white/90" />
            <h2 className="text-3xl font-bold mb-6">Ready to Experience the Power of AI-Driven Diagnostics?</h2>
            <p className="text-lg opacity-90 mb-8">
              Join our platform and see how our technology can assist in brain tumor detection with remarkable accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="secondary" className="text-primary font-medium px-8 py-6 text-base">
                  Try It Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="text-white border-white hover:bg-white/10 px-8 py-6 text-base">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
