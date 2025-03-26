
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="text-center max-w-md animate-fadeIn">
        <div className="mb-6">
          <div className="text-9xl font-bold text-primary/20">404</div>
          <h1 className="text-3xl font-bold mt-4">Page Not Found</h1>
        </div>

        <p className="text-lg text-foreground/70 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <Button className="btn-primary">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
