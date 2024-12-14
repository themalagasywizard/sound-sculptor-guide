import React, { useRef, useState } from "react";
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
    audioUrl?: string;
  };
}

const SoundPreview = ({ sound }: SoundPreviewProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  React.useEffect(() => {
    if (sound.audioUrl) {
      audioRef.current = new Audio(sound.audioUrl);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, [sound.audioUrl]);

  return (
    <Card className="bg-daw-secondary p-4 hover:bg-opacity-80 transition-all cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-daw-accent hover:text-daw-accent/80 hover:bg-transparent"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <span className="text-sm text-daw-text/60">{sound.duration}</span>
      </div>
      <WaveformVisualizer isPlaying={isPlaying} />
      <h3 className="text-lg font-semibold text-daw-text mt-3">{sound.name}</h3>
      <p className="text-sm text-daw-text/60">{sound.category}</p>
    </Card>
  );
};

export default SoundPreview;