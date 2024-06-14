import { FunctionWithModule } from "@/src/models/types/Functions";

const sortFunctions = (
  functions: FunctionWithModule[],
  sortKey: string | null
): FunctionWithModule[] => {
  const sortedFunctions = [...functions];

  switch (sortKey) {
    case "name":
      sortedFunctions.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "createdAsc":
      sortedFunctions.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      break;
    case "createdDesc":
      sortedFunctions.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case "updatedAsc":
      sortedFunctions.sort(
        (a, b) =>
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
      );
      break;
    case "updatedDesc":
      sortedFunctions.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      break;
    default:
      sortedFunctions;
      break;
  }

  return sortedFunctions;
};

export default sortFunctions;
