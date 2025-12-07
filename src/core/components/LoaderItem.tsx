import Image from "next/image";

export interface LoaderItemProps {
  rotate: number;
  left: string;
  top: string;
}

export function LoaderItem({ rotate, left, top }: LoaderItemProps) {
  return (
    <Image
      src="/emoji/pizza.svg"
      alt="pizza-spinning"
      width={800}
      height={800}
      className="absolute h-[100px] w-[100px]"
      style={{
        left,
        top,
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
}
