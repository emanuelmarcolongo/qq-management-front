import React from "react";

interface ContentSubtitleProps {
  text: string;
}

const ContentSubtitle = ({ text }: ContentSubtitleProps) => {
  return (
    <p className="text-textColor font-bold text-xs flex items-center text-center">
      {text}
    </p>
  );
};

export default ContentSubtitle;
