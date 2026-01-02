import { useQuery } from "@tanstack/react-query";
import type { GetPizzasRequest, GetPizzaResponse } from "~/domains/pizza/types";
import { pizzas } from "~/domains/pizza/mock";
import { pizzaClient } from "~/domains/pizza/api";
import { SOURCE } from "~/core/constants/source";

export function useGetPizzas({ pizzaType }: GetPizzasRequest = {}) {
    return useQuery<GetPizzaResponse[], Error>({
        queryKey: ["pizzas", pizzaType, SOURCE],
        queryFn: async (): Promise<GetPizzaResponse[]> => {
            let items: GetPizzaResponse[];

            if (SOURCE === "mock") {
                items = pizzaType ? pizzas.filter((p) => p.type === pizzaType) : pizzas;
            } else {
                const response = await pizzaClient.getPizzas({ pizzaType });
                items = Array.isArray(response) ? response : [];
            }

            return items;
        },
    });
}

