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
        width={378}
        height={401}
        className="absolute top-[-36px] right-[-36px] md:top-[-60px] md:right-[-40px]"
      />

      <picture className="overflow-hidden rounded-[48px]">
        <Image
          src={bannerSrc}
          alt="banner"
          width={908}
          height={1352}
          className="h-[360px] w-[240px] sm:h-[450px] sm:w-[300px] md:h-[540px] md:w-[360px] object-cover"
        />
      </picture>

      <Emoji
        width={394}
        height={406}
        src={bottomEmoji}
        className="absolute bottom-[-36px] left-[-36px] md:bottom-[-60px] md:left-[-40px]"
      />
    </div>
  );
}
