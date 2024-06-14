import transactionService from "@/src/services/TransactionService";
import { Metadata } from "next";
import CCTransactionsPage from "./TransactionsPage";

export const metadata: Metadata = {
  title: "Quero-Quero | Transações",
};

const FunctionsPage = async () => {
  const transactions = await transactionService.getTransactions();
  if (!transactions) {
    throw new Error(
      "Falha ao acessar os dados das transações, tente novamente!"
    );
  }

  return <CCTransactionsPage data={transactions} />;
};

export default FunctionsPage;
