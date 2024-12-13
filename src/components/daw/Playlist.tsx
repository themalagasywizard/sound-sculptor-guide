import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import WaveformVisualizer from "../WaveformVisualizer";

const Playlist = () => {
  const tracks = [
    { id: 1, name: "Vocals", color: "bg-purple-500" },
    { id: 2, name: "Drums", color: "bg-blue-500" },
    { id: 3, name: "Bass", color: "bg-amber-500" },
  ];

  return (
    <div className="bg-daw-secondary p-4 rounded-lg">
      <h2 className="text-xl font-bold text-daw-text mb-4">Playlist</h2>
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {tracks.map((track) => (
            <div key={track.id} className="flex gap-2">
              <div className="w-32 flex-shrink-0 p-2 bg-daw-background/50 rounded">
                <span className="text-daw-text text-sm">{track.name}</span>
              </div>
              <div className="flex-1 bg-daw-background/20 rounded p-2">
                <WaveformVisualizer />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Playlist;