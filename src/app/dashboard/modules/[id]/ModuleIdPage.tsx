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
import convertStringToBoolean from "@/src/lib/utils/ConvertStringToBool";
import convertStringToInt from "@/src/lib/utils/ConvertStringToInt";
import { DetailedModule } from "@/src/models/types/Modules";
import { ArrowLeftRight, GripHorizontal } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ModuleStylePreview from "../(components)/ModuleStylePreview";
import CreateFunctionForm from "./(components)/CreateFunctionForm";
import CreateTransactionForm from "./(components)/CreateTransactionForm";
import DeleteFunction from "./(components)/DeleteFunction";
import DeleteTransaction from "./(components)/DeleteTransaction";
import FunctionsTable from "./(components)/FunctionTable";
import TransactionTable from "./(components)/TransactionTable";
import UpdateFunctionForm from "./(components)/UpdateFunctionForm";
import UpdateTransactionForm from "./(components)/UpdateTransactionForm";

type ModuleIdPageProps = {
  moduleInfo: DetailedModule;
};

const ModuleIdPage = ({ moduleInfo }: ModuleIdPageProps) => {
  const {
    name,
    description,
    created_at,
    functions,
    transactions,
    id,
    background_color,
    text_color,
  } = moduleInfo;
  const modulePreview = {
    name,
    text_color,
    background_color,
  };
  const localDate = new Date(created_at).toLocaleString("pt-br");

  const searchParams = useSearchParams();
  const itemIdParams = searchParams.get("id");
  const itemType = searchParams.get("type");
  const addModalParams = convertStringToBoolean(searchParams.get("add"));
  const editModalParams = convertStringToBoolean(searchParams.get("edit"));
  const deleteModalParams = convertStringToBoolean(searchParams.get("delete"));

  const transactionInfo = transactions.find(
    (transaction) => transaction.id === convertStringToInt(itemIdParams)
  );

  const functionInfo = functions.find(
    (func) => func.id === convertStringToInt(itemIdParams)
  );

  return (
    <Content.Root>
      <header className="flex w-full lg:3/5 xl:w-2/5 items-center  justify-between   mb-10">
        <div>
          <Content.Title title={`Módulo - ${name}`} />
          <Content.Subtitle text={localDate} />
        </div>
        <ModuleStylePreview modulePreview={modulePreview} />
      </header>

      <div className="text-textColor mb-14">
        <p className="font-bold ">Descrição:</p>
        <p className="text-sm">{description || "Sem descrição"}</p>
      </div>
      <section className="space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className=" [&[data-state=open]]:bg-primary [&[data-state=open]]:text-white   p-2 mb-2 rounded-sm font-semibold">
              <p className="flex">
                <ArrowLeftRight className="mr-2"></ArrowLeftRight>Transações
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <Link href={`/dashboard/modules/${id}?add=true&type=transaction`}>
                <Button className="mb-4">Adicionar Transação</Button>
              </Link>

              <TransactionTable moduleId={id} transactions={transactions} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger className=" [&[data-state=open]]:bg-primary [&[data-state=open]]:text-white   p-2 mb-2 rounded-sm font-semibold">
              <p className="flex">
                <GripHorizontal className="mr-2" />
                Funções
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <Link href={`/dashboard/modules/${id}?add=true&type=function`}>
                <Button className="mb-4">Adicionar Função</Button>
              </Link>
              <FunctionsTable moduleId={id} functions={functions} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {itemType === "transaction" && addModalParams && (
        <Modal.Root>
          <CreateTransactionForm module_id={id} />
        </Modal.Root>
      )}
      {itemType === "function" && addModalParams && (
        <Modal.Root>
          <CreateFunctionForm module_id={id} />
        </Modal.Root>
      )}

      {itemType === "function" && editModalParams && functionInfo && (
        <Modal.Root>
          <UpdateFunctionForm functionInfo={functionInfo} module_id={id} />
        </Modal.Root>
      )}

      {itemType === "transaction" && editModalParams && transactionInfo && (
        <Modal.Root>
          <UpdateTransactionForm
            transactionInfo={transactionInfo}
            module_id={id}
          />
        </Modal.Root>
      )}

      {itemType === "function" && deleteModalParams && functionInfo && (
        <Modal.Root>
          <DeleteFunction functionInfo={functionInfo} module_id={id} />
        </Modal.Root>
      )}

      {itemType === "transaction" && deleteModalParams && transactionInfo && (
        <Modal.Root>
          <DeleteTransaction transactionInfo={transactionInfo} module_id={id} />
        </Modal.Root>
      )}
    </Content.Root>
  );
};

export default ModuleIdPage;
