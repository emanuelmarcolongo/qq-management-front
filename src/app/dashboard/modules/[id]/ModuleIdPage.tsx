"use client";

import Content from "@/src/components/page-content";
import { DetailedModule } from "@/src/models/types/Modules";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import ModuleStylePreview from "../(components)/ModuleStylePreview";
import TransactionTable from "./(components)/TransactionTable";
import FunctionsTable from "./(components)/FunctionTable";
import { Button } from "@/src/components/ui/button";
import { useSearchParams } from "next/navigation";
import convertStringToBoolean from "@/src/lib/utils/ConvertStringToBool";
import convertStringToInt from "@/src/lib/utils/ConvertStringToInt";
import CreateTransactionForm from "./(components)/CreateTransactionForm";
import Modal from "@/src/components/modal";
import Link from "next/link";
import CreateFunctionForm from "./(components)/CreateFunctionForm";

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
      <section className="">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Transações</AccordionTrigger>
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
            <AccordionTrigger>Funções</AccordionTrigger>
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
    </Content.Root>
  );
};

export default ModuleIdPage;
