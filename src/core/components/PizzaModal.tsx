"use client";

import type { Pizza } from "~/domains/pizza/types";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "~/core/components/Button";
import { IngredientCheckbox } from "~/core/components/IngredientCheckbox";
import { useState, useEffect } from "react";
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

  // Масив всіх вибраних інгредієнтів (дефолтні + додаткові)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // При завантаженні даних ставимо дефолтні інгредієнти піци
  useEffect(() => {
    setSelectedIngredients(pizza.ingredients);
  }, [pizza.ingredients]);

  const toggleIngredient = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  const increment = () => setAmount((prev) => prev + 1);
  const decrement = () => setAmount((prev) => Math.max(1, prev - 1));

  const handleOrder = () => {
    if (!allIngredients) return;

    const totalPrice =
      (pizza.price +
        selectedIngredients
          .filter((ing) => !pizza.ingredients.includes(ing)) // ціна тільки додаткових
          .reduce((sum, name) => {
            const ing = allIngredients.find((i) => i.name === name);
            return sum + (ing?.price ?? 0);
          }, 0)) *
      amount;

    const order: Order = {
      pizzaName: pizza.name,
      pizzaSize: selectedSize,
      amount,
      ingredients: selectedIngredients,
      totalPrice,
    };

    console.log(order);
  };

  if (!allIngredients || loading) return <Loader />;

  // Відфільтруємо додаткові інгредієнти для дропдауну
  const extraIngredients = allIngredients
    .map((i) => i.name)
    .filter((i) => !pizza.ingredients.includes(i));

  return (
    <form className="relative flex gap-6 rounded-2xl border-2 border-orange-600 bg-[#2F0C00] p-6 text-white">
      <Button
        buttonStyle="circle"
        type="button"
        onClick={onClose}
        className="!absolute top-2 right-2"
      >
        <X size={30} className="text-gray-300 transition-all hover:scale-105" />
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
          <Button type="button" buttonStyle="circle" onClick={decrement}>
            <MinusIcon />
          </Button>
          <span className="min-w-[20px] text-center">{amount}</span>
          <Button type="button" buttonStyle="circle" onClick={increment}>
            <PlusIcon />
          </Button>
        </div>
      </div>

      <div className="flex w-[260px] flex-col justify-between pt-6 pr-6">
        {/* Дефолтні інгредієнти піци */}
        <div className="grid grid-cols-2 gap-2 p-4">
          {pizza.ingredients.map((ing) => (
            <IngredientCheckbox
              key={ing}
              label={ing}
              checked={selectedIngredients.includes(ing)}
              onChange={() => toggleIngredient(ing)}
            />
          ))}
        </div>

        {/* Додаткові інгредієнти */}
        <IngredientsDropdown
          ingredients={allIngredients.filter(
            (i) => !pizza.ingredients.includes(i.name),
          )}
          selected={selectedIngredients}
          onToggle={toggleIngredient}
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
