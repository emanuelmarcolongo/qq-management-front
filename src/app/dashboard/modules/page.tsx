import ModulesService from "@/src/services/ModulesService";
import CCModulesPage from "./ModulesPage";

const ModulesPage = async () => {
  const modules = await ModulesService.getModules();
  if (!modules) {
    throw new Error("Falha ao acessar os dados dos módulos, tente novamente!");
  }

  return <CCModulesPage data={modules} />;
};

export default ModulesPage;
