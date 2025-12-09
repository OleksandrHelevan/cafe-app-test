import type { ReactNode } from "react";

export interface FooterLinkProps {
  children: ReactNode;
  link: string;
}

export function FooterLink({ children, link }: FooterLinkProps) {
  return (
    <a
      className={
        " text-xl md:text-base bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent transition hover:from-orange-400 hover:to-orange-600"
      }
      href={link}
    >
      {children}
    </a>
  );
}
