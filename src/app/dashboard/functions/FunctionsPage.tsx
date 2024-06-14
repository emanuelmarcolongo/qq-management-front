"use client";

import Content from "@/src/components/page-content";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/lib/filters";
import Sort from "@/src/lib/sort";
import React, { useState } from "react";
import Modal from "@/src/components/modal";
import { Function } from "@/src/models/types/Modules";
import { useSearchParams } from "next/navigation";
import convertStringToBoolean from "@/src/lib/utils/ConvertStringToBool";
import convertStringToInt from "@/src/lib/utils/ConvertStringToInt";
import { FunctionWithModule } from "@/src/models/types/Functions";
import FunctionsTable from "./(components)/FunctionTable";

interface FunctionsPageProps {
  data: FunctionWithModule[];
}

const UserUtilityBarConfig = {
  baseUrl: "/dashboard/functions",
  selectOptions: [
    { value: "name", label: "Nome" },
    { value: "createdAsc", label: "Data criação (cresc)" },
    { value: "createdDesc", label: "Data criação (decr)" },
    { value: "updatedAsc", label: "Última atualização (cresc)" },
    { value: "updatedDesc", label: "Última atualização (decr)" },
  ],
};

const CCFunctionsPage = ({ data }: FunctionsPageProps) => {
  const searchParams = useSearchParams();
  const orderByParams = searchParams.get("orderBy");
  const [search, setSearch] = useState<string>("");

  const filteredFunctions = Filter.Functions(data, search);
  const sortedFunctions = Sort.Functions(filteredFunctions, orderByParams);

  return (
    <Content.Root>
      <Content.Title title="Funções" />
      <UtilityBar config={UserUtilityBarConfig} setSearch={setSearch} />
      <FunctionsTable functions={sortedFunctions} />
    </Content.Root>
  );
};

export default CCFunctionsPage;
