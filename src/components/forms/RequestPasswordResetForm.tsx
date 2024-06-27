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
import { AlertCircle, CheckCircle, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { passwordResetRequestSchema } from "../../models/validation";

const RequestPasswordResetForm = () => {
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof passwordResetRequestSchema>>({
    resolver: zodResolver(passwordResetRequestSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: z.infer<typeof passwordResetRequestSchema>) => {
    try {
      const requestPasswordReset = await authService.requestPasswordReset(data);
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Requisição feita com sucesso! Confira seu e-mail</p>
          </div>
        ),
      });
    } catch (error) {
      let message = "Erro ao solicitar redefinição de senha";
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
  };

  return (
    <main className="flex flex-col items-center ">
      <section className="w-[400px] border border-secondary p-8 rounded-md shadow-2xl flex flex-col items-center jusitfy-center bg-white">
        <h1 className="self-start font-bold text-textColor mb-4 text-xl">
          Redefina sua senha
        </h1>

        <h2 className="mb-12 text-textColor text-sm">
          Informe o e-mail associado à sua conta para receber um link de
          redefinição de senha
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} className="w-full" type="submit">
              {isSubmitting && (
                <LoaderCircle className="animate-spin self-center align-middle mr-4" />
              )}
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

export default RequestPasswordResetForm;
