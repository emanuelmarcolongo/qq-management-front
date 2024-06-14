"use client";

import Content from "@/src/components/page-content";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/lib/filters";
import Sort from "@/src/lib/sort";
import { TransactionWithModule } from "@/src/models/types/Transactions";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import TransactionsTable from "./(components)/TransactionTable";

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
      <TransactionsTable transactions={sortedTransactions} />
    </Content.Root>
  );
};

export default CCTransactionsPage;
