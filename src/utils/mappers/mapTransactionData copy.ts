import {
  MappedTransaction,
  TransactionWithModule,
} from "@/src/models/types/Transactions";

export const mapTransactionData = (
  transactions: TransactionWithModule[]
): Partial<MappedTransaction>[] => {
  return transactions.map(
    ({ id, name, module, module_id, description, created_at }) => ({
      id,
      name,
      module: module.name,
      description,
      module_id,
      created_at,
    })
  );
};
