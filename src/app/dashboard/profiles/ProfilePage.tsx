"use client";

import Modal from "@/src/components/modal";
import Content from "@/src/components/page-content";
import UtilityBar from "@/src/components/utilitybar/UtilityBar";
import Filter from "@/src/utils/filters";
import Sort from "@/src/utils/sort";
import convertStringToBoolean from "@/src/utils/converters/ConvertStringToBool";
import convertStringToInt from "@/src/utils/converters/ConvertStringToInt";
import { Profile } from "@/src/models/types/Profiles";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CreatProfileForm from "./(components)/CreateProfileForm";
import DeleteProfile from "./(components)/DeleteProfile";
import ProfileTable from "./(components)/ProfileTable";
import UpdateProfileForm from "./(components)/UpdateProfileForm";
import { Button } from "@/src/components/ui/button";
import { generateExcel } from "@/src/lib/file-saver";
import { Download } from "lucide-react";

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
      <Button
        className="mb-10 bg-secondary hover:bg-secondary/80"
        onClick={() =>
          generateExcel(data, "Relatório de perfis", "profileReport.xlsx")
        }
      >
        <Download className="mr-4" />
        Baixar Relatório
      </Button>
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
