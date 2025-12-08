import { useState, useEffect } from "react";
import type { Paginated } from "~/core/types/paginated";
import type { GetPizzasRequest, Pizza } from "~/domains/pizza/types";
import { pizzas } from "~/domains/pizza/mock";

interface UseGetPizzasOptions extends GetPizzasRequest {
  page?: number;
  size?: number;
}
export function useGetPizzas({ page, size, pizzaType }: UseGetPizzasOptions) {
  return useGetPizzasMock({ page: page, size: size, pizzaType: pizzaType });
}

export function useGetPizzasMock({
  page = 0,
  size = 10,
  pizzaType,
}: UseGetPizzasOptions = {}) {
  const delay = 500;
  const [data, setData] = useState<Paginated<Pizza> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      const filtered = pizzaType
        ? pizzas.filter((p) => p.type === pizzaType)
        : pizzas;

      const start = page * size;
      const end = start + size;
      const pageContent = filtered.slice(start, end);

      const paginated: Paginated<Pizza> = {
        content: pageContent,
        totalPages: Math.ceil(filtered.length / size),
        totalElements: filtered.length,
        number: page,
        size,
        numberOfElements: pageContent.length,
        first: page === 0,
        last: end >= filtered.length,
      };

      setData(paginated);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, [page, size, delay, pizzaType]);

  return { data, loading };
}
