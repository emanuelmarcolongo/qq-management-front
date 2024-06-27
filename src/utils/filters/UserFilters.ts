import { UserWithProfile } from "@/src/models/types/User";

const filterUsers = (
  users: UserWithProfile[],
  search: string
): UserWithProfile[] => {
  const lowercasedSearch = search.toLowerCase();

  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(lowercasedSearch) ||
      user.registration.includes(lowercasedSearch) ||
      user.email.toLowerCase().includes(lowercasedSearch) ||
      user.profile.name.toLocaleLowerCase().includes(lowercasedSearch)
  );
};

export default filterUsers;
