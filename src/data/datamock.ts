import { User } from "../models/User";

const mockUsers: User[] = [
  {
    name: "Carlos Silva",
    registration: "123456",
    email: "carlos.silva@example.com",
    profile: "Administrador(a)",
    created_at: new Date("2023-01-01T10:00:00Z"),
    updated_at: new Date("2023-05-01T15:00:00Z"),
  },
  {
    name: "Ana Maria",
    registration: "234567",
    email: "ana.maria@example.com",
    profile: "Vendedor(a)",
    created_at: new Date("2022-02-01T10:00:00Z"),
    updated_at: new Date("2023-04-01T12:00:00Z"),
  },
  {
    name: "João Pedro",
    registration: "345678",
    email: "joao.pedro@example.com",
    profile: "Gerente(a)",
    created_at: new Date("2021-03-01T09:00:00Z"),
    updated_at: new Date("2023-03-01T11:00:00Z"),
  },
  {
    name: "Mariana Oliveira",
    registration: "456789",
    email: "mariana.oliveira@example.com",
    profile: "Suporte(a)",
    created_at: new Date("2020-04-01T08:00:00Z"),
    updated_at: new Date("2023-02-01T10:00:00Z"),
  },
  {
    name: "Lucas Fernandes",
    registration: "567890",
    email: "lucas.fernandes@example.com",
    profile: "Administrador(a)",
    created_at: new Date("2019-05-01T07:00:00Z"),
    updated_at: new Date("2023-01-01T09:00:00Z"),
  },
  {
    name: "Beatriz Souza",
    registration: "678901",
    email: "beatriz.souza@example.com",
    profile: "Vendedor(a)",
    created_at: new Date("2018-06-01T06:00:00Z"),
    updated_at: new Date("2022-12-01T08:00:00Z"),
  },
];

export default mockUsers;
