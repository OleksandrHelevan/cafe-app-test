import { ApiClient } from "~/core/services/apiClient";
import type {
  GetIngredientsRequest,
  GetIngredientsResponse,
} from "~/domains/ingredient/types";
import { GET_INGREDIENTS_PATH } from "~/core/constants/apiPath";

export class Api extends ApiClient {
  async detIngredients(
    request: GetIngredientsRequest,
  ): Promise<GetIngredientsResponse> {
    return this.get(GET_INGREDIENTS_PATH(request.size, request.page));
  }
}
export const ingredientClient = new Api();