export interface Ingredient {
  name: string;
  price: number;
}

export interface Order {
  pizzaName: string;
  totalPrice: number;
  pizzaSize: number;
  amount: number;
  ingredients: string[];
}