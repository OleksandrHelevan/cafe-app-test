import type { PizzaType } from "~/core/types/pizzaType";

export const GET_PIZZAS_BY_TYPE_PATH = (type?: PizzaType) =>
  `/pizzas?type=${type}`;
export const GET_INGREDIENTS_PATH = (size: number, page: number) =>
  `/ingredients?size=${size}&page=${page}`;
