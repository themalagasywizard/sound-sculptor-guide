import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume2 } from "lucide-react";

const ChannelRack = () => {
  const channels = [
    { id: 1, name: "Synth Lead", color: "bg-emerald-500" },
    { id: 2, name: "Bass", color: "bg-amber-500" },
    { id: 3, name: "Drums", color: "bg-purple-500" },
    { id: 4, name: "FX", color: "bg-blue-500" },
  ];

  return (
    <div className="bg-daw-secondary p-4 rounded-lg">
      <h2 className="text-xl font-bold text-daw-text mb-4">Channel Rack</h2>
      <div className="space-y-2">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="flex items-center gap-2 p-2 bg-daw-background/50 rounded"
          >
            <Button
              size="sm"
              variant="ghost"
              className={`${channel.color} w-8 h-8`}
            />
            <span className="text-daw-text flex-1">{channel.name}</span>
            <Volume2 className="text-daw-text/60 h-4 w-4" />
            <Slider
              defaultValue={[75]}
              max={100}
              step={1}
              className="w-24"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelRack;