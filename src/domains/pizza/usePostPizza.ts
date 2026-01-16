import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreatePizzaForm,
  CreatePizzaResponse,
} from "~/domains/pizza/types";
import { pizzaClient } from "~/domains/pizza/api";
import { SOURCE } from "~/core/constants/source";
import { pizzas } from "~/domains/pizza/mock";
import { showNotification } from "~/core/util/notifications";

export function usePostPizza() {
  const queryClient = useQueryClient();

  return useMutation<CreatePizzaResponse, Error, CreatePizzaForm>({
    mutationFn: async (form) => {
      if (SOURCE === "mock") {
        if (!form.imageFile) throw new Error("Image required");

        const newPizza: CreatePizzaResponse = {
          ...form.pizza,
          price: form.pizza.price ?? 0,
          sizes: form.pizza.sizes ?? [],
          ingredients: form.pizza.ingredients ?? [],
          rating: form.pizza.rating ?? 0,
          image: URL.createObjectURL(form.imageFile),
        };
        pizzas.push(newPizza);
        return newPizza;
      }


      if (!form.imageFile) throw new Error("Image required");

      return await pizzaClient.createPizza(form);
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pizzas"] });
      showNotification({ text: "Success", mode: "success" });
    },
    onError: () => {
      showNotification({ text: "Error", mode: "error" });
    },
  });
}
