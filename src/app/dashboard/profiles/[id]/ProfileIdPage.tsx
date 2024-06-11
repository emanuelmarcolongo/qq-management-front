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
import {
  ArrowRightLeft,
  GripHorizontal,
  Package,
  Trash,
  X,
} from "lucide-react";
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
      <div className="lg:w-1/2">
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
              <Button className="drop-shadow-lg">Adicionar módulo</Button>
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
                <Accordion
                  className="border  border-inputBorder rounded-sm "
                  type="single"
                  collapsible
                >
                  <AccordionItem
                    className="drop-shadow-xl"
                    value={`module-${module.id}`}
                  >
                    <AccordionTrigger className=" [&[data-state=open]]:bg-primary rounded-sm [&[data-state=open]]:text-white  p-2 text-base font-semibold ">
                      <div className="flex justify-between w-full">
                        <div className="flex gap-2">
                          <Package /> {module.name}
                        </div>

                        <Link
                          href={`/dashboard/profiles/${profileInfo.id}?delete=true&type=module&id=${module.id}`}
                          className="flex "
                        >
                          <Trash className=" rounded-xl  mr-4" />
                        </Link>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 p-2 flex flex-col">
                      <Link
                        href={`/dashboard/profiles/${profileInfo.id}?add=true&type=transaction&module_id=${module.id}`}
                        className=" px-3 py-2.5 bg-primary text-slate-50 hover:bg-primary/90 dark:bg-slate-50 dark:text-primary dark:hover:bg-slate-50/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
                      >
                        Adicionar transação
                      </Link>
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
                              <AccordionTrigger className="bg-slate-300/10  [&[data-state=open]]:bg-secondary [&[data-state=open]]:text-white   p-2 text-sm font-semibold">
                                <div className="flex justify-between w-full">
                                  <div className="flex gap-2">
                                    <ArrowRightLeft></ArrowRightLeft>
                                    {transaction.name}
                                  </div>

                                  <Link
                                    href={`/dashboard/profiles/${profileInfo.id}?delete=true&type=transaction&id=${transaction.id}`}
                                    className="flex "
                                  >
                                    <Trash className=" rounded-xl  mr-4" />
                                  </Link>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="space-y-4 p-2 flex flex-col">
                                <Link
                                  href={`/dashboard/profiles/${profileInfo.id}?add=true&type=function&transaction_id=${transaction.id}`}
                                  className=" px-3 py-2.5 bg-secondary mt-2 text-slate-50 hover:bg-secondary/90 dark:bg-slate-50 dark:text-primary dark:hover:bg-slate-50/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
                                >
                                  Adicionar Função
                                </Link>
                                {transaction.functions.length === 0 && (
                                  <h2 className="font-bold text-md mb-2 flex items-center justify-center mt-2">
                                    Não há funções acessíveis
                                  </h2>
                                )}
                                {transaction.functions.length > 0 &&
                                  transaction.functions.map((func, idx) => (
                                    <div
                                      key={
                                        module.name +
                                        transaction.name +
                                        func.name
                                      }
                                      className="font-bold flex justify-between w-full space-x-2  pb-1 border-b-[1px] border-black`/10"
                                    >
                                      <div className="flex gap-2">
                                        <GripHorizontal /> {func.name}
                                      </div>
                                      <Link
                                        href={`/dashboard/profiles/${profileInfo.id}?delete=true&type=function&id=${func.id}&transaction_id=${transaction.id}`}
                                        className="flex "
                                      >
                                        <Trash className=" rounded-xl  mr-4" />
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
      </div>
    </Content.Root>
  );
};

export default CCProfileIdPage;
