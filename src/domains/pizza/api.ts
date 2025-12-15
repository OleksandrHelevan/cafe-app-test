import { ApiClient } from "~/core/services/apiClient";
import type { GetPizzasRequest, GetPizzaResponse } from "~/domains/pizza/types";
import { GET_PIZZAS_BY_TYPE_PATH } from "~/core/constants/apiPath";

export class Api extends ApiClient {
  async getPizzas(request: GetPizzasRequest): Promise<GetPizzaResponse[]> {
    return this.get<GetPizzaResponse[]>(
      GET_PIZZAS_BY_TYPE_PATH(request.pizzaType),
    );
  }
}
export const pizzaClient = new Api();
