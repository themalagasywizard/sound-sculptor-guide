import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Volume2, Mic, Music2 } from "lucide-react";
import WaveformVisualizer from "../WaveformVisualizer";
import { Track } from "@/types/track";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Playlist = () => {
  const [tracks, setTracks] = useState<Track[]>([
    { id: "1", name: "Track 1", type: "audio", color: "bg-purple-500", isMuted: false, isSolo: false, volume: 0.8, pan: 0 },
    { id: "2", name: "Track 2", type: "midi", color: "bg-blue-500", isMuted: false, isSolo: false, volume: 0.8, pan: 0 },
    { id: "3", name: "Track 3", type: "audio", color: "bg-amber-500", isMuted: false, isSolo: false, volume: 0.8, pan: 0 },
  ]);

  const handleTrackNameChange = (trackId: string, newName: string) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, name: newName } : track
    ));
  };

  const toggleMute = (trackId: string) => {
    setTracks(tracks.map(track =>
      track.id === trackId ? { ...track, isMuted: !track.isMuted } : track
    ));
  };

  const toggleSolo = (trackId: string) => {
    setTracks(tracks.map(track =>
      track.id === trackId ? { ...track, isSolo: !track.isSolo } : track
    ));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tracks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTracks(items);
  };

  const addNewTrack = () => {
    const newTrack: Track = {
      id: `track-${tracks.length + 1}`,
      name: `Track ${tracks.length + 1}`,
      type: "audio",
      color: `bg-${['purple', 'blue', 'amber', 'green', 'red'][tracks.length % 5]}-500`,
      isMuted: false,
      isSolo: false,
      volume: 0.8,
      pan: 0,
    };
    setTracks([...tracks, newTrack]);
  };

  return (
    <div className="bg-daw-secondary p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-daw-text">Playlist</h2>
        <Button onClick={addNewTrack} variant="outline" className="text-daw-accent">
          Add Track
        </Button>
      </div>
      <ScrollArea className="h-[400px]">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tracks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {tracks.map((track, index) => (
                  <Draggable key={track.id} draggableId={track.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex gap-2"
                      >
                        <div className="w-48 flex-shrink-0 p-2 bg-daw-background/50 rounded flex flex-col gap-2">
                          <Input
                            value={track.name}
                            onChange={(e) => handleTrackNameChange(track.id, e.target.value)}
                            className="bg-transparent border-none text-daw-text"
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={track.isMuted ? "default" : "ghost"}
                              onClick={() => toggleMute(track.id)}
                              className={`${track.isMuted ? 'bg-red-500' : ''} flex-1`}
                            >
                              M
                            </Button>
                            <Button
                              size="sm"
                              variant={track.isSolo ? "default" : "ghost"}
                              onClick={() => toggleSolo(track.id)}
                              className={`${track.isSolo ? 'bg-yellow-500' : ''} flex-1`}
                            >
                              S
                            </Button>
                            {track.type === 'audio' ? (
                              <Mic className="text-daw-accent h-4 w-4" />
                            ) : (
                              <Music2 className="text-daw-accent h-4 w-4" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 bg-daw-background/20 rounded p-2">
                          <WaveformVisualizer />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollArea>
    </div>
  );
};

export default Playlist;