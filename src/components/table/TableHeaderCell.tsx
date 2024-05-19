import React from "react";

interface TableHeaderCellProps {
  children: React.ReactNode;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ children }) => {
  return <th className="py-4 px-10 text-left">{children}</th>;
};

export default TableHeaderCell;
