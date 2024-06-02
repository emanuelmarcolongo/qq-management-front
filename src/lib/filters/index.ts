import modulesFilter from "./ModulesFilters";
import profilesFilter from "./ProfilesFilter";
import filterUsers from "./UserFilters";

const Filter = {
  Users: filterUsers,
  Modules: modulesFilter,
  Profiles: profilesFilter,
};

export default Filter;
