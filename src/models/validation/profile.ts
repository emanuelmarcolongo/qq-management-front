import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(1, "Nome do perfil é obrigatório"),
  description: z.string().optional(),
});

export const createProfileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
});
