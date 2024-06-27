import { Metadata } from "next";
import ModuleIdPage from "./ModuleIdPage";
import ModulesService from "@/src/services/ModulesService";
import convertStringToInt from "@/src/utils/converters/ConvertStringToInt";

export const metadata: Metadata = {
  title: "Quero-Quero | Módulo",
};

type ModulePageProps = {
  params: {
    id: string;
  };
};

const ModulePage = async ({ params }: ModulePageProps) => {
  const detailedModule = await ModulesService.getModuleById(
    convertStringToInt(params.id)
  );

  return <ModuleIdPage moduleInfo={detailedModule} />;
};

export default ModulePage;
