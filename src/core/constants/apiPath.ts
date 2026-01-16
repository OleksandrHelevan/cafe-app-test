import type { PizzaType } from "~/core/types/pizzaType";

export const GET_PIZZAS_BY_TYPE_PATH = (type?: PizzaType) =>
  `${PIZZAS_PATH}?type=${type}`;
export const GET_INGREDIENTS_PATH = (size: number, page: number) =>
  `/ingredients?size=${size}&page=${page}`;
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/sign-up";
export const PIZZAS_PATH = "/pizzas";
