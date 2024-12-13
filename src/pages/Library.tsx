import React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Folder, Music2, AudioWaveform } from "lucide-react";
import SoundPreview from "@/components/SoundPreview";

const Library = () => {
  const categories = ["Drums", "Bass", "Melody", "Effects"];
  const sampleSounds = [
    { id: 1, name: "Kick 808", category: "Drums", duration: "0:02" },
    { id: 2, name: "Deep Bass", category: "Bass", duration: "0:04" },
    { id: 3, name: "Synth Lead", category: "Melody", duration: "0:08" },
  ];

  return (
    <div className="min-h-screen bg-daw-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-daw-text/60" />
          <Input
            placeholder="Search sounds (e.g., kick, snare, synth)"
            className="pl-10 bg-daw-secondary text-daw-text border-none"
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
              {sampleSounds
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