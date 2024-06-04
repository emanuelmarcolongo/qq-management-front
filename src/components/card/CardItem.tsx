import React from "react";

interface CardItemProps {
  children: React.ReactNode;
}

const CardItem = ({ children }: CardItemProps) => {
  return <div>{children}</div>;
};

export default CardItem;
