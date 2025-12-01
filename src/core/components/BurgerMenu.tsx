"use client";

import { useState } from "react";
import { NavigationLink } from "~/core/components/NavigationLink";
import { Button } from "~/core/components/Button";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const links = [
    { name: "Home", to: "#" },
    { name: "Menu", to: "#menu" },
    { name: "Events", to: "#events" },
    { name: "About us", to: "#about" },
  ];

  return (
    <>
      <button
        aria-label={"Open menu"}
        className="group flex flex-col gap-[6px] lg:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="h-[3px] w-7 rounded bg-gradient-to-r from-orange-400 to-orange-600 transition-all group-hover:w-9"></span>
        <span className="h-[3px] w-7 rounded bg-gradient-to-r from-orange-400 to-orange-600 transition-all group-hover:w-6"></span>
        <span className="h-[3px] w-7 rounded bg-gradient-to-r from-orange-400 to-orange-600 transition-all group-hover:w-9"></span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex h-[100dvh] w-screen flex-col bg-[rgba(29,0,0,0.8)] px-4 py-[20px] backdrop-blur-3xl md:px-6">
          <Button
            type="button"
            buttonStyle="circle"
            onClick={() => setOpen(false)}
            className="absolute self-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </Button>

          <nav className="flex flex-grow flex-col items-center justify-center gap-8">
            {links.map((link) => (
              <div key={link.name} className="text-2xl font-bold">
                <NavigationLink
                  to={link.to}
                  isActive={active === link.name}
                  onClick={() => {
                    setActive(link.name);
                  }}
                >
                  {link.name}
                </NavigationLink>
              </div>
            ))}
          </nav>

          <div className="mt-auto flex w-full justify-center pb-8">
            <Button
              type="button"
              buttonStyle="colored"
              onClick={() => console.log("Login")}
            >
              Log in
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
