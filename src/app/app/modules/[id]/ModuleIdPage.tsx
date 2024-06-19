"use client";

import Content from "@/src/components/page-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { ModuleDetail } from "@/src/models/types/Profiles";
import { ArrowLeftRight, GripHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
type ModuleIdPageProps = {
  moduleInfo: ModuleDetail;
};

const ModuleIdPage = ({ moduleInfo }: ModuleIdPageProps) => {
  const { name, description, transactions, id } = moduleInfo;

  const searchParams = useSearchParams();
  return (
    <Content.Root>
      <header className="flex w-full lg:3/5 xl:w-2/5 items-center  justify-between   mb-10">
        <Content.Title title={`Módulo - ${name}`} />
      </header>

      <div className="text-textColor mb-14">
        <p className="font-bold ">Descrição:</p>
        <p className="text-sm">{description || "Sem descrição"}</p>
      </div>

      <section className="space-y-4">
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <Accordion key={transaction.id} type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className=" [&[data-state=open]]:bg-primary [&[data-state=open]]:text-white  p-2 mb-2 rounded-sm font-semibold">
                  <p className="flex">
                    <ArrowLeftRight className="mr-2" />
                    {transaction.name}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p>
                    <span className="font-bold">Descrição:</span>{" "}
                    {transaction.description}
                  </p>

                  <p className="font-bold"> </p>
                  {transaction.functions.length > 0
                    ? transaction.functions.map((func) => (
                        <h1 className="flex font-bold">
                          <GripHorizontal className="mr-2" />
                          {func.name}
                        </h1>
                      ))
                    : "Não há funções disponíveis"}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
      </section>
    </Content.Root>
  );
};

export default ModuleIdPage;
