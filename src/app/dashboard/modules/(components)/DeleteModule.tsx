"use client";

import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ModulesService from "@/src/services/ModulesService";
import { ModulesData } from "@/src/models/types/Modules";
import ModuleStylePreview from "./ModuleStylePreview";
import Link from "next/link";

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
    <section className="w-[400px] border text-textColor border-textColor p-8 rounded-xl shadow-2xl flex flex-col items-start jusitfy-center bg-white space-y-10">
      <div className="flex justify-between w-full mb-6">
        <h1 className="self-start font-bold  text-textColor mb-6 text-xl">
          Deletar Módulo
        </h1>
        <Link href={"/dashboard/modules"}>
          <X />
        </Link>
      </div>
      <header className=" flex items-center justify-between w-full mb-6">
        <h1 className="font-bold text-xl">{moduleInfo.name}</h1>
        <ModuleStylePreview modulePreview={moduleTagInfo} />
      </header>
      {moduleInfo.description && (
        <div>
          <p className="font-bold">Descrição</p>
          <p>{moduleInfo.description}</p>
        </div>
      )}
      <p className="font-semibold">Tem certeza que deseja deletar o módulo?</p>
      <div className="flex justify-between w-full">
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
    </section>
  );
};

export default DeleteModule;
