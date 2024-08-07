"use client";

import Content from "@/src/components/page-content";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/utils/filters";
import Sort from "@/src/utils/sort";
import React, { useState } from "react";
import Modal from "@/src/components/modal";
import { ModulesData } from "@/src/models/types/Modules";
import ModuleTable from "./(components)/ModuleTable";
import UpdateModuleForm from "./(components)/UpdateModuleForm";
import DeleteModule from "./(components)/DeleteModule";
import CreateModuleForm from "./(components)/CreateModuleForm";
import { useSearchParams } from "next/navigation";
import convertStringToBoolean from "@/src/utils/converters/ConvertStringToBool";
import convertStringToInt from "@/src/utils/converters/ConvertStringToInt";
import { Button } from "@/src/components/ui/button";
import { generateExcel } from "@/src/lib/file-saver";
import { Download } from "lucide-react";

interface ModulesPageProps {
  data: ModulesData[];
}

const UserUtilityBarConfig = {
  baseUrl: "/dashboard/modules",
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
  const searchParams = useSearchParams();
  const moduleIdParams = searchParams.get("id");
  const orderByParams = searchParams.get("orderBy");
  const addModalParams = convertStringToBoolean(searchParams.get("add"));
  const editModalParams = convertStringToBoolean(searchParams.get("edit"));
  const deleteModalParams = convertStringToBoolean(searchParams.get("delete"));
  const [search, setSearch] = useState<string>("");
  const moduleInfo = data.find(
    (module) => module.id === convertStringToInt(moduleIdParams)
  );

  const filteredModules = Filter.Modules(data, search);
  const sortedModules = Sort.Modules(filteredModules, orderByParams);

  return (
    <Content.Root>
      <Content.Title title="Módulos" />
      <UtilityBar config={UserUtilityBarConfig} setSearch={setSearch} />
      <Button
        className="mb-10 bg-secondary hover:bg-secondary/80"
        onClick={() =>
          generateExcel(data, "Relatório de modulos", "modulesReport.xlsx")
        }
      >
        <Download className="mr-4" />
        Baixar Relatório
      </Button>
      <ModuleTable modules={sortedModules} />

      {addModalParams && (
        <Modal.Root>
          <CreateModuleForm />
        </Modal.Root>
      )}

      {editModalParams && (
        <Modal.Root>
          {moduleInfo && <UpdateModuleForm moduleInfo={moduleInfo} />}
        </Modal.Root>
      )}

      {deleteModalParams && moduleInfo && (
        <Modal.Root>{<DeleteModule moduleInfo={moduleInfo} />}</Modal.Root>
      )}
    </Content.Root>
  );
};

export default CCModulesPage;
