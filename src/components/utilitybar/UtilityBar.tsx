"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface UtilityBarProps {
  setSearch?: Dispatch<SetStateAction<string>>;
  setOrder?: Dispatch<SetStateAction<string>>;
  data: {
    name: string;
    registration?: string;
    created_at: Date;
    updated_at: Date;
  }[];
}

const UtilityBar = ({ setSearch, setOrder, data }: UtilityBarProps) => {
  return (
    <div className="bg-[#FCF9F8] mb-10 rounded-md border-[1px] p-4 border-[#AAAAAA/50] drop-shadow-xl items-center justify-center sm:flex sm:space-x-10 space-y-4 sm:space-y-0">
      <Input
        placeholder="Pesquisar.."
        onChange={(e) => (setSearch ? setSearch(e.target.value) : "")}
      ></Input>
      <Select onValueChange={(value) => (setOrder ? setOrder(value) : "")}>
        <SelectTrigger className="">
          <SelectValue placeholder="Organizar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Nome</SelectItem>

          <SelectItem value="registrationAsc">Matrícula (cresc)</SelectItem>
          <SelectItem value="registrationDesc">Matrícula (decr)</SelectItem>

          <SelectItem value="createdAsc">Data criação (cresc)</SelectItem>
          <SelectItem value="createdDesc">Data criação (decr)</SelectItem>
          <SelectItem value="updatedAsc">Última atualização (cresc)</SelectItem>
          <SelectItem value="updatedDesc">Última atualização (decr)</SelectItem>
        </SelectContent>
      </Select>
      <Button>
        <Plus className="mr-2" />
        Adicionar usuário
      </Button>
    </div>
  );
};

export default UtilityBar;
