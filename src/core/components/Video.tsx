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
        className={`flex justify-center items-center rounded-xl w-[280px] h-[180px] bg-center bg-cover ${
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
            className="p-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex justify-center
             items-center transition-transform duration-300 hover:scale-125"
          >
            <span className="flex justify-center items-center rounded-full w-[60px] h-[60px] bg-black">
              <span className="clip-path-triangle w-5 h-5 bg-gradient-to-r from-orange-400 to-orange-600 ml-[5px] relative">
                <span className="absolute bg-[var(--bg-color)] rounded-full w-[2px] h-[4px] left-0 top-1/2 -translate-y-1/2" />
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
            className="w-full h-full rounded-xl border-0 animate-fadeIn"
          />
        )}
      </div>
    </div>
  );
}
