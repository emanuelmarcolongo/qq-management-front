import { z } from "zod";

export const createTransactionSchema = z.object({
  name: z.string().min(1, "Nome da transação é obrigatório"),
  description: z.string().optional(),
  module_id: z
    .number()
    .int("O módulo ao qual a transação pertence é obrigatório"),
});
