"use client";

import Modal from "@/src/components/modal";
import Content from "@/src/components/page-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import convertStringToBoolean from "@/src/utils/converters/ConvertStringToBool";
import convertStringToInt from "@/src/utils/converters/ConvertStringToInt";
import { DetailedProfile } from "@/src/models/types/Profiles";
import {
  ArrowRightLeft,
  GripHorizontal,
  Package,
  Plus,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CreateProfileFunctionForm from "../(components)/CreateProfileFunctionForm";
import CreatProfileModuleForm from "../(components)/CreateProfileModuleForm";
import CreateProfileTransactionForm from "../(components)/CreateProfileTransactionForm";
import DeleteProfileRelation from "../(components)/DeleteProfileRelation";

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
      <div className="">
        <header className="flex w-full items-center  justify-between   mb-10">
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
              <Button className="drop-shadow-lg">
                <Plus></Plus>Vincular módulo
              </Button>
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
                <Accordion className=" " type="single" collapsible>
                  <AccordionItem
                    className="drop-shadow-xl"
                    value={`module-${module.id}`}
                  >
                    <AccordionTrigger className=" [&[data-state=open]]:bg-primary rounded-sm items-center [&[data-state=open]]:text-white  p-2 text-base font-semibold ">
                      <div className="flex justify-between w-full">
                        <div className="flex gap-2">
                          <Package /> {module.name}
                        </div>

                        <div className="flex  items-center space-x-2">
                          <Link
                            href={`/dashboard/profiles/${profileInfo.id}?add=true&type=transaction&module_id=${module.id}`}
                            className="p-1  bg-primary text-slate-50 hover:bg-secondary/90 rounded-md hover:bg-white hover:text-primary"
                          >
                            <Plus className=" rounded-xl" />
                          </Link>
                          <Link
                            href={`/dashboard/profiles/${profileInfo.id}?delete=true&type=module&id=${module.id}`}
                            className="flex "
                          >
                            <Trash className=" rounded-xl  mr-4" />
                          </Link>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 p-2 flex flex-col">
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
                              <AccordionTrigger className=" [&[data-state=open]]:bg-secondary [&[data-state=open]]:text-white   p-2 text-sm font-semibold">
                                <div className="flex justify-between w-full">
                                  <div className="flex gap-2">
                                    <ArrowRightLeft></ArrowRightLeft>
                                    {transaction.name}
                                  </div>
                                  <div className="flex space-x-2 items-center justify-center">
                                    <Link
                                      href={`/dashboard/profiles/${profileInfo.id}?add=true&type=function&transaction_id=${transaction.id}`}
                                      className="p-1  bg-secondary text-slate-50 hover:bg-secondary/90 rounded-md hover:bg-white hover:text-secondary"
                                    >
                                      <Plus></Plus>
                                    </Link>
                                    <Link
                                      href={`/dashboard/profiles/${profileInfo.id}?delete=true&type=transaction&id=${transaction.id}`}
                                      className="flex "
                                    >
                                      <Trash className=" rounded-xl  " />
                                    </Link>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="space-y-4 p-2 flex flex-col">
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
