"use client";

import Content from "@/src/components/page-content";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/lib/filters";
import Sort from "@/src/lib/sort";
import React, { useState } from "react";
import Modal from "@/src/components/modal";
import Forms from "@/src/components/forms";
import { ModulesData } from "@/src/models/types/Modules";
import ModuleTable from "./ModuleTable";

interface ModulesPageProps {
  data: ModulesData[];
}

const UserUtilityBarConfig = {
  selectOptions: [
    { value: "name", label: "Nome" },
    { value: "createdAsc", label: "Data criação (cresc)" },
    { value: "createdDesc", label: "Data criação (decr)" },
    { value: "updatedAsc", label: "Última atualização (cresc)" },
    { value: "updatedDesc", label: "Última atualização (decr)" },
  ],
  buttonConfig: {
    label: "Adicionar Módulo",
  },
};

const CCModulesPage = ({ data }: ModulesPageProps) => {
  const [order, setOrder] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const filteredModules = Filter.Modules(data, search);
  const sortedModules = Sort.Modules(filteredModules, order);
  return (
    <Content.Root>
      <Content.Title title="Usuários" />
      <UtilityBar
        setShowModal={setShowCreateModal}
        config={UserUtilityBarConfig}
        setSearch={setSearch}
        setOrder={setOrder}
      />
      <ModuleTable modules={sortedModules} />

      {showCreateModal && (
        <Modal.Root setShowModal={setShowCreateModal}>
          <Forms.CreateModule setShowModal={setShowCreateModal} />
        </Modal.Root>
      )}
    </Content.Root>
  );
};

export default CCModulesPage;
