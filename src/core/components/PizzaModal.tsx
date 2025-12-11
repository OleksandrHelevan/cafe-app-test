"use client";

import type { Pizza } from "~/domains/pizza/types";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "~/core/components/Button";
import { IngredientCheckbox } from "~/core/components/IngredientCheckbox";
import { useState } from "react";
import { SizeRadio } from "~/core/components/SizeRadio";
import { useGetIngredients } from "~/domains/order/useGetIngredients";
import { IngredientsDropdown } from "~/core/components/IngredientsDropdown";
import type { Order } from "~/domains/order/types";
import { Loader } from "~/core/components/Loader";

interface PizzaModalProps {
  pizza: Pizza;
  onClose: () => void;
}

export function PizzaModal({ pizza, onClose }: PizzaModalProps) {
  const [selectedSize, setSelectedSize] = useState<number>(pizza.sizes[1]!);
  const [amount, setAmount] = useState<number>(1);

  const { data: allIngredients, loading } = useGetIngredients();
  const [extraIngredients, setExtraIngredients] = useState<string[]>([]);

  const increment = () => setAmount((prev) => prev + 1);
  const decrement = () => setAmount((prev) => Math.max(1, prev - 1));

  const handleOrder = () => {
    if (!allIngredients) return;

    const totalPrice =
      (pizza.price +
        extraIngredients.reduce((sum, name) => {
          const ing = allIngredients.find((i) => i.name === name);
          return sum + (ing?.price ?? 0);
        }, 0)) *
      amount;

    const order: Order = {
      pizzaName: pizza.name,
      pizzaSize: selectedSize,
      amount,
      ingredients: [...pizza.ingredients, ...extraIngredients],
      totalPrice,
    };

    console.log(order);
  };

  if (!allIngredients || loading) return <Loader />;

  return (
    <form className="relative flex flex-col md:flex-row gap-4 rounded-2xl border-2 border-orange-600 bg-[#2F0C00] p-6 text-white">
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
          className="w-[240px] rounded-2xl mt-[-40px]"
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
      </div>

      <div className="flex w-[260px] flex-col justify-between gap-4">
          <div className="grid grid-cols-2 gap p-4">
              {pizza.ingredients.map((ing) => (
                  <IngredientCheckbox
                      key={ing}
                      label={ing}
                      checked={true}
                  />
              ))}
          </div>

          <IngredientsDropdown
              ingredients={allIngredients.filter(i => !pizza.ingredients.includes(i.name))}
              selected={extraIngredients}
              onToggle={(name) => {
                  setExtraIngredients(prev =>
                      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
                  );
              }}
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
