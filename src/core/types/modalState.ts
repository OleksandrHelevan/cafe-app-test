import type { GetPizzaResponse } from "~/domains/pizza/types";

export type ModalState =
  | { type: "login" }
  | { type: "pizza"; pizza: GetPizzaResponse }
  | {type: "adminPanel"}
  | null;
