import type { PizzaType } from "~/core/types/pizzaType";

export interface GetPizzaResponse {
  name: string;
  type: PizzaType;
  price: number;
  sizes: number[];
  ingredients: string[];
  rating: number;
  image: string;
}

export interface GetPizzasRequest {
  pizzaType?: PizzaType;
}

export interface CreatePizzaRequest {
  name: string;
  type: PizzaType;
  price?: number;
  sizes?: number[];
  ingredients?: string[];
  rating?: number;
}

export interface CreatePizzaResponse {
  name: string;
  type: PizzaType;
  price: number;
  sizes: number[];
  ingredients: string[];
  rating: number;
  image: string;
}

export interface CreatePizzaForm {
  pizza: CreatePizzaRequest;
  imageFile: File;
}
