import { User } from "@/src/models/User";

const filterUsers = (users: User[], search: string): User[] => {
  const lowercasedSearch = search.toLowerCase();

  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(lowercasedSearch) ||
      user.registration.includes(lowercasedSearch) ||
      user.email.toLowerCase().includes(lowercasedSearch) ||
      user.profile.toLocaleLowerCase().includes(lowercasedSearch)
  );
};

export default filterUsers;
