"use client";

import Content from "@/src/components/page-content";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/lib/filters";
import Sort from "@/src/lib/sort";
import { FunctionWithModule } from "@/src/models/types/Functions";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import FunctionsTable from "./(components)/FunctionTable";
import { Button } from "@/src/components/ui/button";
import { generateExcel } from "@/src/lib/file-saver";
import { mapFunctionData } from "@/src/utils/mappers/mapFunctionData";
import { Download } from "lucide-react";

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
      <Button
        className="mb-10 bg-secondary hover:bg-secondary/80"
        onClick={() =>
          generateExcel(
            mapFunctionData(data),
            "Relatório de funções",
            "functionsReport.xlsx"
          )
        }
      >
        <Download className="mr-4" />
        Baixar Relatório
      </Button>
      <FunctionsTable functions={sortedFunctions} />
    </Content.Root>
  );
};

export default CCFunctionsPage;
