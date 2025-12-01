"use client";

import { useState } from "react";

interface SwitchButtonProps {
  first: string;
  second: string;
}

export function SwitchButton({ first, second }: SwitchButtonProps) {
  const [active, setActive] = useState<"first" | "second">("first");

  const buttonBaseClass =
    "relative w-36 sm:w-44 rounded-full py-2 text-xl text-center transition-colors duration-300 cursor-pointer";

  return (
    <div className="relative flex w-fit rounded-full border-2 border-orange-400 p-1 bg-transparent">
      <div
        className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-300"
        style={{ transform: active === "first" ? "translateX(0%)" : "translateX(100%)" }}
      />

      <button
        type="button"
        onClick={() => setActive("first")}
        className={`${buttonBaseClass} ${active === "first" ? "text-white" : "text-orange-400"}`}
      >
        {first}
      </button>

      <button
        type="button"
        onClick={() => setActive("second")}
        className={`${buttonBaseClass} ${active === "second" ? "text-white" : "text-orange-400"}`}
      >
        {second}
      </button>
    </div>
  );
}
