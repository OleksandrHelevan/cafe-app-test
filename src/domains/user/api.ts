import {ApiClient} from "~/core/services/apiClient";
import type {
  CreateUserRequest,
  CreateUserResponse,
  LoginRequest,
  LoginResponse,
} from "~/domains/user/types";
import { LOGIN_PATH, REGISTER_PATH } from "~/core/constants/apiPath";

class UserClient extends ApiClient{
    async login(request: LoginRequest): Promise<LoginResponse> {
      return this.post(LOGIN_PATH, request);
    }
    async signup(request: CreateUserRequest): Promise<CreateUserResponse> {
      return this.post(REGISTER_PATH, request);
    }
}
export const userClient = new UserClient();