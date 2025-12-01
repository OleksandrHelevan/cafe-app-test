import type { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export function Title({ children }: TitleProps) {
  return <h1 className={"text-white font-extrabold overflow-auto text-6xl"}>{children}</h1>;
}
