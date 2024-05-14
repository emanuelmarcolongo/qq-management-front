import { z } from "zod";

export const createProfileSchema = z.object({
  name: z.string().min(1, "Nome do perfil é obrigatório"),
  description: z.string().optional(),
  modules: z.number().int().array(),
});
