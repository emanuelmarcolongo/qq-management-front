import { MappedUser, UserWithProfile } from "@/src/models/types/User";

export const mapUserData = (users: UserWithProfile[]): MappedUser[] => {
  return users.map(
    ({ id, name, username, email, registration, profile, created_at }) => ({
      id,
      name,
      username,
      email,
      registration,
      profile: profile.name,
      created_at,
    })
  );
};
