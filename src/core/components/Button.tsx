"use client";

import type { ReactNode } from "react";

export type ButtonStyle = "colored" | "menuButton" | "ingredients" | "circle";
export type ButtonType = "button" | "submit";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  buttonStyle: ButtonStyle;
  type: ButtonType;
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  disabled = false,
  buttonStyle,
  type,

  className,
}: ButtonProps) {
  const baseClass =
    "rounded-3xl transition-all duration-300 flex" +
    " items-center justify-center h-[40px] cursor-pointer";
  const buttonClass = {
    colored: `bg-gradient-to-r from-orange-400 to-orange-600 text-white 
      hover:scale-105 px-12 py-1`,
    ingredients: `bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text
      text-transparent border-2 border-orange-500 hover:bg-clip-padding
       hover:text-white px-12`,
    menuButton: `bg-transparent shadow-lg shadow-orange-900 text-white
      hover:scale-105 px-12`,
    circle: `bg-gradient-to-r from-orange-400 to-orange-600 text-white
        hover:scale-105 rounded-full w-[40px] p-0`,
  }[buttonStyle];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${buttonClass} ${className}`}
    >
      {children}
    </button>
  );
}
