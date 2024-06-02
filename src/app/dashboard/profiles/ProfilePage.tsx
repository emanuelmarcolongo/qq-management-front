"use client";

import Content from "@/src/components/page-content";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/lib/filters";
import Sort from "@/src/lib/sort";
import React, { useState } from "react";
import Modal from "@/src/components/modal";
import convertStringToInt from "@/src/lib/utils/ConvertStringToInt";
import convertStringToBoolean from "@/src/lib/utils/ConvertStringToBool";
import { useSearchParams } from "next/navigation";
import ProfileTable from "./(components)/ProfileTable";
import { Profile } from "@/src/models/types/Profiles";
import CreatProfileForm from "./(components)/CreateProfileForm";
import UpdateProfileForm from "./(components)/UpdateProfileForm";
import DeleteProfile from "./(components)/DeleteProfile";

interface UserPageProps {
  data: Profile[];
}

const UserUtilityBarConfig = {
  baseUrl: "/dashboard/profiles",
  selectOptions: [
    { value: "name", label: "Nome" },
    { value: "createdAsc", label: "Data criação (cresc)" },
    { value: "createdDesc", label: "Data criação (decr)" },
    { value: "updatedAsc", label: "Última atualização (cresc)" },
    { value: "updatedDesc", label: "Última atualização (decr)" },
  ],
  buttonConfig: {
    label: "Adicionar perfil",
  },
};

const CCProfilePage = ({ data }: UserPageProps) => {
  const searchParams = useSearchParams();
  const profileIdParams = searchParams.get("id");
  const orderByParams = searchParams.get("orderBy");
  const addModalParams = convertStringToBoolean(searchParams.get("add"));
  const editModalParams = convertStringToBoolean(searchParams.get("edit"));
  const deleteModalParams = convertStringToBoolean(searchParams.get("delete"));
  const [search, setSearch] = useState<string>("");

  const profileInfo = data.find(
    (profile) => profile.id === convertStringToInt(profileIdParams)
  );

  const filteredProfiles = Filter.Profiles(data, search);
  const sortedProfiles = Sort.Profiles(filteredProfiles, orderByParams);
  return (
    <Content.Root>
      <Content.Title title="Perfis" />
      <UtilityBar config={UserUtilityBarConfig} setSearch={setSearch} />
      <ProfileTable profiles={sortedProfiles} />

      {addModalParams && (
        <Modal.Root>
          <CreatProfileForm />
        </Modal.Root>
      )}

      {editModalParams && profileInfo && (
        <Modal.Root>
          <UpdateProfileForm profileInfo={profileInfo} />
        </Modal.Root>
      )}
      {deleteModalParams && profileInfo && (
        <Modal.Root>
          <DeleteProfile profileInfo={profileInfo} />
        </Modal.Root>
      )}
    </Content.Root>
  );
};

export default CCProfilePage;
