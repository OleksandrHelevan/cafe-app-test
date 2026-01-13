import { useMutation } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse } from "~/domains/user/types";
import { userClient } from "~/domains/user/api";
import { users } from "~/domains/user/mock";
import { showNotification } from "~/core/util/notifications";
import { setCookie } from "~/core/util/cookies";
import { Role } from "~/core/types/role";

const SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE ?? "mock";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (request: LoginRequest): Promise<LoginResponse> => {
      if (SOURCE === "mock") {
        const user = users.find(
          (u) => u.email === request.email && u.password === request.password,
        );

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const expiresIn = new Date(Date.now() + 1000 * 60);

        return {
          role: user.role,
          token: `mock-jwt-${user.role}-${Date.now()}`,
          expiresIn,
        };
      }

      return userClient.login(request);
    },
    onSuccess: (data: LoginResponse) => {
      const expiresMs = new Date(data.expiresIn).getTime() - Date.now();
      const isAdmin = data.role === Role.ADMIN;

      const expiresDays = expiresMs / (1000 * 60 * 60 * 24);

      setCookie("token", data.token, expiresDays);
      setCookie("isAdmin", isAdmin.toString(), expiresDays);

      showNotification({
        text: `Logged in as ${data.role}`,
        mode: "success",
      });
    },
    onError: (error: Error) => {
      showNotification({
        text: `Error: ${error.message}`,
        mode: "error",
      });
    },
  });
}
