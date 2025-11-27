import type { ReactNode } from "react";

interface NavigationLinkProps {
  to: string;
  children?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export function NavigationLink({
                                 to,
                                 children,
                                 isActive = false,
                                 onClick,
                               }: NavigationLinkProps) {
  return (
    <a
      onClick={onClick}
      href={to}
      className={
        "flex duration-300 items-center justify-center p-1 no-underline transition-colors text-l " +
        (isActive
          ? "bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600"
          : "text-gray-400")
      }
    >
      {children}
    </a>
  );
}
