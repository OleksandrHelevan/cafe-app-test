import { Role } from "~/core/types/role";

export const users = [
  {
    id: "mock-id-1",
    email: "admin@gmail.com",
    firstName: "admin",
    lastName: "admin",
    password: "admin",
    role: Role.ADMIN,
    phone: "+380981054032"
  },
  {
    id: "mock-id-2",
    email: "client@gmail.com",
    firstName: "client",
    lastName: "client",
    password: "client",
    role: Role.CLIENT,
    phone: "+380981054032"
  }
]