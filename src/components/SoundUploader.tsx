import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface SoundUploaderProps {
  onUpload: (files: FileList | null) => void;
  isUploading: boolean;
}

const SoundUploader = ({ onUpload, isUploading }: SoundUploaderProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => onUpload(e.target.files)}
        className="hidden"
        accept="audio/*"
        multiple
      />
      <Button
        onClick={handleClick}
        disabled={isUploading}
        className="bg-daw-accent hover:bg-daw-accent/80"
      >
        <Upload className="mr-2" />
        {isUploading ? "Uploading..." : "Upload Sounds"}
      </Button>
    </div>
  );
};

export default SoundUploader;