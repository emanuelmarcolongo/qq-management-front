"use client";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/src/components/ui/input";
import { useToast } from "@/src/components/ui/use-toast";
import authService from "@/src/services/AuthService";
import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { passwordResetSchema } from "../../models/validation";

interface PasswordResetFormProps {
  token: string;
}

const PasswordResetForm = ({ token }: PasswordResetFormProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = async (data: z.infer<typeof passwordResetSchema>) => {
    const passwordResetData = {
      token,
      password: data.password,
    };
    try {
      const requestPasswordReset = await authService.resetPassword(
        passwordResetData
      );
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Senha redefinida com sucesso!</p>
          </div>
        ),
      });

      router.push("/");
    } catch (error) {
      let message = "Erro ao redefinir senha";
      if (error instanceof Error) {
        message = error.message;
      }

      toast({
        variant: "destructive",
        description: (
          <div className="flex space-x-4 font-bold">
            <AlertCircle color="white" />
            <p>{message}</p>
          </div>
        ),
      });
    }

    router.refresh();
  };

  return (
    <main className="flex flex-col items-center ">
      <section className="w-[400px] border border-secondary p-8 rounded-md shadow-2xl flex flex-col items-center jusitfy-center bg-white">
        <h1 className="self-start font-bold text-textColor mb-4 text-xl">
          Redefina sua senha
        </h1>

        <h2 className="mb-12 text-textColor text-sm self-start">
          Digite a sua nova senha e confirme!
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Continuar
            </Button>
          </form>
        </Form>
        <Link
          className="font-bold text-sm text-indigo-700 mt-10 self-start hover:text-textColor hover:cursor-pointer"
          href={"/"}
        >
          Voltar para o login
        </Link>
      </section>
    </main>
  );
};

export default PasswordResetForm;
