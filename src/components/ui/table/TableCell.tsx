import React, { ReactNode } from "react";

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ children, className }) => {
  return (
    <td className={`${className} py-4 px-10 break-words max-w-[180px] `}>
      {children}
    </td>
  );
};

export default TableCell;
