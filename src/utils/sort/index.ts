import sortFunctions from "./FunctionSort";
import sortModules from "./ModuleSort";
import sortProfiles from "./ProfileSort";
import sortTransactions from "./TransactionSort";
import sortUsers from "./UserSort";

const Sort = {
  Users: sortUsers,
  Modules: sortModules,
  Profiles: sortProfiles,
  Functions: sortFunctions,
  Transactions: sortTransactions,
};

export default Sort;
