import Content from "@/src/components/content";
import UserTable from "@/src/components/user/UserTable";
import mockUsers from "@/src/data/datamock";
import React from "react";

const UsersPage = () => {
  return (
    <Content.Root>
      <Content.Title title="Usuários" />
      <UserTable users={mockUsers} />
    </Content.Root>
  );
};

export default UsersPage;
