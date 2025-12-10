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
                                      selected,
                                      onToggle,
                                    }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-orange-500 px-3 py-2 text-orange-300"
      >
        <span>+ Ingredients</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {open && (
        <div className="absolute left-0 top-[110%] z-[9999] w-full rounded-xl border border-orange-500 bg-[#3A1300] p-3 shadow-lg">
          <div className="max-h-60 overflow-y-auto grid grid-cols-1 gap-2">
            {ingredients.map((ing) => (
              <IngredientCheckbox
                key={ing.name + ing.price}
                label={`${ing.name} (+$${ing.price})`}
                onChange={() => onToggle(ing.name)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
