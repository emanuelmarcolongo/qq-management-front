import { ApiResponse } from "../models/types/ApiResponse";
import { CreateUserData, User, UserWithProfile } from "../models/types/User";

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
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
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
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const updateUser = async (
  id: number,
  data: CreateUserData
): Promise<ApiResponse<User>> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const deleteUser = async (id: number): Promise<User> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const UserService = {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
};

export default UserService;
