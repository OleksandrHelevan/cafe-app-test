import { type ReactNode } from "react";

interface ModalContainerProps {
  children?: ReactNode;
  open: boolean;
}

export function ModalContainer({ children, open }: ModalContainerProps) {
  if (!open) return null;
  return <div className={"fixed z-[9999] h-full w-full flex justify-center items-center bg-black/80"}>{children}</div>;
}
