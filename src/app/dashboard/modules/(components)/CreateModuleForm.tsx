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
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import ModulesService from "@/src/services/ModulesService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createModuleSchema } from "../../../../models/validation";

const CreateModuleForm = () => {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof createModuleSchema>>({
    resolver: zodResolver(createModuleSchema),
    defaultValues: {
      background_color: "#000000",
      text_color: "#ffffff",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const [modulePreview, setModulePreview] = useState({
    name: "Meu Módulo",
    text_color: "#ffffff",
    background_color: "#000000",
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
      const newModule = await ModulesService.postModule(data);
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Módulo cadastrado com sucesso!</p>
          </div>
        ),
      });
      router.push(`/dashboard/modules`);
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
    <section className="w-[400px] border border-inputBorder p-8 rounded-md shadow-2xl flex flex-col items-center jusitfy-center bg-white">
      <div className="flex justify-between w-full">
        <h1 className="self-start font-bold  text-textColor mb-6 text-xl">
          Adicionar Módulo
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

          <Button disabled={isSubmitting} className="w-full" type="submit">
            {isSubmitting && (
              <LoaderCircle className="animate-spin self-center align-middle mr-4" />
            )}
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
    background_color: string;
    text_color: string;
  };
};
const ModuleStylePreview = ({ modulePreview }: ModulePreviewProps) => {
  const { background_color, name, text_color } = modulePreview;
  return (
    <>
      <p className="text-textColor font-semibold text-sm">Preview</p>
      <div
        className={`rounded-2xl flex items-center justify-center h-[40px] font-bold `}
        style={{
          backgroundColor: background_color,
          color: text_color,
          border: `2px ${text_color} solid`,
        }}
      >
        {name}
      </div>
    </>
  );
};

export default CreateModuleForm;
