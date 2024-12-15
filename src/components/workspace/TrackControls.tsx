import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Volume2, Mic, Music2 } from "lucide-react";
import { Track } from "@/types/track";

interface TrackControlsProps {
  track: Track;
  onMute: (trackId: string) => void;
  onSolo: (trackId: string) => void;
  onRename: (trackId: string, name: string) => void;
  onColorChange: (trackId: string, color: string) => void;
  onDelete: (trackId: string) => void;
}

const TrackControls = ({
  track,
  onMute,
  onSolo,
  onRename,
  onColorChange,
  onDelete,
}: TrackControlsProps) => {
  return (
    <div className="flex items-center gap-2 p-2 bg-daw-background/50 rounded">
      <Input
        value={track.name}
        onChange={(e) => onRename(track.id, e.target.value)}
        className="w-32 bg-transparent"
      />
      <Button
        size="sm"
        variant={track.isMuted ? "default" : "ghost"}
        onClick={() => onMute(track.id)}
        className={`${track.isMuted ? "bg-red-500" : ""}`}
      >
        M
      </Button>
      <Button
        size="sm"
        variant={track.isSolo ? "default" : "ghost"}
        onClick={() => onSolo(track.id)}
        className={`${track.isSolo ? "bg-yellow-500" : ""}`}
      >
        S
      </Button>
      <select
        value={track.color}
        onChange={(e) => onColorChange(track.id, e.target.value)}
        className="bg-transparent border rounded px-2"
      >
        <option value="bg-purple-500">Purple</option>
        <option value="bg-blue-500">Blue</option>
        <option value="bg-green-500">Green</option>
        <option value="bg-amber-500">Amber</option>
        <option value="bg-red-500">Red</option>
      </select>
      {track.type === "audio" ? (
        <Mic className="text-daw-accent h-4 w-4" />
      ) : (
        <Music2 className="text-daw-accent h-4 w-4" />
      )}
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onDelete(track.id)}
        className="text-red-500 hover:text-red-600"
      >
        Delete
      </Button>
    </div>
  );
};

export default TrackControls;