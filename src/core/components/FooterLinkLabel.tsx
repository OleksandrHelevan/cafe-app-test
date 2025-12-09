
import type { ReactNode } from "react";

interface FooterLinkLabelProps {
  children: ReactNode;
}
export function FooterLinkLabel({ children }: FooterLinkLabelProps) {
  return(
    <h3 className={"text-white text-2xl md:text-xl"}>{children}</h3>
  )
}