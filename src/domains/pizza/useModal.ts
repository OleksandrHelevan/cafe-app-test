"use client";
import { useState, useCallback } from "react";
import type { GetPizzaResponse } from "~/domains/pizza/types";

export function usePizzaModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [pizza, setPizza] = useState<GetPizzaResponse | null>(null);

  const open = useCallback((p: GetPizzaResponse) => {
    setPizza(p);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setPizza(null);
    setIsOpen(false);
  }, []);

  return { isOpen, pizza, open, close };
}
