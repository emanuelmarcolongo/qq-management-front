import React, { ReactNode } from "react";

interface TableHeaderProps {
  children: ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return (
    <thead className="bg-gray-200">
      <tr className="text-textColor font-semibold">{children}</tr>
    </thead>
  );
};

export default TableHeader;
