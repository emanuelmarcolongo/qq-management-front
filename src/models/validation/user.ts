import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório" })
    .min(5, "O nome do colaborador(a) deve conter ao menos que 5 caracteres"),
  username: z
    .string({ message: "Nome de usuário é obrigatório" })
    .min(5, "O nome de usuário deve conter mais que 5 caracteres")
    .max(20, "O nome de usuáriodeve conter menos que 20 caracteres")
    .toLowerCase(),
  registration: z
    .string({ message: "Matrícula é obrigatória" })
    .length(6, "A matrícula deve ser composta por 6 caracteres")
    .regex(/^[0-9]+$/, "Os caracteres devem ser numéricos"),
  email: z
    .string({ message: "Email é obrigatório" })
    .email("Email inválido")
    .toLowerCase(),
  profile_id: z
    .number({ message: "O colaborador(a) precisa ser associado a um perfil" })
    .int("ID do perfil deve ser inteiro"),
});

export const userLoginSchema = z.object({
  username: z
    .string({ message: "Nome de usuário é obrigatório" })
    .min(5, "Usuário deve conter ao menos que 5 caracteres")
    .toLowerCase(),
  password: z
    .string({ message: "A senha é obrigatória" })
    .min(5, "A senha deve conter ao menos que 5 caracteres"),
});

export const passwordResetRequestSchema = z.object({
  email: z.string({ message: "Email é obrigatório" }).email("Email inválido"),
});

export const passwordResetSchema = z
  .object({
    password: z
      .string({ message: "A senha é obrigatória" })
      .min(5, "A senha deve conter pelo menos 5 caracteres"),
    confirmPassword: z
      .string({ message: "A senha é obrigatória" })
      .min(5, "A senha deve conter pelo menos 5 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
