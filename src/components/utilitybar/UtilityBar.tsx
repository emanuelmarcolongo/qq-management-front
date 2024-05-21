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

interface UtilityBarProps {
  setSearch?: Dispatch<SetStateAction<string>>;
  setOrder?: Dispatch<SetStateAction<string>>;
  config: UtilityBarConfig;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const UtilityBar = ({
  setSearch,
  setOrder,
  config,
  setShowModal,
}: UtilityBarProps) => {
  return (
    <section className="bg-[#FCF9F8] mb-10 rounded-md border-[1px] p-4 border-[#AAAAAA/50] drop-shadow-xl items-center justify-center sm:flex sm:space-x-10 space-y-4 sm:space-y-0">
      <div className="relative w-full">
        <Input
          className=""
          placeholder="Pesquisar.."
          onChange={(e) => (setSearch ? setSearch(e.target.value) : "")}
        ></Input>
        <Search className="absolute top-2 right-4" color="#DF6721" size={20} />
      </div>

      <Select onValueChange={(value) => (setOrder ? setOrder(value) : "")}>
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
        <Button onClick={() => setShowModal(true)}>
          <Plus className="mr-2" />
          {config.buttonConfig.label}
        </Button>
      )}
    </section>
  );
};

export default UtilityBar;
