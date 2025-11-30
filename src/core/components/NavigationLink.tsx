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
        "text-l flex items-center justify-center p-1 no-underline transition-colors duration-300 " +
        (isActive
          ? "bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          : "text-gray-400")
      }
    >
      {children}
    </a>
  );
}
