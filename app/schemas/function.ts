import { z } from "zod";

export const createFunctionSchema = z.object({
  name: z.string().min(1, "Nome da função é obrigatório"),
  description: z.string().optional(),
  module_id: z.number().int("O módulo ao qual a função pertence é obrigatório"),
});
