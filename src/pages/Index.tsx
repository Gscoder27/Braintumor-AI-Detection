
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Activity, Brain, FileUp, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const features = [
    {
      title: "Advanced ML Detection",
      description: "Our deep learning model is trained on thousands of MRI scans to provide accurate tumor detection.",
      icon: <Brain size={28} className="text-primary" />,
    },
    {
      title: "Secure Uploads",
      description: "All MRI scans are encrypted and securely processed with strict privacy controls.",
      icon: <ShieldCheck size={28} className="text-primary" />,
    },
    {
      title: "Quick Analysis",
      description: "Get results in seconds with our optimized neural network architecture.",
      icon: <Activity size={28} className="text-primary" />,
    },
    {
      title: "Simple Interface",
      description: "Upload your MRI scan with a simple drag and drop interface.",
      icon: <FileUp size={28} className="text-primary" />,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white pointer-events-none" />
        
        <div className="container px-4 py-20 md:py-32 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-slideDown">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
              <span className="text-sm font-medium">AI-Powered Brain Tumor Detection</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Advanced Brain Tumor Detection <br />
              <span className="text-primary">Using Deep Learning</span>
            </h1>
            
            <p className="mb-8 text-lg text-foreground/80 max-w-2xl mx-auto">
              Our platform uses state-of-the-art machine learning algorithms to detect brain tumors from MRI scans with high accuracy, helping medical professionals make faster and more accurate diagnoses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="btn-primary text-base px-8 py-6">
                  Try It Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="btn-secondary text-base px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="w-full h-20 text-white fill-current"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V100.56C57.1,98.08,181.51,81.77,321.39,56.44Z" />
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-foreground/70">
              Our platform combines medical expertise with advanced deep learning technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "glass rounded-xl p-6 transform transition-all duration-500 hover:scale-105",
                  "animate-slideUp"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-4 mb-4 rounded-lg bg-primary/10 inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience the Future of Medical Imaging?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of medical professionals who trust our platform for fast and accurate brain tumor detection.
            </p>
            <Link to="/login">
              <Button variant="secondary" className="text-primary font-medium px-8 py-6 text-base">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Medical Professionals</h2>
            <p className="text-lg text-foreground/70">
              See what doctors and radiologists are saying about our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This tool has revolutionized how I diagnose brain tumors. The accuracy is impressive.",
                author: "Dr. Emily Chen",
                role: "Neurosurgeon",
              },
              {
                quote: "The speed and precision of the tumor detection has made a significant difference in my practice.",
                author: "Dr. Michael Rodriguez",
                role: "Radiologist",
              },
              {
                quote: "A game-changer for early tumor detection. The user interface is intuitive and the results are reliable.",
                author: "Dr. Sarah Johnson",
                role: "Oncologist",
              },
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="glass rounded-xl p-8 shadow-sm transition-all duration-300 
                hover:shadow-md hover:translate-y-[-5px] animate-slideUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <svg className="h-8 w-8 text-primary/40 mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-lg mb-4">{testimonial.quote}</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-foreground/70">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
