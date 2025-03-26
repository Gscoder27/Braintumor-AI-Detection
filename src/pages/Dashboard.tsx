
import { useState } from "react";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import ResultDisplay from "@/components/ResultDisplay";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Upload } from "lucide-react";

const Dashboard = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const handleUploadComplete = (imageUrl: string) => {
    setUploadedImage(imageUrl);
  };
  
  const handleReset = () => {
    setUploadedImage(null);
  };

  return (
    <Layout>
      <div className="min-h-screen py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                <span className="text-sm font-medium">AI Analysis Tool</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Brain Tumor Detection</h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Upload an MRI scan to detect potential brain tumors using our advanced deep learning algorithm.
              </p>
            </div>
            
            {!uploadedImage ? (
              <div className="animate-fadeIn">
                <div className="glass rounded-xl p-8 mb-8">
                  <div className="text-center mb-6">
                    <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
                      <Upload size={24} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Upload MRI Scan</h2>
                    <p className="text-foreground/70 mt-2">
                      For accurate results, please upload a clear MRI scan image
                    </p>
                  </div>
                  
                  <FileUpload onUploadComplete={handleUploadComplete} />
                </div>
                
                <div className="text-center text-sm text-foreground/60">
                  <p className="mb-2">For testing purposes, you can upload any brain MRI scan image.</p>
                  <p>Your data is secure and confidential. We do not store uploaded images after analysis.</p>
                </div>
              </div>
            ) : (
              <div className="animate-fadeIn">
                <ResultDisplay imageUrl={uploadedImage} onReset={handleReset} />
              </div>
            )}
            
            <div className="mt-16 text-center">
              <Link to="/about">
                <Button variant="outline" size="sm" className="mr-4">
                  <Brain size={16} className="mr-2" />
                  Learn about our technology
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="sm">
                  Need help? Contact support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
