"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useToast } from "@/src/components/ui/use-toast";
import { registerUserSchema } from "../../schemas";
import { Input } from "@/src/components/ui/input";

const CreateUserForm = () => {
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit = (data: z.infer<typeof registerUserSchema>) => {
    const { id } = toast({
      description: (
        <div className="bg-secondary p-4 text-bold mt-2 w-[340px] rounded-md text-white">
          <p className=" mb-4 font-bold ">Usuário cadastrado com sucesso!</p>
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      ),
    });

    setTimeout(() => dismiss(id), 2000);
  };

  return (
    <section className="w-[400px] border border-secondary p-8 rounded-xl shadow-2xl flex flex-col items-center jusitfy-center bg-white">
      <h1 className="self-start font-bold text-textColor mb-6 text-xl">
        Cadastro de usuários
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  * Essa será a credencial de acesso ao sistema.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="profile_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perfil do colaborador(a)</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Caixa VC</SelectItem>
                    <SelectItem value="2">Estabelecimento</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Cadastrar
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CreateUserForm;
