import { Transaction } from "../models/types/Modules";
import {
  CreateTransaction,
  TransactionWithModule,
} from "../models/types/Transactions";
import createFetchOptions from "./utils/fetchOptions";
import handleResponse from "./utils/responseHandler";

const getTransactions = async (): Promise<TransactionWithModule[]> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`,
    createFetchOptions("GET", token)
  );
  return handleResponse<TransactionWithModule[]>(response);
};

const postTransaction = async (
  data: CreateTransaction
): Promise<Transaction> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`,
    createFetchOptions("POST", token, data)
  );
  return handleResponse<Transaction>(response);
};

const updateTransaction = async (
  data: CreateTransaction,
  id: number
): Promise<Transaction> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${id}`,
    createFetchOptions("PUT", token, data)
  );
  return handleResponse<Transaction>(response);
};

const deleteTransaction = async (id: number): Promise<Transaction> => {
  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${id}`,
    createFetchOptions("DELETE", token)
  );
  return handleResponse<Transaction>(response);
};

const transactionService = {
  getTransactions,
  postTransaction,
  updateTransaction,
  deleteTransaction,
};

export default transactionService;
