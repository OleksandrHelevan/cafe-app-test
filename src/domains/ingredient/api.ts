import { ApiClient } from "~/core/services/apiClient";
import type {
  GetIngredientsRequest,
  GetIngredientsResponse,
} from "~/domains/ingredient/types";
import { GET_INGREDIENTS_PATH } from "~/core/constants/apiPath";

class IngredientClient extends ApiClient {
  async getIngredients(
    request: GetIngredientsRequest,
  ): Promise<GetIngredientsResponse> {
    return this.get(GET_INGREDIENTS_PATH(request.size, request.page));
  }
}
export const ingredientClient = new IngredientClient();