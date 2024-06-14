"use client";

import Table from "@/src/components/ui/table";
import { EllipsisIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import Link from "next/link";
import { TransactionWithModule } from "@/src/models/types/Transactions";

interface TransactionTableProps {
  transactions: TransactionWithModule[];
}

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Cell>Nome</Table.Cell>
          <Table.Cell>Módulo</Table.Cell>
          <Table.Cell className={`hidden md:table-cell`}>Descrição</Table.Cell>
          <Table.Cell>Ações</Table.Cell>
        </Table.Header>
        <tbody>
          {transactions.map((transaction, idx) => (
            <Table.Row key={transaction.id} isEven={idx % 2 === 0}>
              <Table.Cell>{transaction.name}</Table.Cell>
              <Table.Cell>{transaction.module.name}</Table.Cell>
              <Table.Cell className={`hidden md:table-cell`}>
                {transaction.description || "Sem descrição"}
              </Table.Cell>
              <Table.Cell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisIcon className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link href={`/dashboard/modules/${transaction.module.id}`}>
                      <DropdownMenuItem>Acessar Módulo</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Table.Cell>
            </Table.Row>
          ))}
        </tbody>
      </Table.Root>
    </>
  );
};

export default TransactionsTable;
