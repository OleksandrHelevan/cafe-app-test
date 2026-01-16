"use client";

import { type FormEvent, useState } from "react";
import { X } from "lucide-react";
import { Input } from "~/core/components/Input";
import { Button } from "~/core/components/Button";
import { PizzaType } from "~/core/types/pizzaType";
import { Select } from "~/core/components/Select";
import { usePostPizza } from "~/domains/pizza/usePostPizza";
import { IngredientCheckbox } from "~/core/components/IngredientCheckbox";
import { useGetIngredients } from "~/domains/ingredient/useGetIngredients";
import { Loader } from "~/core/components/Loader";

interface AddPizzaModalProps {
  onClose?: () => void;
}

export function AddPizzaModal({ onClose }: AddPizzaModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<PizzaType>(PizzaType.MEAT);
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [sizes, setSizes] = useState<number[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const { mutate } = usePostPizza();

  const { data: allIngredients, isLoading } = useGetIngredients({
    page: 0,
    size: 20,
  });

  const toggleSize = (size: number) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleIngredient = (ingredient: string) => {
    setIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient],
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("SUBMIT", { name, type, sizes, ingredients, image });
    mutate(
      {
        pizza: {
          name,
          type,
          price: Number(price),
          rating: Number(rating),
          sizes,
          ingredients,
        },
        imageFile: image!,
      },
      {
        onSuccess: () => onClose?.(),
      },

        );
  };

  if (isLoading || !allIngredients) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed z-50 flex w-[360px] flex-col gap-4 rounded-2xl border-2 border-orange-600 bg-[#2F0C00] p-8 text-white"
    >
      <h2 className="text-xl font-semibold">Add pizza</h2>

      <Button
        buttonStyle="circle"
        type="button"
        onClick={onClose}
        className="!absolute -top-2 -right-2"
      >
        <X size={24} />
      </Button>

      <Input
        id="name"
        type="text"
        value={name}
        placeholder="Enter pizza name"
        onChange={(e) => setName(e.target.value)}
      />

      <Select
        value={type}
        options={Object.values(PizzaType)}
        onChange={setType}
      />

      <Input
        id="price"
        value={price}
        type="number"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />

      <Input
        id="rating"
        value={rating}
        type="number"
        placeholder="Rating (0–10)"
        onChange={(e) => setRating(e.target.value)}
      />

      <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
        {allIngredients.content.map((ing) => (
          <IngredientCheckbox
            key={ing.name}
            label={ing.name}
            checked={ingredients.includes(ing.name)}
            onChange={() => toggleIngredient(ing.name)}
          />
        ))}
      </div>

      <div className="flex gap-2">
        {[25, 30, 35].map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => toggleSize(s)}
            className={`rounded-md border px-3 py-1 ${
              sizes.includes(s)
                ? "border-orange-500 bg-orange-600"
                : "border-gray-500"
            }`}
          >
            {s} cm
          </button>
        ))}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        className="text-sm"
      />

      <Button type="submit" buttonStyle="colored">
        Create pizza
      </Button>
    </form>
  );
}
