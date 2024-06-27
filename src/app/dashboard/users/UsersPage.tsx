"use client";

import Content from "@/src/components/page-content";
import UserTable from "./(components)/UserTable";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/lib/filters";
import Sort from "@/src/lib/sort";
import { UserWithProfile } from "@/src/models/types/User";
import React, { useState } from "react";
import Modal from "@/src/components/modal";
import CreateUserForm from "./(components)/CreateUserForm";
import convertStringToInt from "@/src/lib/utils/ConvertStringToInt";
import convertStringToBoolean from "@/src/lib/utils/ConvertStringToBool";
import { useSearchParams } from "next/navigation";
import UpdateUserForm from "./(components)/UpdateUserForm";
import DeleteUser from "./(components)/DeleteUser";
import { Button } from "@/src/components/ui/button";
import { generateExcel } from "@/src/lib/file-saver";
import { mapUserData } from "@/src/utils/mappers/mapUserData";
import { Download } from "lucide-react";

interface UserPageProps {
  data: UserWithProfile[];
}

const UserUtilityBarConfig = {
  baseUrl: "/dashboard/users",
  selectOptions: [
    { value: "name", label: "Nome" },
    { value: "registrationAsc", label: "Matrícula (cresc)" },
    { value: "registrationDesc", label: "Matrícula (decr)" },
    { value: "createdAsc", label: "Data criação (cresc)" },
    { value: "createdDesc", label: "Data criação (decr)" },
    { value: "updatedAsc", label: "Última atualização (cresc)" },
    { value: "updatedDesc", label: "Última atualização (decr)" },
  ],
  buttonConfig: {
    label: "Adicionar usuário",
  },
};

const CCUsersPage = ({ data }: UserPageProps) => {
  const searchParams = useSearchParams();
  const userIdParams = searchParams.get("id");
  const orderByParams = searchParams.get("orderBy");
  const addModalParams = convertStringToBoolean(searchParams.get("add"));
  const editModalParams = convertStringToBoolean(searchParams.get("edit"));
  const deleteModalParams = convertStringToBoolean(searchParams.get("delete"));
  const [search, setSearch] = useState<string>("");

  const userInfo = data.find(
    (user) => user.id === convertStringToInt(userIdParams)
  );

  const filteredUsers = Filter.Users(data, search);
  const sortedUsers = Sort.Users(filteredUsers, orderByParams);
  return (
    <Content.Root>
      <Content.Title title="Usuários" />
      <UtilityBar config={UserUtilityBarConfig} setSearch={setSearch} />
      <Button
        className="mb-10 bg-secondary hover:bg-secondary/80"
        onClick={() =>
          generateExcel(
            mapUserData(data),
            "Relatório de Usuários",
            "userReport.xlsx"
          )
        }
      >
        <Download className="mr-4" />
        Baixar Relatório
      </Button>
      <UserTable users={sortedUsers} />

      {addModalParams && (
        <Modal.Root>
          <CreateUserForm />
        </Modal.Root>
      )}

      {editModalParams && userInfo && (
        <Modal.Root>
          <UpdateUserForm userInfo={userInfo} />
        </Modal.Root>
      )}
      {deleteModalParams && userInfo && (
        <Modal.Root>
          <DeleteUser userInfo={userInfo} />
        </Modal.Root>
      )}
    </Content.Root>
  );
};

export default CCUsersPage;
