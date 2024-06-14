import { Metadata } from "next";
import functionService from "@/src/services/FunctionService";
import CCFunctionsPage from "./FunctionsPage";

export const metadata: Metadata = {
  title: "Quero-Quero | Funções",
};

const FunctionsPage = async () => {
  const functions = await functionService.getFunctions();
  if (!functions) {
    throw new Error("Falha ao acessar os dados das funções, tente novamente!");
  }

  return <CCFunctionsPage data={functions} />;
};

export default FunctionsPage;
