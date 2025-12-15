import type {PizzaType} from "~/core/types/pizzaType";

export const GET_PIZZAS_BY_TYPE_PATH = (type? : PizzaType) => `/pizzas?type=${type}`;