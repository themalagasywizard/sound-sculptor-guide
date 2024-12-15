export interface Track {
  id: string;
  name: string;
  type: 'audio' | 'midi';
  color: string;
  isMuted: boolean;
  isSolo: boolean;
  volume: number;
  pan: number;
  clips?: TrackClip[];
}

export interface TrackClip {
  id: string;
  trackId: string;
  startTime: number;
  duration: number;
  type: 'audio' | 'midi';
  data: AudioClipData | MidiClipData;
}

export interface AudioClipData {
  waveformData: number[];
  gain: number;
  audioUrl?: string;
}

export interface MidiClipData {
  notes: MidiNote[];
  quantization: string;
}

export interface MidiNote {
  pitch: number;
  startTime: number;
  duration: number;
  velocity: number;
}