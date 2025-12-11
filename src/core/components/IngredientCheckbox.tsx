import { Check } from "lucide-react";

interface IngredientCheckboxProps {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export function IngredientCheckbox({
  label,
  checked,
  onChange,
}: IngredientCheckboxProps) {
  const toggle = () => onChange?.(!checked);

  return (
    <label
      className="flex cursor-pointer items-center gap-2 text-white select-none"
      onClick={toggle}
    >
      <div
        className={`flex h-4 w-4 items-center justify-center rounded border-2 border-orange-500 p-2 transition-all ${
          checked ? "bg-orange-500" : "bg-transparent"
        } relative`}
      >
        {checked && (
          <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm" />
        )}
      </div>
      {label}
    </label>
  );
}
