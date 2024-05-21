import { UserWithProfile } from "../models/types/User";

const getUsers = async (): Promise<UserWithProfile[] | void> => {
  const token = `${process.env.TOKEN}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 100,
    },
  };

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/users`, options);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data: any = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const UserService = {
  getUsers,
};

export default UserService;
