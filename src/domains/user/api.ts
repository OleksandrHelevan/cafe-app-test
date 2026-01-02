import {ApiClient} from "~/core/services/apiClient";
import type { LoginRequest, LoginResponse } from "~/domains/user/types";
import { LOGIN_PATH } from "~/core/constants/apiPath";

class UserClient extends ApiClient{
    async login(request: LoginRequest): Promise<LoginResponse> {
      return this.post(LOGIN_PATH, request);
    }
}
export const userClient = new UserClient();