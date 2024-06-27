import { Profile } from "@/src/models/types/Profiles";

const sortProfiles = (
  profiles: Profile[],
  sortKey: string | null
): Profile[] => {
  const sortedProfiles = [...profiles];

  switch (sortKey) {
    case "name":
      sortedProfiles.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "createdAsc":
      sortedProfiles.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      break;
    case "createdDesc":
      sortedProfiles.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case "updatedAsc":
      sortedProfiles.sort(
        (a, b) =>
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
      );
      break;
    case "updatedDesc":
      sortedProfiles.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      break;
    default:
      sortedProfiles;
      break;
  }

  return sortedProfiles;
};

export default sortProfiles;
