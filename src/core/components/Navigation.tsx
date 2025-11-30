'use client'
import { useState } from "react";
import { NavigationLink } from "~/core/components/NavigationLink";

export interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const [active, setActive] = useState("#home");

  const links = [
    { name: "Home", to: "#home" },
    { name: "Menu", to: "#menu" },
    { name: "Events", to: "#events" },
    { name: "About us", to: "#about" },
  ];

  return (
      <nav className={className}>
        <ul className="flex items-center gap-2 sm:gap-4 lg:gap-6 text-sm sm:text-base lg:text-lg">
          {links.map((link) => (
              <li key={link.to}>
                <NavigationLink
                    to={link.to}
                    isActive={active === link.to}
                    onClick={() => setActive(link.to)}
                >
                  {link.name}
                </NavigationLink>
              </li>
          ))}
        </ul>
      </nav>
  );
}
