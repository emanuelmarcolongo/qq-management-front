import convertStringToInt from "@/src/utils/converters/ConvertStringToInt";
import ModulesService from "@/src/services/ModulesService";
import { Metadata } from "next";
import ModuleIdPage from "./ModuleIdPage";

export const metadata: Metadata = {
  title: "Quero-Quero | Módulo",
};

type ModulePageProps = {
  params: {
    id: string;
  };
};

const ModulePage = async ({ params }: ModulePageProps) => {
  const detailedModule = await ModulesService.getUserModuleById(
    convertStringToInt(params.id)
  );

  return <ModuleIdPage moduleInfo={detailedModule} />;
};

export default ModulePage;
