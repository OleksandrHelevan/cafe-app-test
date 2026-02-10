import { ApiClient } from "~/core/services/apiClient";
import type {
  GetPizzasRequest,
  GetPizzaResponse,
  CreatePizzaResponse,
  CreatePizzaForm,
} from "~/domains/pizza/types";
import { GET_PIZZAS_BY_TYPE_PATH, PIZZAS_PATH } from "~/core/constants/apiPath";
import { getCookie } from "~/core/util/cookies";

class PizzaClient extends ApiClient {
  async getPizzas(request: GetPizzasRequest): Promise<GetPizzaResponse[]> {
    return this.get<GetPizzaResponse[]>(
      GET_PIZZAS_BY_TYPE_PATH(request.pizzaType),
    );
  }

  async createPizza(form: CreatePizzaForm): Promise<CreatePizzaResponse> {
    const formData = new FormData();
    formData.append(
      "pizza",
      new Blob([JSON.stringify(form.pizza)], { type: "application/json" }),
    );

    if (!form.imageFile) throw new Error("Image required");
    formData.append("image", form.imageFile);

    const token = getCookie("token");
    const header: Record<string, string> = { Authorization: `Bearer ${token}` };

    return this.postForm<CreatePizzaResponse>(PIZZAS_PATH, formData, header);
  }
}
export const pizzaClient = new PizzaClient();
