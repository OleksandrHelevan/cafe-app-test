"use client";

import { createContext, type ReactNode, useContext } from "react";
import { useModal } from "~/core/util/useModal";
import type { GetPizzaResponse } from "~/domains/pizza/types";

interface ModalContextProps {
  modal: ReturnType<typeof useModal>["modal"];
  isOpen: boolean;
  openLogin: () => void;
  openPizza: (pizza: GetPizzaResponse) => void;
  openAdminPanel: () => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const { modal, isOpen, openLogin, openPizza, openAdminPanel, close } =
    useModal();

  return (
    <ModalContext.Provider
      value={{ modal, isOpen, openLogin, openPizza, openAdminPanel, close }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Something went wrong");
  return context;
}
