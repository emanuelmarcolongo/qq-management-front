import { FunctionWithModule } from "@/src/models/types/Functions";

const functionFilter = (
  functions: FunctionWithModule[],
  search: string
): FunctionWithModule[] => {
  const lowercasedSearch = search.toLowerCase();

  return functions.filter(
    (func) =>
      func.name.toLowerCase().includes(lowercasedSearch) ||
      func.description?.toLowerCase().includes(lowercasedSearch) ||
      func.module.name.toLocaleLowerCase().includes(lowercasedSearch)
  );
};

export default functionFilter;
