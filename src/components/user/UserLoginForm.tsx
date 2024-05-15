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
import { userLoginSchema } from "../../schemas";
import { Input } from "@/src/components/ui/input";
import Image from "next/image";

const UserLoginForm = () => {
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = (data: z.infer<typeof userLoginSchema>) => {
    const { id } = toast({
      description: (
        <div className="bg-secondary p-4 text-bold mt-2 w-[340px] rounded-md text-white">
          <p className=" mb-4 font-bold ">Tentativa de Login de:</p>
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      ),
    });

    setTimeout(() => dismiss(id), 2000);
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
        <h1 className="self-start font-bold text-textColor mb-6 text-xl">
          Acesse sua conta
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="usernameOrEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário ou e-mail</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Entrar
            </Button>
          </form>
        </Form>
        <p className="font-bold text-sm text-indigo-700 mt-10 self-start hover:text-textColor hover:cursor-pointer">
          Esqueceu sua senha?
        </p>
      </section>
    </main>
  );
};

export default UserLoginForm;
