import { z } from "zod";

export const createModuleSchema = z.object({
  name: z.string().min(1, "Nome do módulo é obrigatório"),
  description: z.string().optional(),
  backgroundColor: z
    .string()
    .length(7, "A cor de fundo deve conter exatamente 7 caracteres")
    .startsWith(
      "#",
      "A cor deve ser um código hex que começa com # seguido de 6 números"
    ),
  textColor: z
    .string()
    .length(7, "A cor do texto deve conter exatamente 7 caracteres")
    .startsWith(
      "#",
      "A cor deve ser um código hex que começa com # seguido de 6 números"
    ),
});
