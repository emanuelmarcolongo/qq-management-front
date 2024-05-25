import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(1, "Nome do perfil é obrigatório"),
  description: z.string().optional(),
});

const transactionIDSchema = z.coerce.number();
const functionIDSchema = z.coerce.number();
const transactionSchema = z.object({
  id: z.coerce.number(),
  functions: z.array(functionIDSchema),
});

const moduleSchema = z.object({
  id: z.coerce.number(),
  transactions: z.array(transactionSchema),
});

export const createProfileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  modules: z.array(moduleSchema).optional(),
});
