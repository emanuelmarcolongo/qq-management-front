import React, { ReactNode } from "react";

interface TableCellProps {
  children: ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ children }) => {
  return <td className="py-4 px-10">{children}</td>;
};

export default TableCell;
