"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IngredientCheckbox } from "~/core/components/IngredientCheckbox";
import type { Ingredient } from "~/domains/order/types";

interface DropdownProps {
  ingredients: Ingredient[];
  selected: string[];
  onToggle: (name: string) => void;
}

export function IngredientsDropdown({
  ingredients,
  onToggle,
  selected,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-orange-500 px-3 py-2 text-orange-300"
      >
        <span className={"text-white"}>Ingredients</span>
        {open ? (
          <ChevronUp className={"text-white"} />
        ) : (
          <ChevronDown className={"text-white"} />
        )}
      </button>

      {open && (
        <div className="absolute top-[110%] left-0 z-[9999] w-full rounded-xl border border-orange-500 bg-[#3A1300] p-3 shadow-lg">
          <div className="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto">
            {ingredients.map((ing) => (
              <IngredientCheckbox
                key={ing.name}
                label={`${ing.name} (+$${ing.price})`}
                checked={selected.includes(ing.name)}
                onChange={() => onToggle(ing.name)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
