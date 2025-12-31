"use client";

import type { GetPizzaResponse } from "~/domains/pizza/types";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "~/core/components/Button";
import { IngredientCheckbox } from "~/core/components/IngredientCheckbox";
import { useState } from "react";
import { SizeRadio } from "~/core/components/SizeRadio";
import { useGetIngredients } from "~/domains/ingredient/useGetIngredients";
import { IngredientsDropdown } from "~/core/components/IngredientsDropdown";
import type { Order } from "~/domains/ingredient/types";
import { Loader } from "~/core/components/Loader";
import { sizePrice } from "~/core/constants/sizePrice";

interface PizzaModalProps {
  pizza: GetPizzaResponse;
  onClose: () => void;
}

export function PizzaModal({ pizza, onClose }: PizzaModalProps) {
  const [selectedSize, setSelectedSize] = useState<number>(pizza.sizes[1]!);
  const [amount, setAmount] = useState<number>(1);
  const { data: allIngredients, isLoading } = useGetIngredients();

  const [baseIngredients, setBaseIngredients] = useState<string[]>(
    pizza.ingredients,
  );
  const [extraIngredients, setExtraIngredients] = useState<string[]>([]);

  const toggleBase = (name: string) => {
    setBaseIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  const toggleExtra = (name: string) => {
    setExtraIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  const increment = () => setAmount((p) => p + 1);
  const decrement = () => setAmount((p) => Math.max(1, p - 1));

  if (!allIngredients || isLoading) return <Loader />;

  const extraPrice = extraIngredients.reduce((sum, name) => {
    const ing = allIngredients.content.find((i) => i.name === name);
    return sum + (ing?.price ?? 0);
  }, 0);

  const multiplier =
    sizePrice.find((s) => s.size === selectedSize)?.price ?? 1;

  const basePrice = pizza.price * multiplier;
  const totalPrice = ((basePrice + extraPrice) * amount).toFixed(2);

  const handleOrder = () => {
    const order: Order = {
      pizzaName: pizza.name,
      pizzaSize: selectedSize,
      amount,
      ingredients: [...baseIngredients, ...extraIngredients],
      totalPrice: Number(totalPrice),
    };

    console.log(order);
  };

  return (
    <form className="relative flex flex-col gap-4 rounded-2xl border-2 border-orange-600 bg-[#2F0C00] p-6 text-white md:flex-row">
      <Button
        buttonStyle="circle"
        type="button"
        onClick={onClose}
        className="!absolute top-2 right-2"
      >
        <X size={30} className="text-gray-300 transition-all hover:scale-105" />
      </Button>

      <div className="flex flex-col items-center gap-2">
        <Image
          width={419}
          height={414}
          src={pizza.image}
          alt={pizza.name}
          className="mt-[-40px] w-[240px] rounded-2xl"
        />

        <h3 className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-4xl font-bold text-transparent">
          {pizza.name}
        </h3>

        <div className="flex items-center gap-2 text-2xl">
          <Button type="button" buttonStyle="circle" onClick={decrement}>
            <MinusIcon />
          </Button>
          <span className="min-w-[20px] text-center">{amount}</span>
          <Button type="button" buttonStyle="circle" onClick={increment}>
            <PlusIcon />
          </Button>
        </div>

        <div className="rounded-xl bg-orange-600 px-4 py-2 text-2xl font-bold">
          ${totalPrice}
        </div>
      </div>

      <div className="flex w-[260px] flex-col justify-between gap-4 lg:mt-4 lg:mr-4">
        <div className="grid grid-cols-2 gap-2">
          {pizza.ingredients.map((ing) => (
            <IngredientCheckbox
              key={ing}
              label={ing}
              checked={baseIngredients.includes(ing)}
              onChange={() => toggleBase(ing)}
            />
          ))}
        </div>

        <IngredientsDropdown
          ingredients={allIngredients.content.filter(
            (i) => !pizza.ingredients.includes(i.name),
          )}
          selected={extraIngredients}
          onToggle={toggleExtra}
          dropDownType={"checkbox"}
        />

        <SizeRadio
          sizes={pizza.sizes}
          selectedSize={selectedSize}
          onChange={setSelectedSize}
        />

        <Button type="button" buttonStyle="colored" onClick={handleOrder}>
          Order Now
        </Button>
      </div>
    </form>
  );
}
