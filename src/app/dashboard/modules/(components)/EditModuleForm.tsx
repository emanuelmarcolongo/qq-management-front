"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
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
import { useToast } from "@/src/components/ui/use-toast";
import { createModuleSchema } from "@/src/models/validation/module";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ModulesService from "@/src/services/ModulesService";
import { ModulesData } from "@/src/models/types/Modules";
import ModuleStylePreview from "./ModuleStylePreview";
import Link from "next/link";

interface CreateModuleFormProps {
  moduleInfo: ModulesData;
}

const UpdateModuleForm = ({ moduleInfo }: CreateModuleFormProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof createModuleSchema>>({
    resolver: zodResolver(createModuleSchema),
    defaultValues: {
      name: moduleInfo.name,
      description: moduleInfo?.description || "",
      background_color: moduleInfo.background_color || "#000000",
      text_color: moduleInfo.text_color || "#ffffff",
    },
  });

  const [modulePreview, setModulePreview] = useState({
    name: moduleInfo.name || "Meu Módulo",
    text_color: moduleInfo.text_color || "#ffffff",
    background_color: moduleInfo.background_color || "#000000",
  });

  const handleInputChange = () => {
    const { name, text_color, background_color } = form.getValues();
    setModulePreview({
      name: name || "Meu Módulo",
      text_color: text_color || "#ffffff",
      background_color: background_color || "#000000",
    });
  };
  {
  }
  const onSubmit = async (data: z.infer<typeof createModuleSchema>) => {
    try {
      const newModule = await ModulesService.updateModule(data, moduleInfo.id);
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Módulo editado com sucesso!</p>
          </div>
        ),
      });
      router.push("/dashboard/modules");
      router.refresh();
    } catch (error) {
      let message = "Erro ao cadastrar módulo";
      if (error instanceof Error) {
        message = error.message;
      }

      const { id } = toast({
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
    <section className="w-[400px] border border-textColor p-8 rounded-xl shadow-2xl flex flex-col items-center jusitfy-center bg-white">
      <div className="flex justify-between w-full">
        <h1 className="self-start font-bold  text-textColor mb-6 text-xl">
          Editar Módulo
        </h1>
        <Link href={"/dashboard/modules"}>
          <X />
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => handleInputChange()}
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
                    placeholder="Dê um breve resumo sobre o módulo"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="background_color"
              render={({ field }) => (
                <FormItem className="w-[43%]">
                  <FormLabel>Cor de fundo</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="text_color"
              render={({ field }) => (
                <FormItem className="w-[43%]">
                  <FormLabel>Cor do texto</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <ModuleStylePreview modulePreview={modulePreview} />

          <Button className="w-full" type="submit">
            Atualizar
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default UpdateModuleForm;
