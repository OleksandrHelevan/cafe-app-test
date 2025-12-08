import type { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export function Title({ children }: TitleProps) {
  return (
    <h1
      className={"overflow-auto text-5xl font-extrabold text-white md:text-6xl"}
    >
      {children}
    </h1>
  );
}
