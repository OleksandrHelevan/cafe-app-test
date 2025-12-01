import Image from "next/image";
import { Emoji } from "./Emoji";

interface BannerProps {
  bannerSrc: string;
  topEmoji: string;
  bottomEmoji: string;
}

export function Banner({ bannerSrc, topEmoji, bottomEmoji }: BannerProps) {
  return (
    <div className="relative flex items-center">
      <Emoji
        src={topEmoji}
        className="absolute top-[-60px] right-[-50px]"
      />

      <picture className="overflow-hidden rounded-[48px]">
        <Image
          src={bannerSrc}
          alt="banner"
          width={360}
          height={540}
          className="h-full w-full object-cover"
        />
      </picture>

      <Emoji
        src={bottomEmoji}
        className="absolute bottom-[-60px] left-[-50px]"
      />
    </div>
  );
}
