import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Brain, FileUp, Image, X } from "lucide-react";
import { uploadScanImage } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/supabase";

interface FileUploadProps {
  onUploadComplete: (imageUrl: string) => void;
}

const FileUpload = ({ onUploadComplete }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (uploadedFile: File) => {
    if (!uploadedFile.type.match('image.*')) {
      toast.error("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }
    
    if (uploadedFile.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }
    
    setFile(uploadedFile);
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    
    setUploading(true);
    
    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 100);
      
      const { user, error: userError } = await getCurrentUser();
      
      if (userError || !user) {
        throw new Error("You must be logged in to upload files");
      }
      
      const { publicUrl, error } = await uploadScanImage(user.id, file);
      
      if (error) {
        throw error;
      }
      
      clearInterval(progressInterval);
      setProgress(100);
      
      onUploadComplete(publicUrl);
      toast.success("MRI scan uploaded successfully");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {!preview ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-12 transition-all duration-300 text-center cursor-pointer",
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50 hover:bg-secondary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-primary/10">
              <FileUp size={36} className="text-primary" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Upload MRI Scan</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Drag and drop your MRI scan image, or click to browse
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 text-xs text-muted-foreground">
              <span className="px-3 py-1 rounded-full bg-secondary">JPEG</span>
              <span className="px-3 py-1 rounded-full bg-secondary">PNG</span>
              <span className="px-3 py-1 rounded-full bg-secondary">DICOM</span>
              <span className="px-3 py-1 rounded-full bg-secondary">Max 10MB</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg border shadow-sm">
            <img 
              src={preview} 
              alt="MRI Preview" 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={clearFile}
              className="absolute top-2 right-2 p-1 rounded-full bg-foreground/10 backdrop-blur-sm hover:bg-foreground/20 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{file?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file?.size ? (file.size / (1024 * 1024)).toFixed(2) : 0)} MB
                </p>
              </div>
              
              <Button
                onClick={clearFile}
                variant="outline"
                className="btn-secondary"
              >
                Change
              </Button>
            </div>
            
            {uploading ? (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
              </div>
            ) : (
              <Button
                onClick={uploadFile}
                className="w-full btn-primary"
              >
                <Image className="mr-2 h-4 w-4" />
                Analyze MRI Scan
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
