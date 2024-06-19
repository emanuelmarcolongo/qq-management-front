import ModulesService from "@/src/services/ModulesService";
import { Metadata } from "next";
import CCModulesPage from "./ModulesPage";

export const metadata: Metadata = {
  title: "Quero-Quero | Módulos",
};

const ModulesPage = async () => {
  const modules = await ModulesService.getUserModules();
  if (!modules) {
    throw new Error("Falha ao acessar os dados dos módulos, tente novamente!");
  }

  return <CCModulesPage data={modules} />;
};

export default ModulesPage;
