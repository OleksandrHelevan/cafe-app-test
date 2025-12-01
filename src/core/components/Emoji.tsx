import Image from "next/image";

interface EmojiProps {
  src: string;
  className?: string;
}

export function Emoji({ src, className }: EmojiProps) {
  return (
    <Image
      src={src}
      width={160}
      height={160}
      alt="emoji"
      className={
        "transition-transform duration-300 hover:scale-105 " +
        (className ?? "")
      }
    />
  );
}
