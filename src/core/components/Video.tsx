"use client";

import { useState } from "react";

interface VideoProps {
  src: string;
  preview: string;
}

export function Video({ src, preview }: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const startVideo = () => {
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-l text-white">Cooking process:</p>

      <div
        id="video-wrapper"
        className={`flex h-[180px] w-[280px] items-center justify-center rounded-xl bg-cover bg-center ${
          !isPlaying ? "" : ""
        }`}
        style={{
          backgroundImage: !isPlaying ? `url(${preview})` : undefined,
        }}
      >
        {!isPlaying && (
          <button
            id="video-button"
            onClick={startVideo}
            aria-label="Play video"
            className="flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-orange-600 p-1 transition-transform duration-300 hover:scale-125"
          >
            <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-black">
              <span className="clip-path-triangle relative ml-[5px] h-5 w-5 bg-gradient-to-r from-orange-400 to-orange-600">
                <span className="absolute top-1/2 left-0 h-[4px] w-[2px] -translate-y-1/2 rounded-full bg-[var(--bg-color)]" />
              </span>
            </span>
          </button>
        )}

        {isPlaying && (
          <iframe
            src={`${src}?autoplay=1&rel=0&modestbranding=1`}
            title="Cooking process"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="animate-fadeIn h-full w-full rounded-xl border-0"
          />
        )}
      </div>
    </div>
  );
}
