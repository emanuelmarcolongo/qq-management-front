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
import { FunctionWithModule } from "@/src/models/types/Functions";

interface FunctionsTableProps {
  functions: FunctionWithModule[];
}

const FunctionsTable = ({ functions }: FunctionsTableProps) => {
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
          {functions.map((func, idx) => (
            <Table.Row key={func.id} isEven={idx % 2 === 0}>
              <Table.Cell>{func.name}</Table.Cell>
              <Table.Cell>{func.module.name}</Table.Cell>
              <Table.Cell className={`hidden md:table-cell`}>
                {func.description || "Sem descrição"}
              </Table.Cell>
              <Table.Cell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisIcon className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link href={`/dashboard/modules/${func.module.id}`}>
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

export default FunctionsTable;
