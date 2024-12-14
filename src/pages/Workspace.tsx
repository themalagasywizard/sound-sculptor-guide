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
} from "lucide-react";
import ChannelRack from "@/components/daw/ChannelRack";
import Mixer from "@/components/daw/Mixer";
import PianoRoll from "@/components/daw/PianoRoll";
import Playlist from "@/components/daw/Playlist";
import ProjectManager from "@/components/ProjectManager";
import TimelineEditor from "@/components/daw/TimelineEditor";
import AudioEditor from "@/components/daw/AudioEditor";

const Workspace = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [bpm, setBpm] = React.useState(120);
  const [selectedTrack, setSelectedTrack] = React.useState<string | null>(null);
  const [gridSnap, setGridSnap] = React.useState("1/4");

  return (
    <div className="h-screen bg-daw-background text-daw-text flex flex-col">
      {/* Transport Controls */}
      <div className="flex items-center justify-between bg-daw-secondary p-4">
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
            className={`${
              isRecording ? "text-red-500" : "text-daw-text"
            } hover:text-red-500`}
            onClick={() => setIsRecording(!isRecording)}
          >
            <CircleDot />
          </Button>
        </div>
        <ProjectManager onProjectLoad={handleProjectLoad} />
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
          <ChannelRack />
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