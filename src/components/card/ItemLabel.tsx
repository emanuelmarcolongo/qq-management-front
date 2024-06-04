import React, { ReactNode } from "react";

interface ItemLabelProps {
  children: ReactNode;
}

const ItemLabel = ({ children }: ItemLabelProps) => {
  return <p className="text-medium font-semibold">{children}</p>;
};

export default ItemLabel;
