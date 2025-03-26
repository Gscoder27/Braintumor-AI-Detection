
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Brain, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        scrolled ? "glass shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink 
          to="/" 
          className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors"
        >
          <Brain size={28} className="animate-pulse" />
          <span className="font-bold text-xl hidden sm:inline">NeuroDetect</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "text-base font-medium transition-all duration-300 relative hover:text-primary",
                isActive 
                  ? "text-primary after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : "text-foreground/80"
              )}
            >
              {item.name}
            </NavLink>
          ))}
          
          <NavLink
            to="/login"
            className="btn-primary py-2"
          >
            Login
          </NavLink>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-foreground focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
      
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-64 glass z-50 p-6 transition-transform duration-300 ease-in-out transform md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-xl text-primary">NeuroDetect</span>
            <button onClick={() => setIsOpen(false)}>
              <X size={24} className="text-foreground" />
            </button>
          </div>
          
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "text-base font-medium transition-colors py-2",
                  isActive ? "text-primary" : "text-foreground/80"
                )}
              >
                {item.name}
              </NavLink>
            ))}
            
            <NavLink to="/login" className="btn-primary text-center mt-4">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
