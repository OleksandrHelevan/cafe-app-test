'use client'
import { useState } from "react";
import { NavigationLink } from "~/core/components/NavigationLink";

export function Navigation() {
  const [active, setActive] = useState("/");

  return (
    <nav>
      <ul className="flex gap-4 items-center">
        <li>
          <NavigationLink
            to="#"
            isActive={active === "/"}
            onClick={() => setActive("/")}
          >
            Home
          </NavigationLink>
        </li>

        <li>
          <NavigationLink
            to="#"
            isActive={active === "/menu"}
            onClick={() => setActive("/menu")}
          >
            Menu
          </NavigationLink>
        </li>

        <li>
          <NavigationLink
            to="#"
            isActive={active === "/events"}
            onClick={() => setActive("/events")}
          >
            Events
          </NavigationLink>
        </li>

        <li>
          <NavigationLink
            to="#"
            isActive={active === "/about"}
            onClick={() => setActive("/about")}
          >
            About us
          </NavigationLink>
        </li>
      </ul>
    </nav>
  );
}
