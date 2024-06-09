"use client";

import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";
import { AlertCircle, CheckCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserWithProfile } from "@/src/models/types/User";
import UserService from "@/src/services/UserService";
import Card from "@/src/components/card";

interface DeleteUserProps {
  userInfo: UserWithProfile;
}

const DeleteUser = ({ userInfo }: DeleteUserProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();

  const onSubmit = async () => {
    try {
      const newUser = await UserService.deleteUser(userInfo.id);
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Usuário deletado com sucesso!</p>
          </div>
        ),
      });

      router.push("/dashboard/users");
      router.refresh();
    } catch (error) {
      let message = "Erro ao deletar usuário";
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
        Icon={User}
        link={`/dashboard/users`}
        title={`Deletar Usuário`}
      />

      <Card.Section>
        <Card.Item>
          <Card.Label>Nome</Card.Label>
          <Card.Description>{userInfo.name}</Card.Description>
        </Card.Item>
        <Card.Item>
          <Card.Label>Matrícula</Card.Label>
          <Card.Description>{userInfo.registration}</Card.Description>
        </Card.Item>
        <Card.Item>
          <Card.Label>E-mail</Card.Label>
          <Card.Description>{userInfo.email}</Card.Description>
        </Card.Item>
        <Card.Item>
          <Card.Label>Usuário</Card.Label>
          <Card.Description>{userInfo.username}</Card.Description>
        </Card.Item>
      </Card.Section>

      <div className="">
        <Card.Label>Tem certeza que deseja deletar o usuário?</Card.Label>
        <div className="flex justify-between w-full mt-4">
          <Button
            onClick={() => onSubmit()}
            variant={"ghost"}
            className="w-[47%] ring-1 ring-textColor"
          >
            Deletar
          </Button>

          <Button className="w-[47%] ring-1 ring-textColor">
            <Link href={"/dashboard/users"}>Cancelar</Link>
          </Button>
        </div>
      </div>
    </Card.Container>
  );
};

export default DeleteUser;
