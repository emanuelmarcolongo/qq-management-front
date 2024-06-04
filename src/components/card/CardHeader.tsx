import React, { ElementType } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface CardHeaderProps {
  title: string;
  link: string;
  Icon?: ElementType;
}

const CardHeader = ({ title, link, Icon }: CardHeaderProps) => {
  return (
    <header className="flex justify-between items-center w-full">
      <h1 className="flex items-center justify-start space-x-2 font-bold text-textColor text-xl">
        {Icon && <Icon className="mr-2" />} {title}
      </h1>
      <Link href={link}>
        <X className="mr-2" />
      </Link>
    </header>
  );
};

export default CardHeader;
