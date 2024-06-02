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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useToast } from "@/src/components/ui/use-toast";
import { createFunctionSchema } from "../../models/validation";
import { Input } from "@/src/components/ui/input";
import { CheckCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";

const CreateFunctionForm = () => {
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof createFunctionSchema>>({
    resolver: zodResolver(createFunctionSchema),
  });

  const onSubmit = (data: z.infer<typeof createFunctionSchema>) => {
    const { id } = toast({
      description: (
        <div className="flex space-x-4">
          <CheckCircle color="#11945A" />
          <p>Função cadastrado com sucesso!</p>
        </div>
      ),
    });
  };

  return (
    <section className="w-[400px] border border-secondary p-8 rounded-md shadow-2xl flex flex-col items-center jusitfy-center bg-white">
      <h1 className="self-start font-bold text-textColor mb-6 text-xl">
        Nova Função
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
                    placeholder="Dê um breve resumo sobre a função"
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
                <FormLabel>Módulo da função</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Adicionar (Adic)</SelectItem>
                    <SelectItem value="2">Restringir</SelectItem>
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

export default CreateFunctionForm;
