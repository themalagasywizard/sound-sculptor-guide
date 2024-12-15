import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Play,
  Pause,
  StopCircle,
  Bell,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface TransportControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  bpm: number;
  onBpmChange: (bpm: number) => void;
  metronomeEnabled: boolean;
  onMetronomeToggle: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const TransportControls = ({
  isPlaying,
  onPlayPause,
  onStop,
  bpm,
  onBpmChange,
  metronomeEnabled,
  onMetronomeToggle,
  onZoomIn,
  onZoomOut,
}: TransportControlsProps) => {
  return (
    <div className="flex items-center justify-between bg-daw-secondary p-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-daw-text hover:text-daw-accent"
          onClick={onPlayPause}
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-daw-text hover:text-daw-accent"
          onClick={onStop}
        >
          <StopCircle />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`${
            metronomeEnabled ? "text-daw-accent" : "text-daw-text"
          } hover:text-daw-accent`}
          onClick={onMetronomeToggle}
        >
          <Bell />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">BPM:</span>
          <Input
            type="number"
            value={bpm}
            onChange={(e) => onBpmChange(Number(e.target.value))}
            className="w-20 bg-daw-background text-daw-text"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onZoomOut}
            className="text-daw-text hover:text-daw-accent"
          >
            <ZoomOut />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onZoomIn}
            className="text-daw-text hover:text-daw-accent"
          >
            <ZoomIn />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransportControls;