"use client";
import { useState, useCallback } from "react";
import type { Pizza } from "~/domains/pizza/types";

export function usePizzaModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [pizza, setPizza] = useState<Pizza | null>(null);

  const open = useCallback((p: Pizza) => {
    setPizza(p);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setPizza(null);
    setIsOpen(false);
  }, []);

  return { isOpen, pizza, open, close };
}
