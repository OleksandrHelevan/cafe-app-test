import { useEffect, useState } from "react";
import { pizzas } from "~/domains/pizza/mock";
import type { Pizza } from "~/domains/pizza/types";

export function useGetPopularPizzas() {
  const delay = 500;
  const [data, setData] = useState<Pizza[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      const popularPizzas = pizzas
        .slice()
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

      setData(popularPizzas);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return { data, loading };
}
