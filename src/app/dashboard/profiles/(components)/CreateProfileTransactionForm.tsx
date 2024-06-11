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
  createProfileModuleLink,
  createProfileTransactionLink,
} from "@/src/models/validation";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProfilesService from "@/src/services/ProfileService";

import { ModulesData, Transaction } from "@/src/models/types/Modules";
import { Suspense, useEffect, useState } from "react";

interface CreateProfileTransactionFormProps {
  profile_id: number;
  module_id: number;
}

const CreateProfileTransactionForm = ({
  profile_id,
  module_id,
}: CreateProfileTransactionFormProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof createProfileTransactionLink>>({
    resolver: zodResolver(createProfileTransactionLink),
    defaultValues: {
      transactionIds: [],
    },
  });

  const [availableTransactions, setAvailableTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    const fetchAvailableModules = async () => {
      try {
        const fetchedModules = await ProfilesService.getAvailableTransactions(
          profile_id,
          module_id
        );
        if (fetchedModules) setAvailableTransactions(fetchedModules);
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

    fetchAvailableModules();
  }, []);

  const onSubmit = async (
    data: z.infer<typeof createProfileTransactionLink>
  ) => {
    try {
      const profileModules = await ProfilesService.postProfileTransaction(
        profile_id,
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
            name="transactionIds"
            render={() => (
              <FormItem>
                <div className="mb-4"></div>
                <Suspense fallback={<p>Carregando transações disponiveis.</p>}>
                  {availableTransactions.length > 0 ? (
                    <>
                      <FormLabel className="text-base">
                        Transações disponíveis
                      </FormLabel>
                      <FormDescription>
                        Selecione os transações que você deseja dar permissão
                      </FormDescription>{" "}
                    </>
                  ) : (
                    <>
                      <FormLabel className="text-base">
                        Parece que não há transações disponíveis
                      </FormLabel>
                      <FormDescription>
                        Esse perfil já tem permissão de acesso a todos as
                        transações
                      </FormDescription>
                    </>
                  )}

                  {availableTransactions.map((module, idx) => (
                    <FormField
                      key={module.id}
                      control={form.control}
                      name="transactionIds"
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
          {availableTransactions.length > 0 ? (
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

export default CreateProfileTransactionForm;
