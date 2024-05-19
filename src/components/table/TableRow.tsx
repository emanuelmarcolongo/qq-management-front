import React, { ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
  isEven: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ children, isEven }) => {
  return (
    <tr
      className={`text-textColor border-[1px] border-[#D9D9D9] font-medium ${
        isEven ? "bg-[#D9D9D9/15]" : "bg-white"
      }`}
    >
      {children}
    </tr>
  );
};

export default TableRow;
