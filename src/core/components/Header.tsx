import { Logo } from "~/core/components/Logo";
import { Navigation } from "~/core/components/Navigation";
import { Button } from "~/core/components/Button";
import BurgerMenu from "~/core/components/BurgerMenu";
import Image from "next/image";

export function Header() {
  return (
    <header className="fixed flex h-[80px] w-full max-w-[1980px] items-center
     justify-between bg-[rgba(0,0,0,0.1)] backdrop-blur-[10px] transition-colors
      duration-300 lg:px-[80px] px-6 md:px-8">
      <Logo />

      <Navigation className={"hidden lg:flex"} />

      <div className="flex items-center gap-8">
        <Button
          onClick={() => console.log("route")}
          type="button"
          buttonStyle="colored"
          className={"hidden lg:flex"}
        >
          Log in
        </Button>

        <Button
          onClick={() => console.log("cart")}
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
