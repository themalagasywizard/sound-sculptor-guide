import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Track } from "@/types/track";
import TrackControls from "./TrackControls";
import WaveformVisualizer from "../WaveformVisualizer";

interface TimelineProps {
  tracks: Track[];
  onTrackUpdate: (track: Track) => void;
  onTrackDelete: (trackId: string) => void;
  gridSnap: string;
  zoom: number;
}

const Timeline = ({
  tracks,
  onTrackUpdate,
  onTrackDelete,
  gridSnap,
  zoom,
}: TimelineProps) => {
  const handleMute = (trackId: string) => {
    const track = tracks.find((t) => t.id === trackId);
    if (track) {
      onTrackUpdate({ ...track, isMuted: !track.isMuted });
    }
  };

  const handleSolo = (trackId: string) => {
    const track = tracks.find((t) => t.id === trackId);
    if (track) {
      onTrackUpdate({ ...track, isSolo: !track.isSolo });
    }
  };

  const handleRename = (trackId: string, name: string) => {
    const track = tracks.find((t) => t.id === trackId);
    if (track) {
      onTrackUpdate({ ...track, name });
    }
  };

  const handleColorChange = (trackId: string, color: string) => {
    const track = tracks.find((t) => t.id === trackId);
    if (track) {
      onTrackUpdate({ ...track, color });
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2 p-4">
        {tracks.map((track) => (
          <div key={track.id} className="flex gap-2">
            <TrackControls
              track={track}
              onMute={handleMute}
              onSolo={handleSolo}
              onRename={handleRename}
              onColorChange={handleColorChange}
              onDelete={onTrackDelete}
            />
            <div
              className="flex-1 bg-daw-background/20 rounded p-2"
              style={{ transform: `scale(${zoom}, 1)` }}
            >
              <WaveformVisualizer />
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Timeline;