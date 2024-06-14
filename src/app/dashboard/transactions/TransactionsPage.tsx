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
import FunctionsTable from "./(components)/TransactionTable";
import { TransactionWithModule } from "@/src/models/types/Transactions";
import TransactionsTable from "./(components)/TransactionTable";
import DeleteTransaction from "../modules/[id]/(components)/DeleteTransaction";
import UpdateTransactionForm from "../modules/[id]/(components)/UpdateTransactionForm";

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
