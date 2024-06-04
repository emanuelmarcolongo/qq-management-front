import React, { ReactNode } from "react";

interface CardSectionProps {
  children: ReactNode;
}

const CardSection = ({ children }: CardSectionProps) => {
  return (
    <article className="w-full mb-6 space-y-2 font-medium text-md">
      {children}
    </article>
  );
};

export default CardSection;
