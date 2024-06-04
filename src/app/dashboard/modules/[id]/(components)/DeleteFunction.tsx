"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/src/components/ui/use-toast";
import { AlertCircle, CheckCircle, GripHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Function } from "@/src/models/types/Modules";
import Link from "next/link";
import { createFunctionSchema } from "@/src/models/validation";
import { Button } from "@/src/components/ui/button";
import React from "react";
import functionService from "@/src/services/FunctionService";
import Card from "@/src/components/card";

interface DeleteFunctionProps {
  functionInfo: Function;
  module_id: number;
}

const DeleteFunction = ({ functionInfo, module_id }: DeleteFunctionProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof createFunctionSchema>>({
    resolver: zodResolver(createFunctionSchema),
    defaultValues: {
      name: functionInfo.name,
      description: functionInfo?.description || "",
    },
  });

  const onSubmit = async () => {
    try {
      const deleteFunction = await functionService.deleteFunction(
        functionInfo.id
      );
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Função deletada com sucesso!</p>
          </div>
        ),
      });
      router.push(`/dashboard/modules/${module_id}`);
      router.refresh();
    } catch (error) {
      let message = "Erro ao deletar função";
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
        title="Deletar Função"
        Icon={GripHorizontal}
      />

      <Card.Section>
        <Card.Item>
          <Card.Label>Descrição</Card.Label>
          <Card.Description>
            {functionInfo.description || "Sem descrição"}
          </Card.Description>
        </Card.Item>
      </Card.Section>
      <Card.Item>
        <Card.Label> Tem certeza que deseja deletar a função?</Card.Label>
        <Card.Description>
          Essa ação irá deletar todos os vinculos com os perfis e transações que
          essa função possui
        </Card.Description>
      </Card.Item>

      <div className="flex justify-between w-full">
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

export default DeleteFunction;
