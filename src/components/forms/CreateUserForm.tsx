"use client";

import React, { Dispatch, SetStateAction } from "react";
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
import { registerUserSchema } from "../../models/validation";
import { Input } from "@/src/components/ui/input";
import { CheckCircle, X } from "lucide-react";

interface CreateUserFormProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const CreateUserForm = ({ setShowModal }: CreateUserFormProps) => {
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit = (data: z.infer<typeof registerUserSchema>) => {
    const { id } = toast({
      description: (
        <div className="flex space-x-4">
          <CheckCircle color="#11945A" />
          <p>Usuário cadastrado com sucesso!</p>
        </div>
      ),
    });
  };

  return (
    <section className="w-[400px] border border-inputBorder p-8 rounded-md shadow-2xl flex flex-col items-center jusitfy-center bg-white">
      <div className="flex justify-between w-full">
        <h1 className="self-start font-bold  text-textColor mb-6 text-xl">
          Cadastro de usuários
        </h1>
        <X
          onClick={() => setShowModal(false)}
          className="hover:cursor-pointer"
        />
      </div>

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
