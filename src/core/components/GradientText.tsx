import type { ReactNode } from "react";

interface GradientTextProps {
  children?: ReactNode;
}
export function GradientText({ children }: GradientTextProps) {
  return (
    <p
      className={
        "text-l bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent transition hover:from-gray-300 hover:to-gray-300"
      }
    >
      {children}
    </p>
  );
}
