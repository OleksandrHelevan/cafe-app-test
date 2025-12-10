"use client";

import type { Pizza } from "~/domains/pizza/types";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "~/core/components/Button";
import { IngredientCheckbox } from "~/core/components/IngredientCheckbox";
import { useState } from "react";
import { SizeRadio } from "~/core/components/SizeRadio";

interface PizzaModalProps {
  pizza: Pizza;
  onClose: () => void;
}

export function PizzaModal({ pizza, onClose }: PizzaModalProps) {
  const [selectedSize, setSelectedSize] = useState<number>(pizza.sizes[1]!);
  const [amount, setAmount] = useState<number>(1);

  const increment = () => setAmount((prev) => prev + 1);
  const decrement = () => setAmount((prev) => Math.max(1, prev - 1));

  return (
    <form className="relative flex gap-6 rounded-2xl border-2 border-orange-600 bg-[#2F0C00] p-6 text-white">
      <Button
        buttonStyle="circle"
        type="button"
        onClick={onClose}
        className="!absolute top-2 right-2"
      >
        <X
          size={30}
          className="text-gray-300 transition-all duration-300 hover:scale-105"
        />
      </Button>

      <div className="flex flex-col items-center gap-3">
        <Image
          width={419}
          height={414}
          src={pizza.image}
          alt={pizza.name}
          className="w-[240px] rounded-2xl"
        />

        <h3 className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-4xl font-bold text-transparent">
          {pizza.name}
        </h3>

        <div className="flex items-center gap-3 text-2xl">
          <Button
            type="button"
            buttonStyle="circle"
            className={"cursor-pointer"}
            onClick={decrement}
          >
            <MinusIcon />
          </Button>
          <span className="min-w-[20px] text-center">{amount}</span>
          <Button
            type="button"
            buttonStyle="circle"
            onClick={increment}
            className={"cursor-pointer"}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-between pt-6 pr-6">
        <div className="grid grid-cols-2 gap-2 p-4">
          {pizza.ingredients.map((ing) => (
            <IngredientCheckbox key={ing} label={ing} defaultChecked />
          ))}
        </div>

        <SizeRadio
          sizes={pizza.sizes}
          selectedSize={selectedSize}
          onChange={setSelectedSize}
        />

        <Button
          type="submit"
          buttonStyle="colored"
          onClick={() => console.log("todo")}
        >
          Add to Cart
        </Button>
      </div>
    </form>
  );
}
