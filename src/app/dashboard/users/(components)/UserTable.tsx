import React from "react";
import Table from "@/src/components/ui/table";
import { EllipsisIcon } from "lucide-react";
import { User, UserWithProfile } from "@/src/models/types/User";

interface UserTableProps {
  users: UserWithProfile[];
}

const UserTable = ({ users }: UserTableProps) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Cell>Matrícula</Table.Cell>
        <Table.Cell>Nome</Table.Cell>
        <Table.Cell className="hidden md:table-cell">Perfil</Table.Cell>
        <Table.Cell className="hidden lg:table-cell">E-mail</Table.Cell>
        <Table.Cell>Ações</Table.Cell>
      </Table.Header>
      <tbody>
        {users.map((user, idx) => (
          <Table.Row key={user.email} isEven={idx % 2 === 0}>
            <Table.Cell>{user.registration}</Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {user.profile.name}
            </Table.Cell>
            <Table.Cell className="hidden lg:table-cell">
              {user.email}
            </Table.Cell>
            <Table.Cell>
              <EllipsisIcon className="cursor-pointer" />
            </Table.Cell>
          </Table.Row>
        ))}
      </tbody>
    </Table.Root>
  );
};

export default UserTable;
