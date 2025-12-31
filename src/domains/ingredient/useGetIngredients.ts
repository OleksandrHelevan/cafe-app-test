import { useQuery } from "@tanstack/react-query";
import type {
  GetIngredientsRequest,
  GetIngredientsResponse,
} from "~/domains/ingredient/types";
import { ingredients as mock } from "~/domains/ingredient/mock";
import { ingredientClient } from "~/domains/ingredient/api";

const SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE ?? "mock";

export function useGetIngredients({
                                    page = 0,
                                    size = 10,
                                  }: GetIngredientsRequest = {}) {
  return useQuery<GetIngredientsResponse, Error>({
    queryKey: ["ingredients", page, size, SOURCE],
    queryFn: async (): Promise<GetIngredientsResponse> => {
      if (SOURCE === "mock") {
        const start = page * size;
        const end = start + size;

        const content = mock.slice(start, end);

        return {
          content,
          totalElements: mock.length,
          totalPages: Math.ceil(mock.length / size),
          size,
          number: page,
          numberOfElements: content.length,
          first: page === 0,
          last: end >= mock.length,
          empty: content.length === 0,
          pageable: {
            pageNumber: page,
            pageSize: size,
            offset: start,
            paged: true,
            unpaged: false,
            sort: {
              empty: true,
              sorted: false,
              unsorted: true,
            },
          },
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
        };
      }

      return ingredientClient.detIngredients({ page, size });
    },
  });
}
