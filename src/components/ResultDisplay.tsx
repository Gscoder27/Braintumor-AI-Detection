
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, Download, FileText } from "lucide-react";

interface ResultDisplayProps {
  imageUrl: string;
  onReset: () => void;
}

const ResultDisplay = ({ imageUrl, onReset }: ResultDisplayProps) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    hasTumor: boolean;
    confidence: number;
    tumorType?: string;
    location?: string;
  } | null>(null);

  useEffect(() => {
    const analyzeImage = async () => {
      // Simulate analysis with progress
      for (let i = 0; i <= 100; i += 5) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // In a real application, you would send the image to your ML model API
      // const response = await fetch('/api/analyze', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ imageUrl }),
      // });
      // const data = await response.json();
      
      // For demo purposes, randomly generate a result
      const demoResult = {
        hasTumor: Math.random() > 0.5,
        confidence: Math.round(Math.random() * 40 + 60), // 60-100%
        tumorType: Math.random() > 0.5 ? "Glioblastoma" : "Meningioma",
        location: Math.random() > 0.5 ? "Frontal Lobe" : "Temporal Lobe",
      };
      
      setResult(demoResult);
      setLoading(false);
    };
    
    analyzeImage();
  }, [imageUrl]);

  const downloadReport = () => {
    // In a real application, this would generate a PDF report
    alert("Report download would be implemented here");
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card className="overflow-hidden h-full glass">
            <CardHeader className="pb-2">
              <CardTitle>MRI Scan</CardTitle>
              <CardDescription>Original uploaded image</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="aspect-square w-full overflow-hidden rounded-md border">
                <img 
                  src={imageUrl} 
                  alt="MRI Scan" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full glass">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                AI-powered brain tumor detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4 py-8">
                  <div className="flex justify-center">
                    <div className="relative h-20 w-20">
                      <Brain size={80} className="text-primary animate-pulse" />
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-center text-sm text-muted-foreground">
                    Analyzing MRI scan... {progress}%
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={`p-4 rounded-lg ${result?.hasTumor ? 'bg-destructive/10' : 'bg-green-100'}`}>
                    <h3 className={`text-lg font-medium ${result?.hasTumor ? 'text-destructive' : 'text-green-700'}`}>
                      {result?.hasTumor ? 'Tumor Detected' : 'No Tumor Detected'}
                    </h3>
                    <p className="text-sm mt-1">
                      Confidence: {result?.confidence}%
                    </p>
                  </div>
                  
                  {result?.hasTumor && (
                    <>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Tumor Type</p>
                            <p className="font-medium">{result.tumorType}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{result.location}</p>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <h4 className="text-sm font-medium mb-2">Recommendation</h4>
                          <p className="text-sm text-muted-foreground">
                            Please consult with a neurosurgeon as soon as possible for a thorough evaluation and personalized treatment plan.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground italic">
                      Disclaimer: This is an AI-assisted analysis and should not be used as a definitive medical diagnosis. Always consult with healthcare professionals.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {!loading && (
                <>
                  <Button onClick={onReset} variant="outline" className="btn-secondary">
                    Analyze New Scan
                  </Button>
                  <Button onClick={downloadReport} className="btn-primary">
                    <Download size={16} className="mr-2" />
                    Download Report
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
