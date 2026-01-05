import { useMutation } from "@tanstack/react-query";
import type {
  CreateUserRequest,
  CreateUserResponse,
} from "~/domains/user/types";
import { userClient } from "~/domains/user/api";
import { users } from "~/domains/user/mock";
import { showNotification } from "~/core/util/notifications";
import { Role } from "~/core/types/role";

const SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE ?? "mock";

export function useSignup() {
  return useMutation<CreateUserResponse, Error, CreateUserRequest>({
    mutationFn: async (
      request: CreateUserRequest,
    ): Promise<CreateUserResponse> => {
      if (SOURCE === "mock") {
        const exists = users.find((u) => u.email === request.email);
        if (exists) {
          throw new Error("User with this email already exists");
        }

        const newUser: CreateUserResponse = {
          id: `mock-id-${Date.now()}`,
          email: request.email,
          firstName: request.firstName,
          lastName: request.lastName,
          role: Role.CLIENT,
        };

        users.push({
          ...newUser,
          password: request.password,
          phone: request.phoneNumber
        });

        return newUser;
      }

      return userClient.signup(request);
    },
    onSuccess: (data: CreateUserResponse) => {
      showNotification({ text: `User ${data.email} created`, mode: "success" });
    },
    onError: (error: Error) => {
      showNotification({ text: `Error: ${error.message}`, mode: "error" });
    },
  });
}
