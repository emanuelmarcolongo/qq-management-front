"use client";

import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";
import {
  AlertCircle,
  AtSign,
  CheckCircle,
  Fingerprint,
  Mail,
  Tags,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserWithProfile } from "@/src/models/types/User";
import UserService from "@/src/services/UserService";

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
    <section className="w-[400px] border text-textColor border-textColor p-8 rounded-xl shadow-2xl flex flex-col items-start jusitfy-center bg-white ">
      <header className="flex justify-between w-full mb-6">
        <h1 className="self-start font-bold  text-textColor mb-6 text-lg">
          Deletar Usuário
        </h1>
        <Link href={"/dashboard/users"}>
          <X />
        </Link>
      </header>
      <article className=" w-full mb-6 space-y-2 font-medium text-md">
        <div className="flex items-center justify-start space-x-2">
          <User />
          <p className="">{userInfo.name}</p>
        </div>
        <div className="flex items-center justify-start space-x-2">
          <AtSign />
          <p className=" text-md">{userInfo.username}</p>
        </div>
        <div className="flex items-center justify-start space-x-2">
          <Tags />
          <p className=" text-md">{userInfo.profile.name}</p>
        </div>
        <div className="flex items-center justify-start space-x-2">
          <Fingerprint />
          <p className=" text-md">{userInfo.registration}</p>
        </div>
        <div className="flex items-center justify-start space-x-2">
          <Mail />
          <p className=" text-md">{userInfo.email}</p>
        </div>
      </article>

      <div className="mt-10">
        <p className="font-semibold">
          Tem certeza que deseja deletar o usuário?
        </p>
        <div className="flex justify-between w-full mt-10">
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
    </section>
  );
};

export default DeleteUser;
