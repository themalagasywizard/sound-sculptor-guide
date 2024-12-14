import React from "react";

interface WaveformVisualizerProps {
  isPlaying?: boolean;
}

const WaveformVisualizer = ({ isPlaying = false }: WaveformVisualizerProps) => {
  return (
    <div className="flex items-center justify-center gap-1 h-24">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-daw-accent opacity-75 rounded-full ${
            isPlaying ? "animate-wave" : ""
          }`}
          style={{
            height: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default WaveformVisualizer;