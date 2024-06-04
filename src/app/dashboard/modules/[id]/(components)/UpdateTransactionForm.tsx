"use client";

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
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Transaction } from "@/src/models/types/Modules";
import Link from "next/link";
import { createTransactionSchema } from "@/src/models/validation";
import transactionService from "@/src/services/TransactionService";

interface UpdateTransactionFormProps {
  transactionInfo: Transaction;
  module_id: number;
}

const UpdateTransactionForm = ({
  transactionInfo,
  module_id,
}: UpdateTransactionFormProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      name: transactionInfo.name,
      description: transactionInfo?.description || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createTransactionSchema>) => {
    const dataWithModule = {
      ...data,
      module_id,
    };
    try {
      const updatedFunction = await transactionService.updateTransaction(
        dataWithModule,
        transactionInfo.id
      );
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Transação editada com sucesso!</p>
          </div>
        ),
      });
      router.push(`/dashboard/modules/${module_id}`);
      router.refresh();
    } catch (error) {
      let message = "Erro ao atualizar função";
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
          Editar Transação
        </h1>
        <Link href={`/dashboard/modules/${module_id}`}>
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
                    placeholder="Dê um breve resumo sobre a transação"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Atualizar
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default UpdateTransactionForm;
