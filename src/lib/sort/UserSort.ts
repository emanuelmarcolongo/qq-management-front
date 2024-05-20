import { User } from "@/src/models/User";

const sortUsers = (users: User[], sortKey: string): User[] => {
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
        (a, b) => a.created_at.getTime() - b.created_at.getTime()
      );
      break;
    case "createdDesc":
      sortedUsers.sort(
        (a, b) => b.created_at.getTime() - a.created_at.getTime()
      );
      break;
    case "updatedAsc":
      sortedUsers.sort(
        (a, b) => a.updated_at.getTime() - b.updated_at.getTime()
      );
      break;
    case "updatedDesc":
      sortedUsers.sort(
        (a, b) => b.updated_at.getTime() - a.updated_at.getTime()
      );
      break;
    default:
      break;
  }

  return sortedUsers;
};

export default sortUsers;
