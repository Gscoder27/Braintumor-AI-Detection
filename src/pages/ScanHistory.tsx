
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Clock, Brain, AlertTriangle } from "lucide-react";
import { getUserScans, getCurrentUser } from "@/lib/supabase";
import { Link } from "react-router-dom";

interface ScanRecord {
  id: string;
  user_id: string;
  image_path: string;
  result_data: any;
  created_at: string;
}

const ScanHistory = () => {
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const { user, error: userError } = await getCurrentUser();
        
        if (userError || !user) {
          throw new Error("You must be logged in to view your scan history");
        }
        
        const { data, error } = await getUserScans(user.id);
        
        if (error) {
          throw error;
        }
        
        setScans(data || []);
      } catch (error: any) {
        console.error("Error fetching scan history:", error);
        toast.error(error.message || "Failed to load scan history");
      } finally {
        setLoading(false);
      }
    };
    
    fetchScans();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="min-h-screen py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Scan History</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Your MRI Scan History</h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Review all your previous MRI scans and analysis results
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            ) : scans.length === 0 ? (
              <Card className="text-center py-16 glass">
                <CardContent>
                  <Brain size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No scan history found</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't performed any MRI scan analysis yet
                  </p>
                  <Link to="/dashboard">
                    <Button className="btn-primary">Upload Your First Scan</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="all" className="transition duration-300 hover:bg-primary/10">All Scans</TabsTrigger>
                    <TabsTrigger value="positive" className="transition duration-300 hover:bg-primary/10">Positive Results</TabsTrigger>
                    <TabsTrigger value="negative" className="transition duration-300 hover:bg-primary/10">Negative Results</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-6">
                    {scans.map((scan) => (
                      <ScanCard key={scan.id} scan={scan} formatDate={formatDate} />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="positive" className="space-y-6">
                    {scans.filter(scan => scan.result_data.hasTumor).map((scan) => (
                      <ScanCard key={scan.id} scan={scan} formatDate={formatDate} />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="negative" className="space-y-6">
                    {scans.filter(scan => !scan.result_data.hasTumor).map((scan) => (
                      <ScanCard key={scan.id} scan={scan} formatDate={formatDate} />
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface ScanCardProps {
  scan: ScanRecord;
  formatDate: (date: string) => string;
}

const ScanCard = ({ scan, formatDate }: ScanCardProps) => {
  const result = scan.result_data;
  const hasTumor = result?.hasTumor || false;
  
  return (
    <Card className="glass overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="bg-muted aspect-square md:aspect-auto">
          <img 
            src={scan.image_path} 
            alt="MRI Scan" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-3 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Scan #{scan.id.substring(0, 8)}</h3>
              <p className="text-sm text-muted-foreground">{formatDate(scan.created_at)}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${hasTumor ? 'bg-destructive/10 text-destructive' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
              {hasTumor ? 'Tumor Detected' : 'No Tumor Found'}
            </div>
          </div>
          
          <div className="space-y-4">
            {hasTumor && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <p className="text-sm text-destructive font-medium">
                  {result.tumorType} detected with {result.confidence}% confidence
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              {hasTumor && (
                <>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-medium">{result.tumorType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{result.location}</p>
                  </div>
                </>
              )}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Confidence</p>
                <p className="text-sm font-medium">{result.confidence}%</p>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Link to={`/scan/${scan.id}`}>
                <Button size="sm" variant="outline" className="text-xs">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScanHistory;
