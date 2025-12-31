import type { Paginated } from "~/core/types/paginated";

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  portion: number;

}

export type GetIngredientsResponse = Paginated<Ingredient>;

export interface GetIngredientsRequest {
  size?: number;
  page?: number;
}

export interface Order {
  pizzaName: string;
  totalPrice: number;
  pizzaSize: number;
  amount: number;
  ingredients: string[];
}