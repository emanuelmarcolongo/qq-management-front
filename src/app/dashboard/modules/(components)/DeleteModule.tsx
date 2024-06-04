"use client";

import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";
import { AlertCircle, CheckCircle, Package, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ModulesService from "@/src/services/ModulesService";
import { ModulesData } from "@/src/models/types/Modules";
import ModuleStylePreview from "./ModuleStylePreview";
import Link from "next/link";
import Card from "@/src/components/card";

interface CreateModuleFormProps {
  moduleInfo: ModulesData;
}

const DeleteModule = ({ moduleInfo }: CreateModuleFormProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();

  const moduleTagInfo = {
    name: moduleInfo.name,
    text_color: moduleInfo.text_color,
    background_color: moduleInfo.background_color,
  };

  const onSubmit = async () => {
    try {
      const newModule = await ModulesService.deleteModule(moduleInfo.id);
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Módulo deletado com sucesso!</p>
          </div>
        ),
      });

      router.push("/dashboard/modules");
      router.refresh();
    } catch (error) {
      let message = "Erro ao deletar módulo";
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
        link="/dashboard/modules"
        title="Deletar Módulo"
        Icon={Package}
      />

      <Card.Section>
        <Card.Item>
          <Card.Label>{moduleInfo.name}</Card.Label>
        </Card.Item>
        <Card.Item>
          <Card.Label>Descrição</Card.Label>
          <Card.Description>
            {moduleInfo.description || "Sem descrição"}
          </Card.Description>
        </Card.Item>
      </Card.Section>

      <Card.Section>
        <Card.Item>
          <Card.Label> Tem certeza que deseja deletar o módulo?</Card.Label>
          <Card.Description>
            Ao deletar esse módulo, você irá deletar todas as transações e
            funções a ele relacionadas, bem como as associações entre esses
            elementos e os perfis
          </Card.Description>
        </Card.Item>
      </Card.Section>
      <div className="flex justify-between w-full mt-10">
        <Button
          onClick={() => onSubmit()}
          variant={"ghost"}
          className="w-[47%] ring-1 ring-textColor"
        >
          Deletar
        </Button>

        <Button className="w-[47%] ring-1 ring-textColor">
          <Link href={"/dashboard/modules"}>Cancelar</Link>
        </Button>
      </div>
    </Card.Container>
  );
};

export default DeleteModule;
