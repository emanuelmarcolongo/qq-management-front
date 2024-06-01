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
  const [search, setSearch] = useState<string>("");

  const filteredUsers = Filter.Users(data, search);
  const sortedUsers = Sort.Users(filteredUsers, orderByParams);
  return (
    <Content.Root>
      <Content.Title title="Usuários" />
      <UtilityBar config={UserUtilityBarConfig} setSearch={setSearch} />
      <UserTable users={sortedUsers} />

      {addModalParams && (
        <Modal.Root>
          <CreateUserForm />
        </Modal.Root>
      )}
    </Content.Root>
  );
};

export default CCUsersPage;
