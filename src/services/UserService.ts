import { ApiResponse } from "../models/types/ApiResponse";
import { CreateUserData, User, UserWithProfile } from "../models/types/User";
import createFetchOptions from "./utils/fetchOptions";
import handleResponse from "./utils/responseHandler";

const getUsers = async (): Promise<UserWithProfile[]> => {
  const token = process.env.TOKEN!;
  const response = await fetch(
    `${process.env.API_BASE_URL}/users`,
    createFetchOptions("GET", token)
  );
  return handleResponse<UserWithProfile[]>(response);
};

const postUser = async (data: CreateUserData): Promise<any> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,
    createFetchOptions("POST", token, data)
  );
  return handleResponse<any>(response);
};

const updateUser = async (
  id: number,
  data: CreateUserData
): Promise<ApiResponse<User>> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
    createFetchOptions("PUT", token, data)
  );
  return handleResponse<ApiResponse<User>>(response);
};

const deleteUser = async (id: number): Promise<User> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
    createFetchOptions("DELETE", token)
  );
  return handleResponse<User>(response);
};

const UserService = {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
};

export default UserService;
