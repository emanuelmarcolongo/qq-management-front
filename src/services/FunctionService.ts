import { CreateFunction, FunctionWithModule } from "../models/types/Functions";
import { Function } from "../models/types/Modules";

const getFunctions = async (): Promise<FunctionWithModule[]> => {
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
    `${process.env.API_BASE_URL}/functions`,
    options
  );
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  const data: FunctionWithModule[] = await response.json();
  return data;
};

const postFunction = async (data: CreateFunction): Promise<Function> => {
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/functions`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const updateFunction = async (
  data: CreateFunction,
  id: number
): Promise<Function> => {
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/functions/${id}`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const deleteFunction = async (id: number): Promise<Function> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/functions/${id}`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const functionService = {
  postFunction,
  updateFunction,
  deleteFunction,
  getFunctions,
};

export default functionService;
