import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Mic,
  Music2,
  Scissors,
  Repeat,
} from "lucide-react";
import WaveformVisualizer from "@/components/WaveformVisualizer";

const Workspace = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [bpm, setBpm] = React.useState(120);

  return (
    <div className="min-h-screen bg-daw-background text-daw-text p-4">
      {/* Transport Controls */}
      <div className="flex items-center justify-between bg-daw-secondary p-4 rounded-lg mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-daw-text hover:text-daw-accent"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-daw-text hover:text-daw-accent"
          >
            <SkipBack />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-daw-text hover:text-daw-accent"
          >
            <SkipForward />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">BPM:</span>
            <Input
              type="number"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-20 bg-daw-background text-daw-text"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Key:</span>
            <select className="bg-daw-background text-daw-text rounded px-2 py-1">
              <option>C Major</option>
              <option>A Minor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prompt Bar */}
      <div className="mb-6">
        <div className="relative">
          <Input
            placeholder="Adjust your music (e.g., 'Make the bass line more groovy')"
            className="bg-daw-secondary text-daw-text pl-4 pr-12 py-6 text-lg"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-daw-accent hover:text-daw-accent/80 hover:bg-transparent"
          >
            <Mic className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-daw-secondary rounded-lg p-4 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Music2 className="text-daw-accent" />
          <span className="font-semibold">Track 1</span>
          <Slider
            defaultValue={[75]}
            max={100}
            step={1}
            className="w-32"
          />
        </div>
        <WaveformVisualizer />
      </div>

      {/* Tool Panel */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-daw-secondary rounded-full px-6 py-3 flex gap-4">
        <Button variant="ghost" className="text-daw-text hover:text-daw-accent">
          Select
        </Button>
        <Button variant="ghost" className="text-daw-text hover:text-daw-accent">
          <Scissors className="mr-2" />
          Cut
        </Button>
        <Button variant="ghost" className="text-daw-text hover:text-daw-accent">
          <Repeat className="mr-2" />
          Loop
        </Button>
        <Button variant="ghost" className="text-daw-text hover:text-daw-accent">
          Quantize
        </Button>
      </div>
    </div>
  );
};

export default Workspace;