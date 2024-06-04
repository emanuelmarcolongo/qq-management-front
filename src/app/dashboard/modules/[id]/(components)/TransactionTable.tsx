"use client";

import Table from "@/src/components/ui/table";
import { EllipsisIcon } from "lucide-react";
import { Transaction } from "@/src/models/types/Modules";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import Link from "next/link";

interface TransactionTableProps {
  moduleId: number;
  transactions: Transaction[];
}

const TransactionTable = ({
  transactions,
  moduleId,
}: TransactionTableProps) => {
  const baseUrl = `/dashboard/modules/${moduleId}`;
  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Cell>Nome</Table.Cell>
          <Table.Cell>Descrição</Table.Cell>
          <Table.Cell>Ações</Table.Cell>
        </Table.Header>
        <tbody>
          {transactions.map((transaction, idx) => (
            <Table.Row key={transaction.id} isEven={idx % 2 === 0}>
              <Table.Cell>{transaction.name}</Table.Cell>
              <Table.Cell>
                {transaction.description || "Sem descrição"}
              </Table.Cell>
              <Table.Cell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisIcon className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link
                      href={`${baseUrl}?type=transaction&edit=true&id=${transaction.id}`}
                    >
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                    </Link>

                    <Link
                      href={`${baseUrl}?type=transaction&delete=true&id=${transaction.id}`}
                    >
                      <DropdownMenuItem>Deletar</DropdownMenuItem>
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

export default TransactionTable;
