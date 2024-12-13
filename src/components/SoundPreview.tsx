import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import WaveformVisualizer from "./WaveformVisualizer";

interface SoundPreviewProps {
  sound: {
    id: number;
    name: string;
    category: string;
    duration: string;
  };
}

const SoundPreview = ({ sound }: SoundPreviewProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <Card className="bg-daw-secondary p-4 hover:bg-opacity-80 transition-all cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-daw-accent hover:text-daw-accent/80 hover:bg-transparent"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <span className="text-sm text-daw-text/60">{sound.duration}</span>
      </div>
      <WaveformVisualizer />
      <h3 className="text-lg font-semibold text-daw-text mt-3">{sound.name}</h3>
      <p className="text-sm text-daw-text/60">{sound.category}</p>
    </Card>
  );
};

export default SoundPreview;