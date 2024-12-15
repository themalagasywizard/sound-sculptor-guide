import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Mic,
  Music2,
  StopCircle,
  CircleDot,
  Download,
  Bell,
} from "lucide-react";
import ChannelRack from "@/components/daw/ChannelRack";
import Mixer from "@/components/daw/Mixer";
import PianoRoll from "@/components/daw/PianoRoll";
import Playlist from "@/components/daw/Playlist";
import ProjectManager from "@/components/ProjectManager";
import TimelineEditor from "@/components/daw/TimelineEditor";
import AudioEditor from "@/components/daw/AudioEditor";
import { useToast } from "@/components/ui/use-toast";
import { Track } from "@/types/track";

const Workspace = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [bpm, setBpm] = React.useState(120);
  const [selectedTrack, setSelectedTrack] = React.useState<string | null>(null);
  const [gridSnap, setGridSnap] = React.useState("1/4");
  const [metronomeEnabled, setMetronomeEnabled] = React.useState(false);
  const [tracks, setTracks] = React.useState<Track[]>([]);
  const [playbackPosition, setPlaybackPosition] = React.useState(0);
  const { toast } = useToast();

  const handleProjectLoad = (projectData: any) => {
    try {
      toast({
        title: "Project Loaded",
        description: "Project data has been successfully loaded",
      });
      
      if (projectData.bpm) setBpm(projectData.bpm);
      if (projectData.tracks) setTracks(projectData.tracks);
      
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
    // Additional audio playback logic would go here
  };

  const handleStop = () => {
    setIsPlaying(false);
    setPlaybackPosition(0);
    // Additional stop logic would go here
  };

  const handleExport = async () => {
    try {
      // This is a placeholder for actual export logic
      toast({
        title: "Exporting Project",
        description: "Your project is being exported...",
      });
      // Actual export logic would go here
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export project",
        variant: "destructive",
      });
    }
  };

  const handleAddTrack = (type: 'audio' | 'midi') => {
    const newTrack: Track = {
      id: `track-${tracks.length + 1}`,
      name: `Track ${tracks.length + 1}`,
      type,
      color: `bg-${['purple', 'blue', 'amber', 'green', 'red'][tracks.length % 5]}-500`,
      isMuted: false,
      isSolo: false,
      volume: 0.8,
      pan: 0,
    };
    setTracks([...tracks, newTrack]);
  };

  return (
    <div className="h-screen bg-daw-background text-daw-text flex flex-col">
      {/* Transport Controls */}
      <div className="flex items-center justify-between bg-daw-secondary p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-daw-text hover:text-daw-accent"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-daw-text hover:text-daw-accent"
            onClick={handleStop}
          >
            <StopCircle />
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
          <Button
            variant="ghost"
            size="icon"
            className={`${isRecording ? "text-red-500" : "text-daw-text"} hover:text-red-500`}
            onClick={() => setIsRecording(!isRecording)}
          >
            <CircleDot />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`${metronomeEnabled ? "text-daw-accent" : "text-daw-text"} hover:text-daw-accent`}
            onClick={() => setMetronomeEnabled(!metronomeEnabled)}
          >
            <Bell />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <ProjectManager onProjectLoad={handleProjectLoad} />
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleExport}
          >
            <Download className="w-4 h-4" />
            Export
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
            <span className="text-sm">Grid:</span>
            <select
              value={gridSnap}
              onChange={(e) => setGridSnap(e.target.value)}
              className="bg-daw-background text-daw-text p-1 rounded"
            >
              <option value="1/4">1/4</option>
              <option value="1/8">1/8</option>
              <option value="1/16">1/16</option>
              <option value="free">Free</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 bg-daw-background"
      >
        <ResizablePanel defaultSize={20}>
          <div className="h-full flex flex-col">
            <div className="p-2 flex gap-2">
              <Button
                size="sm"
                onClick={() => handleAddTrack('audio')}
                className="flex-1"
              >
                <Mic className="w-4 h-4 mr-2" />
                Add Audio
              </Button>
              <Button
                size="sm"
                onClick={() => handleAddTrack('midi')}
                className="flex-1"
              >
                <Music2 className="w-4 h-4 mr-2" />
                Add MIDI
              </Button>
            </div>
            <ChannelRack />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60}>
              <TimelineEditor
                gridSnap={gridSnap}
                selectedTrack={selectedTrack}
                onTrackSelect={setSelectedTrack}
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