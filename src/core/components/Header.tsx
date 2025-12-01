"use client";

import { Logo } from "~/core/components/Logo";
import { Navigation } from "~/core/components/Navigation";
import { Button } from "~/core/components/Button";
import BurgerMenu from "~/core/components/BurgerMenu";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  return (
    <header className="fixed flex h-[80px] w-full max-w-[1980px] items-center
     justify-between bg-[#170A00]/90 px-6 backdrop-blur-[10px]
     transition-colors duration-300 lg:px-[80px] z-10">
      <Logo />

      <Navigation className={"hidden lg:flex"} />

      <div className="flex items-center gap-8">
        <Button
          onClick={() => router.push("/")}
          type="button"
          buttonStyle="colored"
          className={"hidden lg:flex"}
        >
          Log in
        </Button>

        <Button
          onClick={() => router.push("/")}
          type="button"
          buttonStyle="circle"
        >
          <Image src="icons/bag.svg" alt="bag" width={24} height={24} />
        </Button>

        <BurgerMenu />
      </div>
    </header>
  );
}
