import React from "react";

interface ContentTitleProps {
  title: string;
}

const ContentTitle = ({ title }: ContentTitleProps) => {
  return <h1 className="text-textColor font-bold text-xl mb-10">{title}</h1>;
};

export default ContentTitle;
