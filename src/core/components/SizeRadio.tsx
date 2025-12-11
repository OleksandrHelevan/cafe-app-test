"use client";


interface SizeRadioProps {
  sizes: number[];
  selectedSize?: number;
  onChange: (size: number) => void;
}

export function SizeRadio({ sizes, selectedSize, onChange }: SizeRadioProps) {
  return (
    <div className="flex justify-center gap-4">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => onChange(size)}
          className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 transition
            ${selectedSize === size
            ? "border-transparent bg-gradient-to-r from-orange-400 to-orange-500 text-white"
            : "border-gray-400 text-gray-400"}
          `}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
