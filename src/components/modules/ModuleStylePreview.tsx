import React from "react";

type ModulePreviewProps = {
  modulePreview: {
    name: string;
    backgroundColor: string;
    textColor: string;
  };
};
const ModuleStylePreview = ({ modulePreview }: ModulePreviewProps) => {
  const { backgroundColor, name, textColor } = modulePreview;
  return (
    <>
      <p className="text-textColor font-semibold text-sm">Preview</p>
      <div
        className={`rounded-2xl flex items-center justify-center h-[40px] font-bold `}
        style={{
          backgroundColor,
          color: textColor,
          border: `2px ${textColor} solid`,
        }}
      >
        {name}
      </div>
    </>
  );
};

export default ModuleStylePreview;
