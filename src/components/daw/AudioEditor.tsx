import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import WaveformVisualizer from "../WaveformVisualizer";
import { Volume2, ArrowLeftRight } from "lucide-react";

const AudioEditor = () => {
  const [volume, setVolume] = React.useState(100);
  const [pitch, setPitch] = React.useState(0);
  const [timeStretch, setTimeStretch] = React.useState(100);

  return (
    <div className="h-full bg-daw-secondary p-4 rounded-lg">
      <h2 className="text-xl font-bold text-daw-text mb-4">Audio Editor</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-daw-text">Volume</label>
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={150}
              step={1}
            />
            <span className="text-sm w-8">{volume}%</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-daw-text">Pitch</label>
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            <Slider
              value={[pitch]}
              onValueChange={(value) => setPitch(value[0])}
              min={-12}
              max={12}
              step={1}
            />
            <span className="text-sm w-8">{pitch}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-daw-text">Time Stretch</label>
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            <Slider
              value={[timeStretch]}
              onValueChange={(value) => setTimeStretch(value[0])}
              min={50}
              max={200}
              step={1}
            />
            <span className="text-sm w-12">{timeStretch}%</span>
          </div>
        </div>
      </div>
      <ScrollArea className="h-[calc(100%-8rem)]">
        <WaveformVisualizer isPlaying={false} />
      </ScrollArea>
    </div>
  );
};

export default AudioEditor;