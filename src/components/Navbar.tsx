import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl text-foreground">NeuroDetect</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
                  location.pathname === link.to && "text-primary font-medium after:scale-x-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login">
              <Button 
                variant="outline" 
                className="bg-transparent border border-black/70 hover:bg-primary hover:text-primary-foreground transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 bg-primary transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 origin-right"></span>
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t animate-slideDown">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "py-2 px-4 rounded-md hover:bg-secondary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
                  location.pathname === link.to && "bg-secondary font-medium after:scale-x-100"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/login" className="mt-2">
              <Button 
                variant="outline" 
                className="w-full bg-transparent border border-black/70 hover:bg-primary hover:text-primary-foreground transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 bg-primary transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 origin-right"></span>
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
