import { FunctionWithModule } from "@/src/models/types/Functions";
import { TransactionWithModule } from "@/src/models/types/Transactions";

const sortTransactions = (
  transactions: TransactionWithModule[],
  sortKey: string | null
): TransactionWithModule[] => {
  const sortedTransactions = [...transactions];

  switch (sortKey) {
    case "name":
      sortedTransactions.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "createdAsc":
      sortedTransactions.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      break;
    case "createdDesc":
      sortedTransactions.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case "updatedAsc":
      sortedTransactions.sort(
        (a, b) =>
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
      );
      break;
    case "updatedDesc":
      sortedTransactions.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      break;
    default:
      sortedTransactions;
      break;
  }

  return sortedTransactions;
};

export default sortTransactions;
