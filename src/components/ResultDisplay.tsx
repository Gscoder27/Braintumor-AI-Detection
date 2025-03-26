
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, Download, FileText, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { analyzeImage, AnalysisResult } from "@/utils/modelIntegration";
import { saveScanRecord, getCurrentUser } from "@/lib/supabase";

interface ResultDisplayProps {
  imageUrl: string;
  onReset: () => void;
}

// Brain regions for more accurate location reporting
const brainRegions = {
  frontal: "Frontal Lobe",
  temporal: "Temporal Lobe",
  parietal: "Parietal Lobe",
  occipital: "Occipital Lobe",
  cerebellum: "Cerebellum",
  brainstem: "Brainstem"
};

const ResultDisplay = ({ imageUrl, onReset }: ResultDisplayProps) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [recordSaved, setRecordSaved] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const performAnalysis = async () => {
      try {
        // Simulate progress during analysis
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + 2;
            return newProgress > 95 ? 95 : newProgress; // Cap at 95% until complete
          });
        }, 100);
        
        // Analyze the image using the model integration
        const analysisResult = await analyzeImage(imageUrl);
        
        // Ensure component is still mounted before updating state
        if (isMounted) {
          clearInterval(progressInterval);
          setProgress(100);
          setResult(analysisResult);
          setLoading(false);
          
          // Save the scan result to the database
          const { user } = await getCurrentUser();
          if (user) {
            await saveScanRecord(user.id, imageUrl, analysisResult);
            setRecordSaved(true);
          }
          
          // Alert user about critical finding
          if (analysisResult.confidence > 90) {
            toast.error("Critical finding detected", {
              description: "High confidence tumor detection requires immediate medical attention",
              duration: 5000,
            });
          }
        }
      } catch (error: any) {
        if (isMounted) {
          console.error("Analysis error:", error);
          setLoading(false);
          toast.error(error.message || "Analysis failed. Please try again.");
        }
      }
    };
    
    performAnalysis();
    
    // Cleanup
    return () => {
      isMounted = false;
    };
  }, [imageUrl]);

  const downloadReport = () => {
    // In a real application, this would generate a PDF report
    const reportData = {
      patientId: `P${Math.floor(Math.random() * 10000)}`,
      scanDate: new Date().toISOString(),
      result: result,
      recommendedAction: result?.hasTumor ? "Consult with neurosurgeon immediately" : "Regular follow-up in 6 months"
    };
    
    // For demo, just show what would be included
    toast.info("Report generated", {
      description: "A PDF report would download with detailed analysis"
    });
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
                  {result?.hasTumor && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/20 border border-destructive/30">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <p className="text-sm font-medium text-destructive">Critical finding detected</p>
                    </div>
                  )}
                  
                  <div className={`p-4 rounded-lg ${result?.hasTumor ? 'bg-destructive/10' : 'bg-green-100 dark:bg-green-900/30'}`}>
                    <h3 className={`text-lg font-medium ${result?.hasTumor ? 'text-destructive' : 'text-green-700 dark:text-green-300'}`}>
                      {result?.hasTumor ? 'Tumor Detected' : 'No Tumor Detected'}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm">
                        Confidence: {result?.confidence}%
                      </p>
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${result?.confidence && result.confidence > 90 ? 'bg-destructive' : 'bg-primary'}`} 
                          style={{width: `${result?.confidence}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {result?.hasTumor && (
                    <>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Tumor Type</p>
                            <p className="font-medium">{result.tumorType}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{result.location}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Size</p>
                            <p className="font-medium">{result.size}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Severity</p>
                            <p className="font-medium text-destructive">High</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Characteristics</h4>
                          <ul className="space-y-1">
                            {result.details?.map((detail, index) => (
                              <li key={index} className="text-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-2">
                          <h4 className="text-sm font-medium mb-2">Recommendation</h4>
                          <p className="text-sm text-muted-foreground">
                            Please consult with a neurosurgeon as soon as possible for a thorough evaluation and personalized treatment plan.
                            {result.tumorType === "Meningioma" && " Meningiomas often require surgical intervention, especially when located in the frontal lobe."}
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
