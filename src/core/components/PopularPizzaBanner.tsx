"use client";

import { useEffect, useRef, useState } from "react";

export function PopularPizzaBanner() {
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!titleRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col gap-12">
      <div
        className="relative w-full h-64 flex items-center justify-center rounded-[48px] overflow-hidden bg-center bg-cover"
        style={{ backgroundImage: "url('/banners/popular-pizza-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <p
          ref={titleRef}
          className={`relative text-white text-3xl font-normal transition-all duration-800 ease-in-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          MOST POPULAR PIZZA
        </p>
      </div>
      <div className="w-full"></div>
    </div>
  );
}
