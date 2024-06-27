import functionFilter from "./FunctionsFilter";
import modulesFilter from "./ModulesFilters";
import profilesFilter from "./ProfilesFilter";
import transactionFilter from "./TransactionsFilter";
import filterUsers from "./UserFilters";

const Filter = {
  Users: filterUsers,
  Modules: modulesFilter,
  Profiles: profilesFilter,
  Functions: functionFilter,
  Transactions: transactionFilter,
};

export default Filter;
