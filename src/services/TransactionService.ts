import { Transaction } from "../models/types/Modules";
import {
  CreateTransaction,
  TransactionWithModule,
} from "../models/types/Transactions";

const getTransactions = async (): Promise<TransactionWithModule[]> => {
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
    `${process.env.API_BASE_URL}/transactions`,
    options
  );
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  const data: TransactionWithModule[] = await response.json();
  return data;
};

const postTransaction = async (
  data: CreateTransaction
): Promise<Transaction> => {
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const updateTransaction = async (
  data: CreateTransaction,
  id: number
): Promise<Transaction> => {
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${id}`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const deleteTransaction = async (id: number): Promise<Transaction> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${id}`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const transactionService = {
  postTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
};

export default transactionService;
