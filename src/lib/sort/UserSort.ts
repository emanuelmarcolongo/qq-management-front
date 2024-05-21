import { UserWithProfile } from "@/src/models/types/User";

const sortUsers = (
  users: UserWithProfile[],
  sortKey: string
): UserWithProfile[] => {
  const sortedUsers = [...users];

  switch (sortKey) {
    case "name":
      sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "registrationAsc":
      sortedUsers.sort((a, b) => a.registration.localeCompare(b.registration));
      break;
    case "registrationDesc":
      sortedUsers.sort((a, b) => b.registration.localeCompare(a.registration));
      break;
    case "createdAsc":
      sortedUsers.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      break;
    case "createdDesc":
      sortedUsers.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case "updatedAsc":
      sortedUsers.sort(
        (a, b) =>
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
      );
      break;
    case "updatedDesc":
      sortedUsers.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      break;
    default:
      break;
  }

  return sortedUsers;
};

export default sortUsers;
