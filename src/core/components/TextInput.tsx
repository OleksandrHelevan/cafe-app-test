import type { ChangeEvent, InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export function TextInput({ type = "text", id, value, onChange }: TextInputProps & {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={type === "email" ? "email" : undefined}
      className="w-full rounded-xl border-2 px-3 py-2 text-black border-orange-600"
    />
  );
}
