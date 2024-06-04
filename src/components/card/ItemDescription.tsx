import React, { ReactNode } from "react";

interface ItemDescriptionProps {
  children: ReactNode;
}

const ItemDescription = ({ children }: ItemDescriptionProps) => {
  return <p className="text-sm">{children}</p>;
};

export default ItemDescription;
