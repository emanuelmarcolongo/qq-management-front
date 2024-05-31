import { CreateUserData, UserWithProfile } from "../models/types/User";

const getUsers = async (): Promise<UserWithProfile[] | void> => {
  const token = `${process.env.TOKEN}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store" as RequestCache,
  };

  const response = await fetch(`${process.env.API_BASE_URL}/users`, options);
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Não autorizado, faça login e tente novamente");
    }

    throw new Error("Algo deu errado, falha ao criar usuário");
  }

  const data: UserWithProfile[] = await response.json();
  return data;
};

const postUser = async (data: CreateUserData): Promise<any> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,
    options
  );
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Não autorizado, faça login e tente novamente");
    }
    if (response.status === 409) {
      throw new Error("Conflito, nome de usuário, email ou matrícula em uso ");
    }

    throw new Error("Algo deu errado, falha ao criar usuário");
  }

  const responseData = await response.json();
  return responseData;
};

const UserService = {
  getUsers,
  postUser,
};

export default UserService;
