"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IngredientCheckbox } from "~/core/components/IngredientCheckbox";
import type { Ingredient } from "~/domains/ingredient/types";

export type DropDownType = "list" | "checkbox";

interface DropdownProps {
  ingredients: Ingredient[];
  selected: string[];
  dropDownType: DropDownType;
  onToggle: (name: string) => void;
}

export function IngredientsDropdown({
                                      ingredients,
                                      onToggle,
                                      selected,
                                      dropDownType = "checkbox",
                                    }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-xl border border-orange-500 px-3 py-2 text-orange-300"
      >
        <span className="text-white">Ingredients</span>
        {open ? (
          <ChevronUp className="text-white" />
        ) : (
          <ChevronDown className="text-white" />
        )}
      </button>

      {open && (
        <div className="absolute top-[110%] left-0 z-20 w-full rounded-xl border border-orange-500 bg-[#3A1300] p-2">
          <div className="grid max-h-[120px] grid-cols-1 gap-2 overflow-y-auto">
            {ingredients.map((ing) =>
              dropDownType === "checkbox" ? (
                <IngredientCheckbox
                  key={ing.name}
                  label={`${ing.name} (+$${ing.price})`}
                  checked={selected.includes(ing.name)}
                  onChange={() => onToggle(ing.name)}
                />
              ) : (
                <p
                  key={ing.name}
                  className="rounded-lg px-2 py-1 text-white hover:bg-orange-600"
                >
                  {ing.name}
                </p>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
