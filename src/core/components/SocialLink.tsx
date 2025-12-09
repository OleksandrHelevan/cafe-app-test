import Image from "next/image";

interface SocialLinkProps {
  src: string;
  alt: string;
  href: string;
}

export function SocialLink({ src, alt, href }: SocialLinkProps) {
  return (
    <a href={href}>
      <Image width={48} height={48} src={src} alt={alt} className={"w-[36px] h-[36px]"} />
    </a>
  );
}
