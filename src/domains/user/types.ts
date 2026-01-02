import type { Role } from "~/core/types/role";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  role: Role;
  token: string;
  expiresIn: Date;
}
