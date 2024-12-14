export interface Track {
  id: string;
  name: string;
  type: 'audio' | 'midi';
  color: string;
  isMuted: boolean;
  isSolo: boolean;
  volume: number;
  pan: number;
}

export interface TrackClip {
  id: string;
  trackId: string;
  startTime: number;
  duration: number;
  type: 'audio' | 'midi';
  data: any; // Will be either audio buffer or MIDI data
}