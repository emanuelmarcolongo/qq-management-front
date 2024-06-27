import { UserWithProfile } from "@/src/models/types/User";
import { ModulesData } from "@/src/models/types/Modules";

const sortModules = (
  modules: ModulesData[],
  sortKey: string | null
): ModulesData[] => {
  const sortedModules = [...modules];

  switch (sortKey) {
    case "name":
      sortedModules.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "createdAsc":
      sortedModules.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      break;
    case "createdDesc":
      sortedModules.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case "updatedAsc":
      sortedModules.sort(
        (a, b) =>
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
      );
      break;
    case "updatedDesc":
      sortedModules.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      break;
    default:
      sortedModules;
      break;
  }

  return sortedModules;
};

export default sortModules;
