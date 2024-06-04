"use client";

import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";
import {
  AlertCircle,
  Badge,
  CheckCircle,
  Tag,
  Tags,
  Text,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserService from "@/src/services/UserService";
import { Profile } from "@/src/models/types/Profiles";
import ProfilesService from "@/src/services/ProfileService";
import Card from "@/src/components/card";

interface DeleteProfileProps {
  profileInfo: Profile;
}

const DeleteProfile = ({ profileInfo }: DeleteProfileProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();

  const onSubmit = async () => {
    try {
      const deletedProfile = await ProfilesService.deleteProfile(
        profileInfo.id
      );
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Perfil deletado com sucesso!</p>
          </div>
        ),
      });

      router.push("/dashboard/profiles");
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
        link="/dashboard/profiles"
        title="Deletar Perfil"
        Icon={Tag}
      />

      <Card.Section>
        <Card.Item>
          <Card.Label>Nome</Card.Label>
          <Card.Description>{profileInfo.name}</Card.Description>
        </Card.Item>
        <Card.Item>
          <Card.Label>Descrição</Card.Label>
          <Card.Description>
            {profileInfo.description || "Sem Descrição"}
          </Card.Description>
        </Card.Item>
      </Card.Section>

      <div className="mt-10">
        <Card.Item>
          <Card.Label>Tem certeza que deseja deletar o perfil?</Card.Label>
          <Card.Description>
            Certifique-se que não há usuários com esse perfil antes de
            deletá-lo.<br></br>
            Essa ação irá deletar todas as associações existentes entre o perfil
            e módulo, transações e funções
          </Card.Description>
        </Card.Item>
        <div className="flex justify-between w-full mt-10">
          <Button
            onClick={() => onSubmit()}
            variant={"ghost"}
            className="w-[47%] ring-1 ring-textColor"
          >
            Deletar
          </Button>

          <Button className="w-[47%] ring-1 ring-textColor">
            <Link href={"/dashboard/profiles"}>Cancelar</Link>
          </Button>
        </div>
      </div>
    </Card.Container>
  );
};

export default DeleteProfile;
