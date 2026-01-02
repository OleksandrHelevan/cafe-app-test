import { Role } from "~/core/types/role";

export const users = [
  {
    username: "admin",
    password: "admin",
    role: Role.ADMIN,
    email: "admin@gmail.com",
    phone: "+380981054032"
  },
  {
    username: "client",
    password: "client",
    role: Role.CLIENT,
    email: "client@gmail.com",
    phone: "+380981054032"
  }
]