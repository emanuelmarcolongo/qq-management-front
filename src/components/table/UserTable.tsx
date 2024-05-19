import React from "react";
import Table from "./index";
import { EllipsisVertical } from "lucide-react";

interface User {
  name: string;
  profile: string;
  email: string;
}

interface UserTableProps {
  users: User[];
  columns: string[];
}

const UserTable = ({ users, columns }: UserTableProps) => {
  return (
    <Table.Root>
      <Table.Header>
        {columns.map((column) => (
          <Table.HCell key={column}>{column}</Table.HCell>
        ))}
      </Table.Header>
      <tbody>
        {users.map((user, idx) => (
          <Table.Row key={user.email} isEven={idx % 2 === 0}>
            <Table.Cell>988213</Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.profile}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>
              <EllipsisVertical className="cursor-pointer" />
            </Table.Cell>
          </Table.Row>
        ))}
      </tbody>
    </Table.Root>
  );
};

export default UserTable;
