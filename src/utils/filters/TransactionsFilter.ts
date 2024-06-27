import { TransactionWithModule } from "@/src/models/types/Transactions";

const transactionFilter = (
  transactions: TransactionWithModule[],
  search: string
): TransactionWithModule[] => {
  const lowercasedSearch = search.toLowerCase();

  return transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(lowercasedSearch) ||
      transaction.description?.toLowerCase().includes(lowercasedSearch) ||
      transaction.module.name.toLocaleLowerCase().includes(lowercasedSearch)
  );
};

export default transactionFilter;
