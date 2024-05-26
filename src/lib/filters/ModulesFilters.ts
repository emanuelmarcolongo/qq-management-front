import { ModulesData } from "@/src/models/types/Modules";

const modulesFilter = (
  modules: ModulesData[],
  search: string
): ModulesData[] => {
  const lowercasedSearch = search.toLowerCase();

  return modules.filter(
    (module) =>
      module.name.toLowerCase().includes(lowercasedSearch) ||
      module.description?.toLowerCase().includes(lowercasedSearch)
  );
};

export default modulesFilter;
