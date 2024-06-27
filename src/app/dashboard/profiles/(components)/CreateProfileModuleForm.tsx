"use client";

import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { useToast } from "@/src/components/ui/use-toast";
import { createProfileModuleLink } from "@/src/models/validation";
import ProfilesService from "@/src/services/ProfileService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ModulesData } from "@/src/models/types/Modules";
import { Suspense, useEffect, useState } from "react";

interface CreateProfileModuleFormProps {
  profileId: number;
}

const CreatProfileModuleForm = ({
  profileId,
}: CreateProfileModuleFormProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof createProfileModuleLink>>({
    resolver: zodResolver(createProfileModuleLink),
    defaultValues: {
      moduleIds: [],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const [availableModules, setAvailableModules] = useState<ModulesData[]>([]);

  useEffect(() => {
    const fetchAvailableModules = async () => {
      try {
        const fetchedModules = await ProfilesService.getAvailableModules(
          profileId
        );
        if (fetchedModules) setAvailableModules(fetchedModules);
      } catch (error) {
        const { id } = toast({
          variant: "destructive",
          description: (
            <div className="flex space-x-4 font-bold">
              <AlertCircle color="white" />
              <p>Erro ao carregar módulos disponíveis</p>
            </div>
          ),
        });
      }
    };

    fetchAvailableModules();
  }, []);

  const onSubmit = async (data: z.infer<typeof createProfileModuleLink>) => {
    try {
      const profileModules = await ProfilesService.postProfileModule(
        profileId,
        data
      );
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Módulo(s) vinculado ao perfil com sucesso!</p>
          </div>
        ),
      });
      router.push(`/dashboard/profiles/${profileId}`);
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
        <h1 className="self-start font-bold  text-textColor mb-6 text-xl">
          Permissão Perfil-Módulo
        </h1>
        <Link href={`/dashboard/profiles/${profileId}`}>
          <X />
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="moduleIds"
            render={() => (
              <FormItem>
                <div className="mb-4"></div>
                <Suspense fallback={<p>Carregando módulos disponiveis.</p>}>
                  {availableModules.length > 0 ? (
                    <>
                      <FormLabel className="text-base">
                        Módulos disponíveis
                      </FormLabel>
                      <FormDescription>
                        Selecione os módulos que você deseja dar permissão
                      </FormDescription>{" "}
                    </>
                  ) : (
                    <>
                      <FormLabel className="text-base">
                        Parece que não há módulos disponíveis
                      </FormLabel>
                      <FormDescription>
                        Esse perfil já tem permissão de acesso a todos os
                        módulos
                      </FormDescription>
                    </>
                  )}

                  {availableModules.map((module, idx) => (
                    <FormField
                      key={module.id}
                      control={form.control}
                      name="moduleIds"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(module.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        module.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== module.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {module.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </Suspense>
                <FormMessage />
              </FormItem>
            )}
          />
          {availableModules.length > 0 ? (
            <Button disabled={isSubmitting} className="w-full" type="submit">
              {isSubmitting && (
                <LoaderCircle className="animate-spin self-center align-middle mr-4" />
              )}
              Vincular
            </Button>
          ) : (
            <Link href={`/dashboard/profiles/${profileId}`}>
              <Button className="mt-4 w-full" type="submit">
                Voltar
              </Button>
            </Link>
          )}
        </form>
      </Form>
    </section>
  );
};

export default CreatProfileModuleForm;
