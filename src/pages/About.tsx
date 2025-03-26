
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Award, LineChart, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      bio: "Board-certified neurologist with over 15 years of experience in brain imaging analysis.",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Dr. Alex Chen",
      role: "Lead AI Researcher",
      bio: "PhD in Computer Vision with extensive experience in developing medical imaging algorithms.",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      name: "Emma Rodriguez",
      role: "Software Engineer",
      bio: "Specialized in developing user-friendly medical applications with 8+ years of experience.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Dr. Michael Chang",
      role: "Neuroradiologist",
      bio: "Expert in MRI scan interpretation with a focus on brain tumor identification.",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  ];

  const timeline = [
    {
      year: "2018",
      title: "Research Begins",
      description: "Initial research on applying machine learning to brain MRI scans.",
    },
    {
      year: "2019",
      title: "Algorithm Development",
      description: "Development of the first version of our tumor detection algorithm.",
    },
    {
      year: "2020",
      title: "Clinical Trials",
      description: "First clinical trials with partner hospitals to validate our technology.",
    },
    {
      year: "2021",
      title: "Platform Launch",
      description: "Official launch of the NeuroDetect platform for medical professionals.",
    },
    {
      year: "2022",
      title: "Expanded Features",
      description: "Addition of detailed analysis tools and integration with hospital systems.",
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expansion to international markets and continued algorithm improvements.",
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
              <span className="text-sm font-medium">About NeuroDetect</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Advanced Technology with a <span className="text-primary">Human Touch</span>
            </h1>
            
            <p className="text-lg text-foreground/70 mb-8">
              We combine cutting-edge deep learning technology with medical expertise to revolutionize brain tumor detection and help save lives.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Our Mission</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </div>
            
            <div className="glass rounded-xl p-8 text-center">
              <p className="text-xl text-foreground/80 italic">
                "To harness the power of artificial intelligence in order to revolutionize brain tumor detection, making accurate diagnosis more accessible and efficient for healthcare providers worldwide."
              </p>
              
              <div className="mt-6 inline-flex items-center justify-center p-2 rounded-full bg-primary/10">
                <Brain size={24} className="text-primary" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: <Brain size={40} className="text-primary" />,
                  title: "Innovation",
                  description: "Pushing the boundaries of what's possible with medical AI technology.",
                },
                {
                  icon: <Award size={40} className="text-primary" />,
                  title: "Excellence",
                  description: "Committed to the highest standards in healthcare technology.",
                },
                {
                  icon: <LineChart size={40} className="text-primary" />,
                  title: "Impact",
                  description: "Making a meaningful difference in patient outcomes worldwide.",
                },
              ].map((value, index) => (
                <div 
                  key={index} 
                  className="text-center glass rounded-xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-foreground/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-secondary/30 dark:bg-secondary/10">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Team</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Meet our dedicated team of medical experts and technologists working to revolutionize brain tumor detection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="glass rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-foreground/70 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Journey</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              From research to global implementation, see how NeuroDetect has evolved.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
            
            {/* Timeline events */}
            <div className="space-y-12 relative">
              {timeline.map((event, index) => (
                <div 
                  key={index}
                  className={cn(
                    "relative flex items-center",
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  )}
                >
                  {/* Content */}
                  <div className={cn(
                    "w-5/12 px-4",
                    index % 2 === 0 ? "text-right" : "text-left"
                  )}>
                    <div className="glass rounded-xl p-6 inline-block">
                      <div className="text-primary font-bold text-xl mb-2">{event.year}</div>
                      <h3 className="text-foreground font-bold text-lg mb-2">{event.title}</h3>
                      <p className="text-foreground/70">{event.description}</p>
                    </div>
                  </div>
                  
                  {/* Circle marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary/10 border-4 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  
                  {/* Empty space for the other side */}
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 mb-6">
              <BookOpen size={24} className="text-white" />
            </div>
            
            <h2 className="text-3xl font-bold mb-6">Ready to Experience Advanced Brain Tumor Detection?</h2>
            
            <p className="text-xl opacity-80 mb-8">
              Join healthcare professionals around the world who trust NeuroDetect
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="bg-white text-primary hover:bg-white/90 text-base px-8 py-6">
                  Try It Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 text-base px-8 py-6">
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
