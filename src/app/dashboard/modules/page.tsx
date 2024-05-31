import ModulesService from "@/src/services/ModulesService";
import CCModulesPage from "./ModulesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quero-Quero | Módulos",
};

const ModulesPage = async () => {
  const modules = await ModulesService.getModules();
  if (!modules) {
    throw new Error("Falha ao acessar os dados dos módulos, tente novamente!");
  }

  return <CCModulesPage data={modules} />;
};

export default ModulesPage;
