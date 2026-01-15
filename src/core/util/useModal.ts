import { useState, useCallback } from "react";
import type { ModalState } from "~/core/types/modalState";
import type { GetPizzaResponse } from "~/domains/pizza/types";

export function useModal() {
  const [modal, setModal] = useState<ModalState>(null);

  const openLogin = useCallback(() => {
    setModal({ type: "login" });
  }, []);

  const openPizza = useCallback((pizza: GetPizzaResponse) => {
    setModal({ type: "pizza", pizza });
  }, []);

  const openAdminPanel = useCallback(() => {
    setModal({ type: "adminPanel" });
  }, []);

  const close = useCallback(() => {
    setModal(null);
  }, []);

  return {
    modal,
    isOpen: modal !== null,
    openLogin,
    openPizza,
    openAdminPanel,
    close,
  };
}
