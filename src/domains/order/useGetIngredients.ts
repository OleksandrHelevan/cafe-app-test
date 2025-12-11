"use client";

import { useEffect, useState } from "react";
import type { Ingredient } from "~/domains/order/types";
import { ingredients as mock } from "~/domains/order/mock";

export function useGetIngredients() {
  const [data, setData] = useState<Ingredient[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        setData(mock);
        setLoading(false);
      }, 300);
    } catch {
      setError("Failed to load ingredients");
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}
