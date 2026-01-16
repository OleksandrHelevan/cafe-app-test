import React from "react";

interface SelectProps<T extends string | number> {
    value: T;
    options: readonly T[];
    onChange: (value: T) => void;
    className?: string;
}

export function Select<T extends string | number>({
                                                      value,
                                                      options,
                                                      onChange,
                                                      className = "",
                                                  }: SelectProps<T>) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as T)}
            className={`rounded-md bg-[#170A00] p-2 text-white ${className}`}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}
