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

interface UtilityBarProps {
  setSearch?: Dispatch<SetStateAction<string>>;
  setOrder?: Dispatch<SetStateAction<string>>;
  config: UtilityBarConfig;
}

const UtilityBar = ({ setSearch, setOrder, config }: UtilityBarProps) => {
  return (
    <section className="bg-[#FCF9F8] mb-10 rounded-md border-[1px] p-4 border-[#AAAAAA/50] drop-shadow-xl items-center justify-center sm:flex sm:space-x-10 space-y-4 sm:space-y-0">
      <Input
        placeholder="Pesquisar.."
        onChange={(e) => (setSearch ? setSearch(e.target.value) : "")}
      ></Input>
      <Select onValueChange={(value) => (setOrder ? setOrder(value) : "")}>
        <SelectTrigger className="">
          <SelectValue placeholder="Organizar por" />
        </SelectTrigger>
        <SelectContent>
          {config.selectOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {config.buttonConfig && (
        <Button onClick={config.buttonConfig.onClick}>
          {config.buttonConfig.icon && (
            <span className="mr-2">{config.buttonConfig.icon}</span>
          )}
          {config.buttonConfig.label}
        </Button>
      )}
    </section>
  );
};

export default UtilityBar;
