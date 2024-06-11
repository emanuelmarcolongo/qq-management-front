"use client";

import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";
import { AlertCircle, CheckCircle, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProfilesService from "@/src/services/ProfileService";
import Card from "@/src/components/card";

interface DeleteProfileRelationProps {
  profile_id: number;
  type: ProfileType;
  entity_id: number;
}
const dictionary = {
  module: "módulo",
  transaction: "transação",
  function: "função",
};

type ProfileType = keyof typeof dictionary;

const DeleteProfileRelation = ({
  profile_id,
  type,
  entity_id,
}: DeleteProfileRelationProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();

  const onSubmit = async () => {
    try {
      if (type === "module") {
        const deletedProfileRelation =
          await ProfilesService.deleteProfileModule(profile_id, entity_id);
      } else if (type === "transaction") {
        const deletedProfileRelation =
          await ProfilesService.deleteProfileTransaction(profile_id, entity_id);
        // } else if (type === "function") {
        //    const deletedProfileRelation =
        //      await ProfilesService.deleteProfileModule(profile_id, entity_id);
      }

      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>
              Permissão do perfil com {dictionary[type]} revogada com sucesso!
            </p>
          </div>
        ),
      });

      router.push(`/dashboard/profiles/${profile_id}`);
      router.refresh();
    } catch (error) {
      let message = "Erro ao deletar perfil";
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
        link={`/dashboard/profiles/${profile_id}`}
        title={`Remover Permissão`}
      />

      <div className="mt-10">
        <Card.Item>
          <Card.Label>
            Tem certeza que deseja remover o vinculo do perfil com{" "}
            {dictionary[type]}?
          </Card.Label>
          <Card.Description>
            Essa ação irá deletar todas as associações existentes entre o perfil
            e {dictionary[type]} bem como as associações subsequentes
          </Card.Description>
        </Card.Item>
        <div className="flex justify-between w-full mt-10">
          <Button
            onClick={() => onSubmit()}
            variant={"ghost"}
            className="w-[47%] ring-1 ring-textColor"
          >
            Remover
          </Button>

          <Button className="w-[47%] ring-1 ring-textColor">
            <Link href={`/dashboard/profiles/${profile_id}`}>Cancelar</Link>
          </Button>
        </div>
      </div>
    </Card.Container>
  );
};

export default DeleteProfileRelation;
