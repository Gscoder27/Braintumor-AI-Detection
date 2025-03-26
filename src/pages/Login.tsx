
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AuthForm from "@/components/AuthForm";
import { Brain } from "lucide-react";

const Login = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
        
        <div className="w-full max-w-md px-4 mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center">
              <Brain size={36} className="text-primary animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold mt-4">NeuroDetect</h1>
            <p className="text-foreground/70 mt-2">
              Access your account to use our brain tumor detection tool
            </p>
          </div>
          
          <AuthForm />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-foreground/70">
              By signing in, you agree to our
              <Link to="#" className="text-primary hover:underline mx-1">Terms of Service</Link>
              and
              <Link to="#" className="text-primary hover:underline mx-1">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
