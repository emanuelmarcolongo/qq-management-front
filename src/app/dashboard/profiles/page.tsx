import { Metadata } from "next";
import CCProfilePage from "./ProfilePage";
import ProfilesService from "@/src/services/ProfileService";

export const metadata: Metadata = {
  title: "Quero-Quero | Perfis",
};

const UsersPage = async () => {
  const profiles = await ProfilesService.getProfiles();
  if (!profiles) {
    throw new Error("Falha ao acessar os dados dos perfis, tente novamente!");
  }

  return <CCProfilePage data={profiles} />;
};

export default UsersPage;
