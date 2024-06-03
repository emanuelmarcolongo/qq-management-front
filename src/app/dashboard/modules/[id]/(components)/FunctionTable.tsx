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
import { Function } from "@/src/models/types/Modules";

interface FunctionsTableProps {
  moduleId: number;
  functions: Function[];
}

const FunctionsTable = ({ functions, moduleId }: FunctionsTableProps) => {
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
          {functions.map((func, idx) => (
            <Table.Row key={func.id} isEven={idx % 2 === 0}>
              <Table.Cell>{func.name}</Table.Cell>
              <Table.Cell>{func.description || "Sem descrição"}</Table.Cell>
              <Table.Cell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisIcon className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link href={`${baseUrl}?edit=true&id=${func.id}`}>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                    </Link>

                    <Link href={`${baseUrl}?delete=true&id=${func.id}`}>
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

export default FunctionsTable;
