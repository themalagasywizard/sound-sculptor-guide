import React, { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Mic, Music2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Track } from "@/types/track";
import ProjectManager from "@/components/ProjectManager";
import TransportControls from "@/components/workspace/TransportControls";
import Timeline from "@/components/workspace/Timeline";
import Mixer from "@/components/daw/Mixer";
import PianoRoll from "@/components/daw/PianoRoll";
import AudioEditor from "@/components/daw/AudioEditor";

const Workspace = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [gridSnap, setGridSnap] = useState("1/4");
  const [zoom, setZoom] = useState(1);
  const [tracks, setTracks] = useState<Track[]>([]);
  const { toast } = useToast();

  const handleProjectLoad = (projectData: any) => {
    try {
      if (projectData.bpm) setBpm(projectData.bpm);
      if (projectData.tracks) setTracks(projectData.tracks);
      
      toast({
        title: "Project Loaded",
        description: "Project data has been successfully loaded",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load project data",
        variant: "destructive",
      });
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  const handleAddTrack = (type: "audio" | "midi") => {
    const newTrack: Track = {
      id: `track-${tracks.length + 1}`,
      name: `Track ${tracks.length + 1}`,
      type,
      color: `bg-${["purple", "blue", "amber", "green", "red"][tracks.length % 5]}-500`,
      isMuted: false,
      isSolo: false,
      volume: 0.8,
      pan: 0,
    };
    setTracks([...tracks, newTrack]);
  };

  const handleTrackUpdate = (updatedTrack: Track) => {
    setTracks(tracks.map((track) => 
      track.id === updatedTrack.id ? updatedTrack : track
    ));
  };

  const handleTrackDelete = (trackId: string) => {
    setTracks(tracks.filter((track) => track.id !== trackId));
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5));
  };

  return (
    <div className="h-screen bg-daw-background text-daw-text flex flex-col">
      <div className="flex items-center justify-between bg-daw-secondary p-4">
        <ProjectManager onProjectLoad={handleProjectLoad} />
      </div>

      <TransportControls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onStop={handleStop}
        bpm={bpm}
        onBpmChange={setBpm}
        metronomeEnabled={metronomeEnabled}
        onMetronomeToggle={() => setMetronomeEnabled(!metronomeEnabled)}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20}>
          <div className="h-full flex flex-col">
            <div className="p-2 flex gap-2">
              <Button size="sm" onClick={() => handleAddTrack("audio")} className="flex-1">
                <Mic className="w-4 h-4 mr-2" />
                Add Audio
              </Button>
              <Button size="sm" onClick={() => handleAddTrack("midi")} className="flex-1">
                <Music2 className="w-4 h-4 mr-2" />
                Add MIDI
              </Button>
            </div>
            <Mixer />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60}>
              <Timeline
                tracks={tracks}
                onTrackUpdate={handleTrackUpdate}
                onTrackDelete={handleTrackDelete}
                gridSnap={gridSnap}
                zoom={zoom}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              {selectedTrack ? (
                selectedTrack.startsWith("midi") ? (
                  <PianoRoll gridSnap={gridSnap} />
                ) : (
                  <AudioEditor />
                )
              ) : (
                <div className="flex items-center justify-center h-full text-daw-text/60">
                  Select a track to edit
                </div>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20}>
          <Mixer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Workspace;