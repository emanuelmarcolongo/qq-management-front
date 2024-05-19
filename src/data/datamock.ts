type UserMockType = {
  name: string;
  username: string;
  email: string;
  profile: "Administrador(a)" | "Vendedor(a)" | "Gerente(a)" | "Suporte(a)";
};

const mockUsers: UserMockType[] = [
  {
    name: "Carlos Silva",
    username: "carlossilva",
    email: "carlos.silva@example.com",
    profile: "Administrador(a)",
  },
  {
    name: "Ana Maria",
    username: "anamaria",
    email: "ana.maria@example.com",
    profile: "Vendedor(a)",
  },
  {
    name: "João Pedro",
    username: "joaopedro",
    email: "joao.pedro@example.com",
    profile: "Gerente(a)",
  },
  {
    name: "Mariana Oliveira",
    username: "marianaoliveira",
    email: "mariana.oliveira@example.com",
    profile: "Suporte(a)",
  },
  {
    name: "Lucas Fernandes",
    username: "lucasfernandes",
    email: "lucas.fernandes@example.com",
    profile: "Administrador(a)",
  },
  {
    name: "Beatriz Souza",
    username: "beatrizsouza",
    email: "beatriz.souza@example.com",
    profile: "Vendedor(a)",
  },
];

export default mockUsers;
