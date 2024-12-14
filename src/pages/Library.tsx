import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Upload, Music2, AudioWaveform } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SoundPreview from "@/components/SoundPreview";
import SoundUploader from "@/components/SoundUploader";

const Library = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const categories = ["Drums", "Bass", "Melody", "Effects"];
  const [sounds, setSounds] = useState([
    { id: 1, name: "Kick 808", category: "Drums", duration: "0:02", audioUrl: "" },
    { id: 2, name: "Deep Bass", category: "Bass", duration: "0:04", audioUrl: "" },
    { id: 3, name: "Synth Lead", category: "Melody", duration: "0:08", audioUrl: "" },
  ]);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files?.length) return;

    setIsUploading(true);
    try {
      // Process each file
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('audio/')) {
          toast({
            title: "Invalid file type",
            description: "Please upload audio files only",
            variant: "destructive",
          });
          continue;
        }

        // Create audio element to get duration
        const audio = new Audio();
        audio.src = URL.createObjectURL(file);
        
        await new Promise((resolve) => {
          audio.onloadedmetadata = () => {
            const duration = `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60).toString().padStart(2, '0')}`;
            
            // Add new sound to the library
            setSounds(prev => [...prev, {
              id: Date.now(),
              name: file.name.replace(/\.[^/.]+$/, ""),
              category: "Drums", // Default category, can be changed by user
              duration,
              audioUrl: URL.createObjectURL(file)
            }]);
            resolve(null);
          };
        });
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
    <div className="min-h-screen bg-daw-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-daw-text/60" />
            <Input
              placeholder="Search sounds (e.g., kick, snare, synth)"
              className="pl-10 bg-daw-secondary text-daw-text border-none"
            />
          </div>
          <SoundUploader onUpload={handleFileUpload} isUploading={isUploading} />
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