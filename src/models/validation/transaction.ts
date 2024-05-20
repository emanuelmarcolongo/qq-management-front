import { z } from "zod";

export const createTransactionSchema = z.object({
  name: z
    .string({ message: "Nome da transação é obrigatório" })
    .min(5, "Nome da transação deve conter ao menos 5 caracteres"),
  description: z.string().optional(),
  module_id: z
    .number({ message: "O módulo da transação é obrigatório" })
    .int("O módulo ao qual a transação pertercen deve ser um inteiro"),
});
