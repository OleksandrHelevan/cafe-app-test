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
        "h-[160px] w-[160px] transition-transform duration-300 hover:scale-105 " +
        (className ?? "")
      }
    />
  );
}
