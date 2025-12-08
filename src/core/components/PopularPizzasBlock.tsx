"use client";
import { PizzaCard } from "~/core/components/PizzaCard";
import { useGetPopularPizzas } from "~/domains/pizza/useGetPopularPizzas";
import { Loader } from "~/core/components/Loader";
import type { Pizza } from "~/domains/pizza/types";

export function PopularPizzasBlock() {
  const { data, loading } = useGetPopularPizzas();

  if (loading || !data) return <Loader />;
  if (data.length < 3) return null;

  const ordered: Pizza[] = [data[1], data[0], data[2]].filter(
    (p): p is Pizza => !!p,
  );

  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {ordered.map((pizza, index) => {
        const colSpanClass =
          index === 2
            ? "mx-auto sm:col-start-1 sm:col-end-3 lg:col-auto"
            : "";
        return (
          <PizzaCard
            key={pizza.name}
            pizza={pizza}
            position={index === 0 ? 2 : index === 1 ? 1 : 3}
            className={`mt-20 ${colSpanClass}`}
          />
        );
      })}
    </div>

  );
}
