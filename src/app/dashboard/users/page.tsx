import CCUsersPage from "./UsersPage";
import UserService from "@/src/services/UserService";
import { notFound } from "next/navigation";

const UsersPage = async () => {
  const users = await UserService.getUsers();
  if (!users) {
    throw notFound();
  }

  users.forEach((user) => console.log(typeof user.created_at));

  return <CCUsersPage data={users} />;
};

export default UsersPage;
