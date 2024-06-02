import React from "react";
import Table from "@/src/components/ui/table";
import { EllipsisIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import Link from "next/link";
import { Profile } from "@/src/models/types/Profiles";

interface ProbileTableProps {
  profiles: Profile[];
}

const ProfileTable = ({ profiles }: ProbileTableProps) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Cell>Perfil</Table.Cell>
        <Table.Cell>Descrição</Table.Cell>
        <Table.Cell>Ações</Table.Cell>
      </Table.Header>
      <tbody>
        {profiles.map((profile, idx) => (
          <Table.Row key={profile.id} isEven={idx % 2 === 0}>
            <Table.Cell>{profile.name}</Table.Cell>
            <Table.Cell>{profile.description || "Sem descrição"}</Table.Cell>

            <Table.Cell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisIcon className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href={`/dashboard/profiles?edit=true&id=${profile.id}`}>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                  </Link>

                  <Link
                    href={`/dashboard/profiles?delete=true&id=${profile.id}`}
                  >
                    <DropdownMenuItem>Deletar</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </Table.Cell>
          </Table.Row>
        ))}
      </tbody>
    </Table.Root>
  );
};

export default ProfileTable;
