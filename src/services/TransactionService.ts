import { Transaction } from "../models/types/Modules";

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
};

export default transactionService;
