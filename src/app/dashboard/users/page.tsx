import UserTable from "@/src/components/table/UserTable";
import mockUsers from "@/src/data/datamock";
import React from "react";

const UserColumns = ["Matrícula", "Nome", "Perfil", "E-mail", "Ações"];

const UsersPage = () => {
  return (
    <div className="w-full m-6 bg-white h-screen ml-[320px] rounded-md p-4  ">
      <h1 className="text-textColor font-bold text-xl mb-10">Usuários</h1>
      <UserTable users={mockUsers} columns={UserColumns} />
    </div>
  );
};

export default UsersPage;
