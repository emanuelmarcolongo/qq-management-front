import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(1, "Nome do perfil é obrigatório"),
  description: z.string().optional(),
});

export const createProfileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
});

export const createProfileModuleLink = z.object({
  moduleIds: z.array(z.number({ message: "Selecione algum módulo" })),
});

export const createProfileTransactionLink = z.object({
  transactionIds: z.array(z.number({ message: "Selecione alguma transação" })),
});

export const createProfileFunctionLink = z.object({
  functionIds: z.array(z.number({ message: "Selecione alguma função" })),
});
