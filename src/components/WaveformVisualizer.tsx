import React from "react";

const WaveformVisualizer = () => {
  return (
    <div className="flex items-center justify-center gap-1 h-24">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-daw-accent opacity-75 rounded-full animate-wave"
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