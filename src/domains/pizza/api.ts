import { ApiClient } from "~/core/services/apiClient";
import type { GetPizzasRequest, GetPizzaResponse } from "~/domains/pizza/types";

export class Api extends ApiClient {

  async getPizzas(request: GetPizzasRequest): Promise<GetPizzaResponse[]> {
    return this.get<GetPizzaResponse[]>(`/pizzas?type=${request.pizzaType}`);
  }
}
export const pizzaClient = new Api()