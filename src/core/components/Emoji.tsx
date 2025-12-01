import Image from "next/image";

interface EmojiProps {
  src: string;
  className?: string;
  width: number;
  height: number;
}

export function Emoji({ src, className, width, height }: EmojiProps) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt="emoji"
      className={
        "h-[120px] w-[120px] md:h-[160px] md:w-[160px] transition-transform duration-300 hover:scale-105 " +
        (className ?? "")
      }
    />
  );
}
