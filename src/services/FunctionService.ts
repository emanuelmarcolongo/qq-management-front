import { getToken } from "../lib/cookies/auth";
import { CreateFunction, FunctionWithModule } from "../models/types/Functions";
import { Function } from "../models/types/Modules";
import createFetchOptions from "./utils/fetchOptions";
import handleResponse from "./utils/responseHandler";

const getFunctions = async (): Promise<FunctionWithModule[]> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/functions`,
    createFetchOptions("GET", token)
  );
  return handleResponse<FunctionWithModule[]>(response);
};

const postFunction = async (data: CreateFunction): Promise<Function> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/functions`,
    createFetchOptions("POST", token, data)
  );
  return handleResponse<Function>(response);
};

const updateFunction = async (
  data: CreateFunction,
  id: number
): Promise<Function> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/functions/${id}`,
    createFetchOptions("PUT", token, data)
  );
  return handleResponse<Function>(response);
};

const deleteFunction = async (id: number): Promise<Function> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/functions/${id}`,
    createFetchOptions("DELETE", token)
  );
  return handleResponse<Function>(response);
};

const functionService = {
  getFunctions,
  postFunction,
  updateFunction,
  deleteFunction,
};

export default functionService;
