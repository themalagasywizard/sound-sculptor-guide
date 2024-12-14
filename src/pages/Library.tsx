import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Upload, Music2, AudioWaveform } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SoundPreview from "@/components/SoundPreview";
import SoundUploader from "@/components/SoundUploader";
import { fileSystem, AudioFile } from "@/lib/fileSystem";

const Library = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const categories = ["Drums", "Bass", "Melody", "Effects"];
  const [sounds, setSounds] = useState<AudioFile[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleFileUpload(files);
  }, []);

  const handleFileUpload = async (files: File[]) => {
    if (!files?.length) return;

    setIsUploading(true);
    try {
      const hasPermission = await fileSystem.requestPermission();
      if (!hasPermission) {
        toast({
          title: "Permission Denied",
          description: "Please grant permission to save files locally.",
          variant: "destructive",
        });
        return;
      }

      for (const file of files) {
        if (!file.type.startsWith('audio/')) {
          toast({
            title: "Invalid file type",
            description: "Please upload audio files only",
            variant: "destructive",
          });
          continue;
        }

        const audioFile = await fileSystem.saveAudioToLibrary(file, "Drums");
        setSounds(prev => [...prev, audioFile]);
      }

      toast({
        title: "Upload successful",
        description: "Your sounds have been added to the library",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your sounds",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div 
      className={`min-h-screen bg-daw-background p-6 ${
        dragOver ? 'bg-opacity-90' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-daw-text/60" />
            <Input
              placeholder="Search sounds (e.g., kick, snare, synth)"
              className="pl-10 bg-daw-secondary text-daw-text border-none"
            />
          </div>
          <SoundUploader 
            onUpload={(files) => files && handleFileUpload(Array.from(files))} 
            isUploading={isUploading} 
          />
        </div>

        <Tabs defaultValue={categories[0].toLowerCase()} className="w-full">
          <TabsList className="bg-daw-secondary w-full justify-start">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category.toLowerCase()}
                className="text-daw-text data-[state=active]:bg-daw-accent"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent
              key={category}
              value={category.toLowerCase()}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
            >
              {sounds
                .filter((sound) => sound.category === category)
                .map((sound) => (
                  <SoundPreview key={sound.id} sound={sound} />
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Library;