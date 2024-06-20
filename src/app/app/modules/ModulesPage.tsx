"use client";

import Content from "@/src/components/page-content";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/lib/filters";
import Sort from "@/src/lib/sort";
import { ModulesData } from "@/src/models/types/Modules";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ModuleTable from "./(components)/ModuleTable";

interface ModulesPageProps {
  data: ModulesData[];
}

const UserUtilityBarConfig = {
  baseUrl: "/app/modules",
  selectOptions: [
    { value: "name", label: "Nome" },
    { value: "createdAsc", label: "Data criação (cresc)" },
    { value: "createdDesc", label: "Data criação (decr)" },
    { value: "updatedAsc", label: "Última atualização (cresc)" },
    { value: "updatedDesc", label: "Última atualização (decr)" },
  ],
};

const CCModulesPage = ({ data }: ModulesPageProps) => {
  const searchParams = useSearchParams();
  const orderByParams = searchParams.get("orderBy");
  const [search, setSearch] = useState<string>("");

  const filteredModules = Filter.Modules(data, search);
  const sortedModules = Sort.Modules(filteredModules, orderByParams);

  return (
    <Content.Root>
      <Content.Title title="Meus módulos" />
      <UtilityBar config={UserUtilityBarConfig} setSearch={setSearch} />
      <ModuleTable modules={sortedModules} />
    </Content.Root>
  );
};

export default CCModulesPage;
