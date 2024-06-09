"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UtilityBarProps {
  setSearch?: Dispatch<SetStateAction<string>>;
  config: UtilityBarConfig;
}

const UtilityBar = ({ setSearch, config }: UtilityBarProps) => {
  const router = useRouter();
  return (
    <section className="bg-[#FCF9F8] my-10 rounded-md border-[1px] p-4 border-[#AAAAAA/50] drop-shadow-xl items-center justify-center sm:flex sm:space-x-10 space-y-4 sm:space-y-0">
      <div className="relative w-full">
        <Input
          className=""
          placeholder="Pesquisar.."
          onChange={(e) => (setSearch ? setSearch(e.target.value) : "")}
        ></Input>
        <Search className="absolute top-2 right-4" color="#DF6721" size={20} />
      </div>

      <Select
        onValueChange={(value) =>
          router.push(`${config.baseUrl}?orderBy=${value}`)
        }
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Organizar por" />
        </SelectTrigger>
        <SelectContent>
          {config.selectOptions.map((option) => (
            <SelectItem key={option.label} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {config.buttonConfig && (
        <Link href={`${config.baseUrl}?add=true`}>
          <Button className="mt-4 sm:mt-0">
            <Plus className="mr-2" />
            {config.buttonConfig.label}
          </Button>
        </Link>
      )}
    </section>
  );
};

export default UtilityBar;
