import { CreateModuleData, ModulesData } from "../models/types/Modules";

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

  console.log(response);
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Não autorizado, faça login e tente novamente");
    }
    if (response.status === 409) {
      throw new Error("Conflito - nome do módulo já existe ");
    }

    throw new Error("Algo deu errado, falha ao criar usuário");
  }

  const responseData = await response.json();
  return responseData;
};

const ModulesService = {
  getModules,
  postModule,
};

export default ModulesService;
