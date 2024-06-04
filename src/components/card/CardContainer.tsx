import { ReactNode } from "react";

interface CardContainerProps {
  children: ReactNode;
}

const CardContainer = ({ children }: CardContainerProps) => {
  return (
    <section className="w-[400px] border border-inputBorder space-y-10 p-8 rounded-md shadow-2xl flex flex-col items-start bg-white">
      {children}
    </section>
  );
};

export default CardContainer;
