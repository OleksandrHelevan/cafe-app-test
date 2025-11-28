'use client'
import { useState } from "react";
import { NavigationLink } from "~/core/components/NavigationLink";

export interface NavigationProps {
  className?: string;
}
export function Navigation({className}: NavigationProps) {
  const [active, setActive] = useState("/");

  return (
    <nav className={className}>
      <ul className="flex items-center gap-2 sm:gap-4 lg:gap-6 text-sm sm:text-base lg:text-lg">
        <li>
          <NavigationLink
            to="#"
            isActive={active === "#home"}
            onClick={() => setActive("#home")}
          >
            Home
          </NavigationLink>
        </li>

        <li>
          <NavigationLink
            to="#"
            isActive={active === "#menu"}
            onClick={() => setActive("#menu")}
          >
            Menu
          </NavigationLink>
        </li>

        <li>
          <NavigationLink
            to="#"
            isActive={active === "#events"}
            onClick={() => setActive("#events")}
          >
            Events
          </NavigationLink>
        </li>

        <li>
          <NavigationLink
            to="#"
            isActive={active === "#events"}
            onClick={() => setActive("#events")}
          >
            About us
          </NavigationLink>
        </li>
      </ul>
    </nav>
  );
}
