"use client";
import { useEffect, useRef, useState } from "react";
import { NavigationLink } from "~/core/components/NavigationLink";

export interface NavigationProps {
  className?: string;
}

const links = [
  { name: "Home", to: "#home" },
  { name: "Menu", to: "#menu" },
  { name: "Events", to: "#events" },
  { name: "About us", to: "#about" },
];

export function Navigation({ className }: NavigationProps) {
  const [active, setActive] = useState("#home");
  const [dotLeft, setDotLeft] = useState(0);

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) return;

    const items = Array.from(listRef.current.children);
    const activeIndex = links.findIndex((l) => l.to === active);
    const activeItem = items[activeIndex] as HTMLElement | undefined;

    if (!activeItem) return;

    setDotLeft(
      activeItem.offsetLeft +
      activeItem.offsetWidth / 2
    );
  }, [active]);

  return (
    <nav className={className}>
      <ul
        ref={listRef}
        className="relative flex items-center gap-2 text-sm sm:gap-4 sm:text-base lg:gap-6 lg:text-lg"
      >
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

        <span
          className="pointer-events-none absolute -bottom-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-orange-500 transition-[left] duration-300 ease-out"
          style={{ left: dotLeft }}
        />
      </ul>
    </nav>
  );
}
