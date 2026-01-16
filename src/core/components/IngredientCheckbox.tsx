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
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange?.(!checked)}
        className="hidden"
      />
      <div className={`w-4 h-4 border ... ${checked ? "bg-orange-500" : ""}`}></div>
      {label}
    </label>

  );
}
