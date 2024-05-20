"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import logo from "@/public/queroquero.webp";

import { useToast } from "@/src/components/ui/use-toast";
import { passwordResetRequestSchema } from "../../models/validation";
import { Input } from "@/src/components/ui/input";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const RequestPasswordResetForm = () => {
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof passwordResetRequestSchema>>({
    resolver: zodResolver(passwordResetRequestSchema),
  });

  const onSubmit = (data: z.infer<typeof passwordResetRequestSchema>) => {
    const { id } = toast({
      description: (
        <div className="flex space-x-4">
          <CheckCircle color="#11945A" />
          <p>Email enviado!</p>
        </div>
      ),
    });
  };

  return (
    <main className="flex flex-col items-center ">
      <Image
        src={logo}
        alt="Logo Lojas Quero-Quero"
        width={200}
        height={200}
        className="rounded-full mb-12 drop-shadow-2xl"
      />
      <section className="w-[400px] border border-secondary p-8 rounded-xl shadow-2xl flex flex-col items-center jusitfy-center bg-white">
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

export default RequestPasswordResetForm;
