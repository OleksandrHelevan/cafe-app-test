"use client";

import type { GetPizzaResponse } from "~/domains/pizza/types";
import { Button } from "~/core/components/Button";
import Image from "next/image";
import { IngredientsDropdown } from "~/core/components/IngredientsDropdown";

interface PizzaCardProps {
  pizza: GetPizzaResponse;
  position?: number;
  className?: string;
  onBtnClick: (pizza: GetPizzaResponse) => void;
}
export function PizzaCard({
  pizza,
  position,
  className,
  onBtnClick,
}: PizzaCardProps) {
  return (
    <div
      className={`group relative z-0 w-full overflow-visible rounded-2xl bg-orange-950/60 p-4 shadow-md transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl ${className}`}
    >
      <picture className="absolute -top-28 left-[calc(50%_-_120px)] h-60 w-60">
        <Image
          width={240}
          height={240}
          src={pizza.image}
          alt={pizza.name}
          className="h-full w-full object-cover"
        />
      </picture>

      <div className="mt-24 flex flex-col items-center gap-4 text-center">
        <h3 className="text-2xl font-bold text-white">{pizza.name}</h3>

        <p className="text-s w-[200px] truncate text-gray-400">
          {pizza.ingredients.join(", ")}
        </p>

        <div className="flex gap-4">
          {pizza.sizes.map((size) => (
            <div
              key={size}
              className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-400 text-gray-400 transition`}
            >
              {size}
            </div>
          ))}
        </div>

        <IngredientsDropdown
          ingredients={pizza.ingredients.map((name) => ({
            name,
            price: 0,
            portion: 100,
            id: "id"
          }))}
          selected={pizza.ingredients}
          dropDownType={"list"}
          onToggle={() => {
            /* empty */
          }}
        />

        <div className="flex w-full flex-col items-center gap-2 px-6">
          <p className="text-2xl font-bold text-white">
            ${pizza.price.toFixed(2)}
          </p>
        </div>

        <Button
          type="button"
          buttonStyle="colored"
          onClick={() => onBtnClick(pizza)}
        >
          Choose pizza
        </Button>
        {position && (
          <p className="absolute bottom-[-28px] rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-1 font-semibold text-white transition-opacity duration-1000 lg:opacity-0 lg:group-hover:opacity-100">
            #{position}
          </p>
        )}
      </div>
    </div>
  );
}
