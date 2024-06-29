import React, { ReactNode } from "react";

interface TableCellProps extends React.ComponentPropsWithoutRef<"td"> {
  children: ReactNode;
}
const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <td
      className={`${className} py-4 px-2 break-words max-w-[180px] `}
      {...rest}
    >
      {children}
    </td>
  );
};

export default TableCell;
