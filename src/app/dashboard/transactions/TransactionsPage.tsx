"use client";

import Content from "@/src/components/page-content";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/utils/filters";
import Sort from "@/src/utils/sort";
import { TransactionWithModule } from "@/src/models/types/Transactions";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import TransactionsTable from "./(components)/TransactionTable";
import { Button } from "@/src/components/ui/button";
import { generateExcel } from "@/src/lib/file-saver";
import { Download } from "lucide-react";
import { mapTransactionData } from "@/src/utils/mappers/mapTransactionData copy";

interface TransactionPageProps {
  data: TransactionWithModule[];
}

const UserUtilityBarConfig = {
  baseUrl: "/dashboard/transactions",
  selectOptions: [
    { value: "name", label: "Nome" },
    { value: "createdAsc", label: "Data criação (cresc)" },
    { value: "createdDesc", label: "Data criação (decr)" },
    { value: "updatedAsc", label: "Última atualização (cresc)" },
    { value: "updatedDesc", label: "Última atualização (decr)" },
  ],
};

const CCTransactionsPage = ({ data }: TransactionPageProps) => {
  const searchParams = useSearchParams();
  const orderByParams = searchParams.get("orderBy");
  const [search, setSearch] = useState<string>("");

  const filteredTransactions = Filter.Transactions(data, search);
  const sortedTransactions = Sort.Transactions(
    filteredTransactions,
    orderByParams
  );

  return (
    <Content.Root>
      <Content.Title title="Transações" />
      <UtilityBar config={UserUtilityBarConfig} setSearch={setSearch} />
      <Button
        className="mb-10 bg-secondary hover:bg-secondary/80"
        onClick={() =>
          generateExcel(
            mapTransactionData(data),
            "Relatório de transações",
            "transactionsReport.xlsx"
          )
        }
      >
        <Download className="mr-4" />
        Baixar Relatório
      </Button>
      <TransactionsTable transactions={sortedTransactions} />
    </Content.Root>
  );
};

export default CCTransactionsPage;
