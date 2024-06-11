"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  createProfileFunctionLink,
  createProfileModuleLink,
  createProfileTransactionLink,
} from "@/src/models/validation";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProfilesService from "@/src/services/ProfileService";

import { Function, ModulesData, Transaction } from "@/src/models/types/Modules";
import { Suspense, useEffect, useState } from "react";

interface CreateProfileFunctionFormProps {
  profile_id: number;
  transaction_id: number;
}

const CreateProfileFunctionForm = ({
  profile_id,
  transaction_id,
}: CreateProfileFunctionFormProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof createProfileFunctionLink>>({
    resolver: zodResolver(createProfileFunctionLink),
    defaultValues: {
      functionIds: [],
    },
  });

  const [availableFunctions, setAvailableFunctions] = useState<Function[]>([]);

  useEffect(() => {
    const fetchAvailableData = async () => {
      try {
        const fetchedData = await ProfilesService.getAvailableFunctions(
          profile_id,
          transaction_id
        );
        if (fetchedData) setAvailableFunctions(fetchedData);
      } catch (error) {
        const { id } = toast({
          variant: "destructive",
          description: (
            <div className="flex space-x-4 font-bold">
              <AlertCircle color="white" />
              <p>Erro ao carregar transações disponíveis</p>
            </div>
          ),
        });
      }
    };

    fetchAvailableData();
  }, []);

  const onSubmit = async (data: z.infer<typeof createProfileFunctionLink>) => {
    try {
      const profileModules = await ProfilesService.postProfileFunction(
        profile_id,
        transaction_id,
        data
      );
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Funções vinculado ao perfil com sucesso!</p>
          </div>
        ),
      });
      router.push(`/dashboard/profiles/${profile_id}`);
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
          Vincular permissão do perfil as transações
        </h1>
        <Link href={`/dashboard/profiles/${profile_id}`}>
          <X />
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="functionIds"
            render={() => (
              <FormItem>
                <div className="mb-4"></div>
                <Suspense fallback={<p>Carregando funções disponiveis.</p>}>
                  {availableFunctions.length > 0 ? (
                    <>
                      <FormLabel className="text-base">
                        Funções disponíveis
                      </FormLabel>
                      <FormDescription>
                        Selecione as funções que você deseja associar a
                        transação
                      </FormDescription>{" "}
                    </>
                  ) : (
                    <>
                      <FormLabel className="text-base">
                        Parece que não há funções disponíveis
                      </FormLabel>
                      <FormDescription>
                        Esse perfil já tem permissão de acesso a todos as
                        funções
                      </FormDescription>
                    </>
                  )}

                  {availableFunctions.map((module, idx) => (
                    <FormField
                      key={module.id}
                      control={form.control}
                      name="functionIds"
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
          {availableFunctions.length > 0 ? (
            <Button type="submit">Vincular</Button>
          ) : (
            <Link href={`/dashboard/profiles/${profile_id}`}>
              <Button className="mt-4" type="submit">
                Voltar
              </Button>
            </Link>
          )}
        </form>
      </Form>
    </section>
  );
};

export default CreateProfileFunctionForm;
