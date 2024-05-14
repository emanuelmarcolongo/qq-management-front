import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório" })
    .min(5, "O nome do colaborador(a) deve conter mais que 5 caracteres"),
  username: z
    .string({ message: "Nome de usuário é obrigatório" })
    .min(3, "O nome de usuário deve conter mais que 5 caracteres")
    .max(20, "O nome de usuáriodeve conter menos que 20 caracteres"),
  email: z.string({ message: "Email é obrigatório" }).email("Email inválido"),
  profile_id: z
    .number({ message: "O colaborador(a) precisa ser associado a um perfil" })
    .int("ID do perfil deve ser inteiro"),
});

export const loginUserSchema = z.object({
  usernameOrEmail: z
    .string({ message: "Nome de usuário ou email é obrigatório" })
    .min(3, "Nome de usuário/email é obrigatório e maior que 3 caracteres"),
  password: z
    .string({ message: "Nome de usuário ou email é obrigatório" })
    .min(5, "A senha deve possuir ao menos 5 caracteres"),
});
