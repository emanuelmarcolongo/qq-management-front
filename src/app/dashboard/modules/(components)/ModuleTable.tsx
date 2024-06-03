"use client";

import Table from "@/src/components/ui/table";
import { EllipsisIcon } from "lucide-react";
import { ModulesData } from "@/src/models/types/Modules";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import Link from "next/link";

interface ModuleTableProps {
  modules: ModulesData[];
}

const ModuleTable = ({ modules }: ModuleTableProps) => {
  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Cell>Nome</Table.Cell>
          <Table.Cell>Descrição</Table.Cell>
          <Table.Cell className="hidden md:table-cell ">Tag</Table.Cell>
          <Table.Cell>Ações</Table.Cell>
        </Table.Header>
        <tbody>
          {modules.map((module, idx) => (
            <Table.Row key={module.id} isEven={idx % 2 === 0}>
              <Table.Cell>{module.name}</Table.Cell>
              <Table.Cell>{module.description}</Table.Cell>
              <Table.Cell className={`hidden md:table-cell`}>
                <ModuleTag
                  text={module.name}
                  background_color={module.background_color}
                  text_color={module.text_color}
                />
              </Table.Cell>
              <Table.Cell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisIcon className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link href={`/dashboard/modules/${module.id}`}>
                      <DropdownMenuItem>Acessar</DropdownMenuItem>
                    </Link>
                    <Link href={`/dashboard/modules?edit=true&id=${module.id}`}>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                    </Link>

                    <Link
                      href={`/dashboard/modules?delete=true&id=${module.id}`}
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

interface ModuleTagProps {
  text: string;
  text_color: string;
  background_color: string;
}

const ModuleTag = ({ text, background_color, text_color }: ModuleTagProps) => {
  return (
    <p
      className={`rounded-2xl max-w-[150px] text-xs break-words flex items-center justify-center h-[40px] font-bold text-center `}
      style={{
        backgroundColor: background_color,
        color: text_color,
        border: `2px ${text_color} solid`,
      }}
    >
      {text}
    </p>
  );
};

export default ModuleTable;
