import { z } from "zod";

export const createModuleSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório" })
    .min(6, "Nome do módulo deve ter pelo menos 7 caracteres"),
  description: z.string().optional(),
  background_color: z
    .string()
    .length(7, "A cor de fundo deve conter exatamente 7 caracteres")
    .startsWith(
      "#",
      "A cor deve ser um código hex que começa com # seguido de 6 números"
    )
    .default("#000000")
    .optional(),
  text_color: z
    .string()
    .length(7, "A cor do texto deve conter exatamente 7 caracteres")
    .startsWith(
      "#",
      "A cor deve ser um código hex que começa com # seguido de 6 números"
    )
    .default("#000000")
    .optional(),
});
