"use client";

import Content from "@/src/components/page-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { DetailedProfile } from "@/src/models/types/Profiles";
import Modal from "@/src/components/modal";
import CreatProfileModuleForm from "../(components)/CreateProfileModuleForm";
import { useSearchParams } from "next/navigation";
import convertStringToBoolean from "@/src/lib/utils/ConvertStringToBool";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { X } from "lucide-react";
import DeleteProfileRelation from "../(components)/DeleteProfileRelation";
import convertStringToInt from "@/src/lib/utils/ConvertStringToInt";

type ProfileIdPageProps = {
  profileInfo: DetailedProfile;
};

const CCProfileIdPage = ({ profileInfo }: ProfileIdPageProps) => {
  const { name, description, id, modules } = profileInfo;

  const searchParams = useSearchParams();
  const itemIdParams = convertStringToInt(searchParams.get("id"));
  const itemType = searchParams.get("type");
  const addModalParams = convertStringToBoolean(searchParams.get("add"));
  const editModalParams = convertStringToBoolean(searchParams.get("edit"));
  const deleteModalParams = convertStringToBoolean(searchParams.get("delete"));

  return (
    <Content.Root>
      <header className="flex w-full lg:3/5 xl:w-2/5 items-center  justify-between   mb-10">
        <div>
          <Content.Title title={`Perfil - ${name}`} />
        </div>
      </header>

      <div className="text-textColor mb-14">
        <p className="font-bold ">Descrição:</p>
        <p className="text-sm">{description || "Sem descrição"}</p>
      </div>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold ">Permissões de acesso: </h1>

          <Link
            href={`/dashboard/profiles/${profileInfo.id}?add=true&type=module`}
          >
            <Button>Adicionar módulo</Button>
          </Link>
        </div>

        {modules.length === 0 && (
          <h2 className="font-bold text-md my-2 flex items-center justify-start ml-2">
            Não há módulos acessíveis
          </h2>
        )}
        {modules.length > 0 &&
          modules.map((module) => (
            <Accordion
              className="border border-inputBorder rounded-sm "
              key={module.id + module.name}
              type="single"
              collapsible
            >
              <AccordionItem value={`module-${module.id}`}>
                <AccordionTrigger className=" [&[data-state=open]]:bg-primary rounded-sm [&[data-state=open]]:text-white  p-2 text-base font-semibold">
                  <Link
                    href={`/dashboard/profiles/${profileInfo.id}?delete=true&type=module&id=${module.id}`}
                    className="flex "
                  >
                    <X className="bg-red-500 rounded-xl text-white mr-4 ring-2 ring-white" />
                  </Link>
                  Módulo - {module.name}
                </AccordionTrigger>
                <AccordionContent className="space-y-4 p-2 ">
                  {module.transactions.length === 0 && (
                    <h2 className="font-bold text-md mb-2 flex items-center justify-center mt-2">
                      Não há transações acessíveis
                    </h2>
                  )}

                  {module.transactions.length > 0 &&
                    module.transactions.map((transaction) => (
                      <Accordion
                        className="border border-inputBorder rounded-sm "
                        key={transaction.id + transaction.name}
                        type="single"
                        collapsible
                      >
                        <AccordionItem value={`transaction-${transaction.id}`}>
                          <AccordionTrigger className="bg-slate-300/10 [&[data-state=open]]:bg-secondary [&[data-state=open]]:text-white   p-2 text-sm font-semibold">
                            Transação - {transaction.name}
                          </AccordionTrigger>
                          <AccordionContent className="ml-4 space-y-4">
                            {transaction.functions.length === 0 && (
                              <h2 className="font-bold text-md mb-2 flex items-center justify-center mt-2">
                                Não há funções acessíveis
                              </h2>
                            )}
                            {transaction.functions.length > 0 &&
                              transaction.functions.map((func) => (
                                <h2
                                  key={func.id + func.name}
                                  className="font-bold text-md mb-2 flex items-center justify-start mt-2"
                                >
                                  Função - {func.name}
                                </h2>
                              ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
      </section>

      {itemType === "module" && addModalParams && (
        <Modal.Root>
          <CreatProfileModuleForm profileId={profileInfo.id} />
        </Modal.Root>
      )}

      {itemType === "module" && deleteModalParams && (
        <Modal.Root>
          <DeleteProfileRelation
            type={itemType}
            entity_id={itemIdParams}
            profile_id={profileInfo.id}
          />
        </Modal.Root>
      )}
    </Content.Root>
  );
};

export default CCProfileIdPage;
