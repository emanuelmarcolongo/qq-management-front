import React, { ReactNode } from "react";

interface TableRootProps {
  children: ReactNode;
}

const TableRoot: React.FC<TableRootProps> = ({ children }) => {
  return (
    <table className="w-full text-sm drop-shadow-sm mb-4 rounded-md">
      {children}
    </table>
  );
};

export default TableRoot;
