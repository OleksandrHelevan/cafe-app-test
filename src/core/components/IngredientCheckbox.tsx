import { useState } from "react";
import { Check } from "lucide-react";

interface IngredientCheckboxProps {
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function IngredientCheckbox({
  label,
  defaultChecked = false,
  onChange,
}: IngredientCheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    setChecked((prev) => {
      const newState = !prev;
      onChange?.(newState);
      return newState;
    });
  };

  return (
    <label className="flex cursor-pointer items-center gap-2 text-[16px] text-white select-none">
      <div
        onClick={toggle}
        className={`flex h-5 w-5 items-center justify-center rounded border-2 border-orange-500 transition-all ${
          checked ? "bg-orange-500" : "bg-transparent"
        } relative`}
      >
        {checked && (
          <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white" />
        )}
      </div>
      {label}
    </label>
  );
}
