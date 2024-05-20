"use client";

import Content from "@/src/components/content";
import UserTable from "@/src/components/user/UserTable";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/lib/filters";
import Sort from "@/src/lib/sort";
import { User } from "@/src/models/User";
import React, { useState } from "react";

interface UserPageProps {
  data: User[];
}

const CCUsersPage = ({ data }: UserPageProps) => {
  const [order, setOrder] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const filteredUsers = Filter.Users(data, search);
  const sortedUsers = Sort.Users(filteredUsers, order);
  return (
    <Content.Root>
      <Content.Title title="Usuários" />
      <UtilityBar setSearch={setSearch} setOrder={setOrder} />
      <UserTable users={sortedUsers} />
    </Content.Root>
  );
};

export default CCUsersPage;
