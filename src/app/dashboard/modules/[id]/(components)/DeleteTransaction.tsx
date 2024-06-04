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
import Card from "@/src/components/card";

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
    <Card.Container>
      <Card.Header
        link={`/dashboard/modules/${module_id}`}
        title="Deletar transação"
        Icon={ArrowRightLeft}
      />
      <Card.Section>
        <Card.Item>
          <Card.Label>{transactionInfo.name}</Card.Label>
        </Card.Item>
        <Card.Item>
          <Card.Label>Descrição</Card.Label>
          <Card.Description>
            {transactionInfo.description || "Sem descrição"}
          </Card.Description>
        </Card.Item>
      </Card.Section>

      <Card.Section>
        <Card.Item>
          <Card.Label> Tem certeza que deseja deletar a transação?</Card.Label>
          <Card.Description>
            Essa ação irá deletar todos os vinculos com os perfis e funções que
            essa transação possui
          </Card.Description>
        </Card.Item>
      </Card.Section>

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
    </Card.Container>
  );
};

export default DeleteTransaction;
