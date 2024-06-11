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
import CreateProfileTransactionForm from "../(components)/CreateProfileTransactionForm";
import CreateProfileFunctionForm from "../(components)/CreateProfileFunctionForm";

type ProfileIdPageProps = {
  profileInfo: DetailedProfile;
};

const CCProfileIdPage = ({ profileInfo }: ProfileIdPageProps) => {
  const { name, description, id, modules } = profileInfo;

  const searchParams = useSearchParams();
  const itemIdParams = convertStringToInt(searchParams.get("id"));
  const moduleIdParams = convertStringToInt(searchParams.get("module_id"));
  const transactionIdParams = convertStringToInt(
    searchParams.get("transaction_id")
  );
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
            <p>Adicionar módulo</p>
          </Link>
        </div>

        {modules.length === 0 && (
          <h2 className="font-bold text-md my-2 flex items-center justify-start ml-2">
            Não há módulos acessíveis
          </h2>
        )}
        {modules.length > 0 &&
          modules.map((module) => (
            <div key={module.name}>
              <div className="flex space-x-2">
                <p className="font-bold text-md">{module.name}</p>
                <Link
                  href={`/dashboard/profiles/${profileInfo.id}?delete=true&type=module&id=${module.id}`}
                  className="flex "
                >
                  <X className="bg-red-500 rounded-xl text-white mr-4 ring-2 ring-white" />
                </Link>
              </div>
              <Accordion
                className="border border-inputBorder rounded-sm "
                key={module.id + module.name}
                type="single"
                collapsible
              >
                <AccordionItem value={`module-${module.id}`}>
                  <AccordionTrigger className=" [&[data-state=open]]:bg-primary rounded-sm [&[data-state=open]]:text-white  p-2 text-base font-semibold">
                    Transações
                    <Link
                      href={`/dashboard/profiles/${profileInfo.id}?add=true&type=transaction&module_id=${module.id}`}
                    >
                      <p>Adicionar transação</p>
                    </Link>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 p-2 ">
                    {module.transactions.length === 0 && (
                      <div className="flex flex-col items-center justify-center">
                        <h2 className="font-bold text-md mb-2 flex items-center justify-center mt-2">
                          Não há transações acessíveis
                        </h2>
                      </div>
                    )}

                    {module.transactions.length > 0 &&
                      module.transactions.map((transaction) => (
                        <Accordion
                          className="border border-inputBorder rounded-sm "
                          key={transaction.name + module.id}
                          type="single"
                          collapsible
                        >
                          <AccordionItem
                            value={`transaction-${transaction.id}`}
                          >
                            <AccordionTrigger className="bg-slate-300/10 [&[data-state=open]]:bg-secondary [&[data-state=open]]:text-white   p-2 text-sm font-semibold">
                              <div className="flex space-x-2">
                                <p>{transaction.name}</p>
                                <Link
                                  href={`/dashboard/profiles/${profileInfo.id}?delete=true&type=transaction&id=${transaction.id}`}
                                  className="flex "
                                >
                                  <X className="bg-red-500 rounded-xl text-white mr-4 ring-2 ring-white" />
                                </Link>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="ml-4 space-y-4">
                              <Link
                                href={`/dashboard/profiles/${profileInfo.id}?add=true&type=function&transaction_id=${transaction.id}`}
                              >
                                <p>Adicionar função</p>
                              </Link>
                              {transaction.functions.length === 0 && (
                                <h2 className="font-bold text-md mb-2 flex items-center justify-center mt-2">
                                  Não há funções acessíveis
                                </h2>
                              )}
                              {transaction.functions.length > 0 &&
                                transaction.functions.map((func, idx) => (
                                  <div
                                    key={module.name + transaction.name}
                                    className="flex space-x-2"
                                  >
                                    <p>{func.name}</p>
                                    <Link
                                      href={`/dashboard/profiles/${profileInfo.id}?delete=true&type=function&id=${func.id}&transaction_id=${transaction.id}`}
                                      className="flex "
                                    >
                                      <X className="bg-red-500 rounded-xl text-white mr-4 ring-2 ring-white" />
                                    </Link>
                                  </div>
                                ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
      </section>

      {itemType === "module" && addModalParams && (
        <Modal.Root>
          <CreatProfileModuleForm profileId={profileInfo.id} />
        </Modal.Root>
      )}

      {itemType === "transaction" && addModalParams && (
        <Modal.Root>
          <CreateProfileTransactionForm
            module_id={moduleIdParams}
            profile_id={profileInfo.id}
          />
        </Modal.Root>
      )}

      {itemType === "function" && addModalParams && (
        <Modal.Root>
          <CreateProfileFunctionForm
            profile_id={profileInfo.id}
            transaction_id={transactionIdParams}
          />
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

      {itemType === "transaction" && deleteModalParams && (
        <Modal.Root>
          <DeleteProfileRelation
            type={itemType}
            entity_id={itemIdParams}
            profile_id={profileInfo.id}
          />
        </Modal.Root>
      )}

      {itemType === "function" && deleteModalParams && (
        <Modal.Root>
          <DeleteProfileRelation
            type={itemType}
            entity_id={itemIdParams}
            profile_id={profileInfo.id}
            transaction_id={transactionIdParams}
          />
        </Modal.Root>
      )}
    </Content.Root>
  );
};

export default CCProfileIdPage;
