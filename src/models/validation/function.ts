import { z } from "zod";

export const createFunctionSchema = z.object({
  name: z
    .string({ message: "Nome da função é obrigatório" })
    .min(5, "Nome da função deve conter ao menos 5 caracteres"),
  description: z.string().optional(),
});
