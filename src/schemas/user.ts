import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório" })
    .min(5, "O nome do colaborador(a) deve conter ao menos que 5 caracteres"),
  username: z
    .string({ message: "Nome de usuário é obrigatório" })
    .min(5, "O nome de usuário deve conter mais que 5 caracteres")
    .max(20, "O nome de usuáriodeve conter menos que 20 caracteres"),
  email: z.string({ message: "Email é obrigatório" }).email("Email inválido"),
  profile_id: z
    .number({ message: "O colaborador(a) precisa ser associado a um perfil" })
    .int("ID do perfil deve ser inteiro"),
});

export const userLoginSchema = z.object({
  username: z
    .string({ message: "Nome de usuário é obrigatório" })
    .min(5, "Usuário deve conter ao menos que 5 caracteres"),
  password: z
    .string({ message: "A senha é obrigatória" })
    .min(5, "A senha deve conter ao menos que 5 caracteres"),
});

export const passwordResetRequestSchema = z.object({
  email: z.string({ message: "Email é obrigatório" }).email("Email inválido"),
});
