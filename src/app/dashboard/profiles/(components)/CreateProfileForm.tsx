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
import { createProfileSchema } from "@/src/models/validation";
import ProfilesService from "@/src/services/ProfileService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreatProfileForm = () => {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof createProfileSchema>>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: z.infer<typeof createProfileSchema>) => {
    try {
      const newProfile = await ProfilesService.createProfile(data);
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Perfil cadastrado com sucesso!</p>
          </div>
        ),
      });
      router.push(`/dashboard/profiles`);
      router.refresh();
    } catch (error) {
      let message = "Erro ao cadastrar perfil";
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
    <section className="w-[400px]  max-h-[700px]  border border-inputBorder p-8 rounded-md shadow-2xl flex flex-col items-center jusitfy-center bg-white overflow-y-auto text-sm">
      <div className="flex justify-between w-full">
        {isSubmitting && (
          <h1 className="self-start font-bold  text-textColor mb-6 text-xl">
            ADICIONANDO PERFIL
          </h1>
        )}
        <h1 className="self-start font-bold  text-textColor mb-6 text-xl">
          Adicionar Perfil
        </h1>
        <Link href={"/dashboard/profiles"}>
          <X />
        </Link>
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Dê um breve resumo sobre o perfil"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default CreatProfileForm;
