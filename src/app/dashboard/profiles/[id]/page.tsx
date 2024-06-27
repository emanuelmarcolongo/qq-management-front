import { Metadata } from "next";
import convertStringToInt from "@/src/utils/converters/ConvertStringToInt";
import ProfilesService from "@/src/services/ProfileService";
import CCProfileIdPage from "./ProfileIdPage";

export const metadata: Metadata = {
  title: "Quero-Quero | Perfil",
};

type ProfileIdPageProps = {
  params: {
    id: string;
  };
};

const ProfileIdPage = async ({ params }: ProfileIdPageProps) => {
  const detailedProfile = await ProfilesService.getProfileById(
    convertStringToInt(params.id)
  );

  return <CCProfileIdPage profileInfo={detailedProfile} />;
};

export default ProfileIdPage;
