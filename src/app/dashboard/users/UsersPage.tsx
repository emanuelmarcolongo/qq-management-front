"use client";

import Content from "@/src/components/page-content";
import UserTable from "./UserTable";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/lib/filters";
import Sort from "@/src/lib/sort";
import { User } from "@/src/models/types/User";
import React, { useState } from "react";
import Modal from "@/src/components/modal";
import Forms from "@/src/components/forms";

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
  },
};

const CCUsersPage = ({ data }: UserPageProps) => {
  const [order, setOrder] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const filteredUsers = Filter.Users(data, search);
  const sortedUsers = Sort.Users(filteredUsers, order);
  return (
    <Content.Root>
      <Content.Title title="Usuários" />
      <UtilityBar
        setShowModal={setShowCreateModal}
        config={UserUtilityBarConfig}
        setSearch={setSearch}
        setOrder={setOrder}
      />
      <UserTable users={sortedUsers} />

      {showCreateModal && (
        <Modal.Root setShowModal={setShowCreateModal}>
          <Forms.CreateUser setShowModal={setShowCreateModal} />
        </Modal.Root>
      )}
    </Content.Root>
  );
};

export default CCUsersPage;
