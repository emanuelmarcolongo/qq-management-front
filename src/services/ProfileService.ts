import { Profile } from "../models/types/Profiles";
import { CreateUserData } from "../models/types/User";

const getProfiles = async (): Promise<Profile[] | void> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store" as RequestCache,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles`,
    options
  );
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  const data: Profile[] = await response.json();
  return data;
};

const ProfilesService = {
  getProfiles,
};

export default ProfilesService;
