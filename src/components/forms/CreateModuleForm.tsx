"use client";

import React, { useState } from "react";
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
import { createModuleSchema } from "../../models/validation";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { CheckCircle } from "lucide-react";

const CreateModuleForm = () => {
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof createModuleSchema>>({
    resolver: zodResolver(createModuleSchema),
    defaultValues: {
      backgroundColor: "#000000",
      textColor: "#ffffff",
    },
  });

  const [modulePreview, setModulePreview] = useState({
    name: "Meu Módulo",
    textColor: "#ffffff",
    backgroundColor: "#000000",
  });

  const handleInputChange = () => {
    const { name, textColor, backgroundColor } = form.getValues();
    setModulePreview({
      name: name || "Meu Módulo",
      textColor: textColor || "#ffffff",
      backgroundColor: backgroundColor || "#000000",
    });
  };
  {
  }
  const onSubmit = (data: z.infer<typeof createModuleSchema>) => {
    const { id } = toast({
      description: (
        <div className="flex space-x-4">
          <CheckCircle color="#11945A" />
          <p>
            Usuário cadastrado com sucesso!<br></br>
            {JSON.stringify(data, null, 2)}
          </p>
        </div>
      ),
    });

    setTimeout(() => dismiss(id), 2000);
  };

  return (
    <section className="w-[400px] border border-secondary p-8 rounded-xl shadow-2xl flex flex-col items-center jusitfy-center bg-white">
      <h1 className="self-start font-bold text-textColor mb-6 text-xl">
        Adicionar módulo
      </h1>
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
              name="backgroundColor"
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
              name="textColor"
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
            Cadastrar
          </Button>
        </form>
      </Form>
    </section>
  );
};

type ModulePreviewProps = {
  modulePreview: {
    name: string;
    backgroundColor: string;
    textColor: string;
  };
};
const ModuleStylePreview = ({ modulePreview }: ModulePreviewProps) => {
  const { backgroundColor, name, textColor } = modulePreview;
  return (
    <>
      <p className="text-textColor font-semibold text-sm">Preview</p>
      <div
        className={`rounded-2xl flex items-center justify-center h-[40px] font-bold `}
        style={{
          backgroundColor,
          color: textColor,
          border: `2px ${textColor} solid`,
        }}
      >
        {name}
      </div>
    </>
  );
};

export default CreateModuleForm;
