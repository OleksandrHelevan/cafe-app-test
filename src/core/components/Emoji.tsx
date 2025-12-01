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
        "w-[160px] transition-transform duration-500 hover:scale-110 " +
        (className ?? "")
      }
    />
  );
}
