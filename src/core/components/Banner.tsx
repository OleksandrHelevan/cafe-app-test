import Image from "next/image";
import { Emoji } from "./Emoji";

interface BannerProps {
  bannerSrc: string;
  pizzaEmoji: string;
  potatoesEmoji: string;
}

export function Banner({ bannerSrc, pizzaEmoji, potatoesEmoji }: BannerProps) {
  return (
    <div className="relative flex items-center justify-center">
      <Emoji
        src={pizzaEmoji}
        className="absolute top-[-60px] right-[-60px]"
      />

      <div className="h-[600px] w-[400px] overflow-hidden rounded-[48px]">
        <Image
          src={bannerSrc}
          alt="banner"
          width={400}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>

      <Emoji
        src={potatoesEmoji}
        className="absolute bottom-[-60px] left-[-60px]"
      />
    </div>
  );
}
