"use client";

import Content from "@/src/components/content";
import UserTable from "@/src/components/user/UserTable";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/lib/filters";
import Sort from "@/src/lib/sort";
import { User } from "@/src/models/User";
import { Plus } from "lucide-react";
import React, { useState } from "react";

interface UserPageProps {
  data: User[];
}

const UserUtilityBarConfig = {
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
    onClick: () => {
      alert("Clicou adiconar usuário");
    },
  },
};

const CCUsersPage = ({ data }: UserPageProps) => {
  const [order, setOrder] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const filteredUsers = Filter.Users(data, search);
  const sortedUsers = Sort.Users(filteredUsers, order);
  return (
    <Content.Root>
      <Content.Title title="Usuários" />
      <UtilityBar
        config={UserUtilityBarConfig}
        setSearch={setSearch}
        setOrder={setOrder}
      />
      <UserTable users={sortedUsers} />
    </Content.Root>
  );
};

export default CCUsersPage;
