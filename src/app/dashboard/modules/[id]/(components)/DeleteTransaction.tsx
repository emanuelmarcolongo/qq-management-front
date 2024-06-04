"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/src/components/ui/use-toast";
import { AlertCircle, CheckCircle, ArrowRightLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Transaction } from "@/src/models/types/Modules";
import Link from "next/link";
import { createTransactionSchema } from "@/src/models/validation";
import { Button } from "@/src/components/ui/button";
import React from "react";

import transactionService from "@/src/services/TransactionService";

interface DeleteTransactionProps {
  transactionInfo: Transaction;
  module_id: number;
}

const DeleteTransaction = ({
  transactionInfo,
  module_id,
}: DeleteTransactionProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      name: transactionInfo.name,
      description: transactionInfo?.description || "",
    },
  });

  const onSubmit = async () => {
    try {
      const deleteTransaction = await transactionService.deleteTransaction(
        transactionInfo.id
      );
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Transação deletada com sucesso!</p>
          </div>
        ),
      });
      router.push(`/dashboard/modules/${module_id}`);
      router.refresh();
    } catch (error) {
      let message = "Erro ao deletar transação";
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
    <section className="w-[400px] border border-inputBorder p-8  space-y-10 rounded-md shadow-2xl flex flex-col items-start  bg-white">
      <header className="flex justify-between w-full">
        <h1 className="flex items-center justify-start space-x-2 font-bold  text-textColortext-xl">
          <ArrowRightLeft className="mr-2" /> {transactionInfo.name}
        </h1>
        <Link href={`/dashboard/modules/${module_id}`}>
          <X />
        </Link>
      </header>
      <div>
        {transactionInfo.description && (
          <div className="space-y-4">
            <p className="text-medium font-semibold">Descrição</p>
            <p className="text-sm">{transactionInfo.description}</p>
          </div>
        )}
      </div>

      <article className=" space-y-4">
        <p className="font-semibold">
          Tem certeza que deseja deletar a transação?
        </p>
        <p className="text-sm">
          Essa ação irá deletar todos os vinculos com os perfis e funções que
          essa transação possui
        </p>
      </article>
      <div className="flex justify-between w-full ">
        <Button
          onClick={() => onSubmit()}
          variant={"ghost"}
          className="w-[47%] ring-1 ring-textColor"
        >
          Deletar
        </Button>

        <Button className="w-[47%] ring-1 ring-textColor">
          <Link href={`/dashboard/modules/${module_id}`}>Cancelar</Link>
        </Button>
      </div>
    </section>
  );
};

export default DeleteTransaction;
