import {
  CreateModuleData,
  DetailedModule,
  ModulesData,
} from "../models/types/Modules";

const getModules = async (): Promise<ModulesData[] | void> => {
  const token = `${process.env.TOKEN}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store" as RequestCache,
  };

  const response = await fetch(`${process.env.API_BASE_URL}/modules`, options);
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  const data: ModulesData[] = await response.json();
  return data;
};

const getModuleById = async (id: number): Promise<DetailedModule> => {
  const token = `${process.env.TOKEN}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store" as RequestCache,
  };

  const response = await fetch(
    `${process.env.API_BASE_URL}/modules/${id}`,
    options
  );
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  const data: DetailedModule = await response.json();
  return data;
};

const getModulesFromClient = async (): Promise<ModulesData[] | void> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store" as RequestCache,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/modules`,
    options
  );
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  const data: ModulesData[] = await response.json();
  return data;
};

const postModule = async (data: CreateModuleData): Promise<any> => {
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/modules`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const updateModule = async (
  data: CreateModuleData,
  id: number
): Promise<any> => {
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/modules/${id}`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const deleteModule = async (id: number): Promise<any> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/modules/${id}`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const ModulesService = {
  getModules,
  postModule,
  updateModule,
  deleteModule,
  getModulesFromClient,
  getModuleById,
};

export default ModulesService;
