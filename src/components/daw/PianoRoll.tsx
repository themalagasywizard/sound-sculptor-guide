import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Music, ArrowUpDown } from "lucide-react";

interface PianoRollProps {
  gridSnap: string;
}

const PianoRoll = ({ gridSnap }: PianoRollProps) => {
  const notes = ["C", "B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#"];
  const octaves = [5, 4, 3, 2];
  const [velocity, setVelocity] = React.useState(100);
  const [quantizeValue, setQuantizeValue] = React.useState("1/4");

  return (
    <div className="bg-daw-secondary p-4 rounded-lg h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-daw-text">Piano Roll</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <select
              value={quantizeValue}
              onChange={(e) => setQuantizeValue(e.target.value)}
              className="bg-daw-background text-daw-text p-1 rounded"
            >
              <option value="1/4">1/4</option>
              <option value="1/8">1/8</option>
              <option value="1/16">1/16</option>
              <option value="1/32">1/32</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            <Slider
              value={[velocity]}
              onValueChange={(value) => setVelocity(value[0])}
              max={127}
              step={1}
              className="w-32"
            />
            <span className="text-sm w-8">{velocity}</span>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex">
          <div className="w-12 flex-shrink-0">
            {octaves.map((octave) =>
              notes.map((note) => (
                <div
                  key={`${note}${octave}`}
                  className={`h-6 border-b border-daw-background/20 flex items-center justify-center ${
                    note.includes("#")
                      ? "bg-daw-background/40 text-daw-text/60"
                      : "bg-daw-background/20 text-daw-text"
                  }`}
                >
                  <span className="text-xs">{`${note}${octave}`}</span>
                </div>
              ))
            )}
          </div>
          <div className="flex-1 grid grid-cols-16 gap-px bg-daw-background/10">
            {Array.from({ length: 16 * notes.length * octaves.length }).map((_, i) => (
              <div
                key={i}
                className="h-6 border-b border-daw-background/10 hover:bg-daw-accent/20"
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PianoRoll;