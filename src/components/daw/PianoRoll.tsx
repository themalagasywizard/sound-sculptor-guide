import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const PianoRoll = () => {
  const notes = ["C", "B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#"];
  const octaves = [5, 4, 3, 2];

  return (
    <div className="bg-daw-secondary p-4 rounded-lg">
      <h2 className="text-xl font-bold text-daw-text mb-4">Piano Roll</h2>
      <ScrollArea className="h-[300px]">
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