import { Profile } from "../models/types/Profiles";

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
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const ProfilesService = {
  getProfiles,
};

export default ProfilesService;
