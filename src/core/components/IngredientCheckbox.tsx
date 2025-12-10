import { useState } from "react";
import { Check } from "lucide-react";

interface IngredientCheckboxProps {
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function IngredientCheckbox({
                                     label,
                                     defaultChecked = true,
                                     onChange,
                                   }: IngredientCheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    setChecked((prev) => {
      onChange?.(!prev);
      return !prev;
    });
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none text-white text-[16px]">
      <div
        onClick={toggle}
        className={`w-5 h-5 flex items-center justify-center rounded border-2 border-orange-500 transition-all 
          ${checked ? "bg-orange-500" : "bg-transparent"} 
          relative`}
      >
        {checked && (
          <span className="text-white text-sm font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Check/>
          </span>
        )}
      </div>
      {label}
    </label>
  );
}
