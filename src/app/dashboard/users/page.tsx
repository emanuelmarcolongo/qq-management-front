import { Metadata } from "next";
import CCUsersPage from "./UsersPage";
import UserService from "@/src/services/UserService";

export const metadata: Metadata = {
  title: "Quero-Quero | Usuários",
};

const UsersPage = async () => {
  const users = await UserService.getUsers();
  if (!users) {
    throw new Error("Falha ao acessar os dados dos usuários, tente novamente!");
  }

  return <CCUsersPage data={users} />;
};

export default UsersPage;
