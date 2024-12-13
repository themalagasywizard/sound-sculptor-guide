import React from "react";
import { Slider } from "@/components/ui/slider";
import { Volume2, Mic } from "lucide-react";

const Mixer = () => {
  const tracks = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Track ${i + 1}`,
    volume: 75,
    pan: 0,
  }));

  return (
    <div className="bg-daw-secondary p-4 rounded-lg">
      <h2 className="text-xl font-bold text-daw-text mb-4">Mixer</h2>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="flex flex-col items-center min-w-[100px] gap-2 p-2 bg-daw-background/50 rounded"
          >
            <span className="text-daw-text text-sm">{track.name}</span>
            <Slider
              defaultValue={[track.volume]}
              max={100}
              step={1}
              orientation="vertical"
              className="h-32"
            />
            <Volume2 className="text-daw-text/60 h-4 w-4" />
            <Mic className="text-daw-accent h-4 w-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mixer;