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
import {
  createTransactionSchema,
  registerUserSchema,
} from "../../models/validation";
import { Input } from "@/src/components/ui/input";
import { CheckCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";

const CreateTransactionForm = () => {
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
  });

  const onSubmit = (data: z.infer<typeof createTransactionSchema>) => {
    const { id } = toast({
      description: (
        <div className="flex space-x-4">
          <CheckCircle color="#11945A" />
          <p>Transação cadastrado com sucesso!</p>
        </div>
      ),
    });
  };

  return (
    <section className="w-[400px] border border-secondary p-8 rounded-xl shadow-2xl flex flex-col items-center jusitfy-center bg-white">
      <h1 className="self-start font-bold text-textColor mb-6 text-xl">
        Nova Transação
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Dê um breve resumo sobre a transação"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="module_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Módulo da transação</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Pagamento</SelectItem>
                    <SelectItem value="2">Cadastro (CA)</SelectItem>
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

export default CreateTransactionForm;
