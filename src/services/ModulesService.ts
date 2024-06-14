import {
  CreateModuleData,
  DetailedModule,
  ModulesData,
} from "../models/types/Modules";
import createFetchOptions from "./utils/fetchOptions";
import handleResponse from "./utils/responseHandler";

const getModules = async (): Promise<ModulesData[]> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/modules`,
    createFetchOptions("GET", token)
  );
  return handleResponse<ModulesData[]>(response);
};

const getModuleById = async (id: number): Promise<DetailedModule> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/modules/${id}`,
    createFetchOptions("GET", token)
  );
  return handleResponse<DetailedModule>(response);
};

const getModulesFromClient = async (): Promise<ModulesData[]> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/modules`,
    createFetchOptions("GET", token)
  );
  return handleResponse<ModulesData[]>(response);
};

const postModule = async (data: CreateModuleData): Promise<ModulesData> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/modules`,
    createFetchOptions("POST", token, data)
  );
  return handleResponse<ModulesData>(response);
};

const updateModule = async (
  data: CreateModuleData,
  id: number
): Promise<ModulesData> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/modules/${id}`,
    createFetchOptions("PUT", token, data)
  );
  return handleResponse<ModulesData>(response);
};

const deleteModule = async (id: number): Promise<ModulesData> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/modules/${id}`,
    createFetchOptions("DELETE", token)
  );
  return handleResponse<ModulesData>(response);
};

const ModulesService = {
  getModules,
  getModuleById,
  getModulesFromClient,
  postModule,
  updateModule,
  deleteModule,
};

export default ModulesService;
