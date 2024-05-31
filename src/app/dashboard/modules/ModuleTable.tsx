"use client";

import React, { Dispatch, SetStateAction } from "react";
import Table from "@/src/components/ui/table";
import { EllipsisIcon } from "lucide-react";
import { ModulesData } from "@/src/models/types/Modules";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

interface ModuleTableProps {
  modules: ModulesData[];
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setModuleIndex: Dispatch<SetStateAction<number>>;
}

const ModuleTable = ({
  modules,
  setShowModal,
  setModuleIndex,
}: ModuleTableProps) => {
  const handleEditModule = (idx: number) => {
    setModuleIndex(idx);
    setShowModal(true);
  };
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
                    <DropdownMenuItem onClick={() => handleEditModule(idx)}>
                      Editar
                    </DropdownMenuItem>
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
      className={`rounded-2xl max-w-[150px] text-xs break-words flex items-center justify-center h-[40px] font-bold `}
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
