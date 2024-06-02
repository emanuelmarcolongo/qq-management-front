type ModulePreviewProps = {
  modulePreview: {
    name: string;
    background_color: string;
    text_color: string;
  };
};
const ModuleStylePreview = ({ modulePreview }: ModulePreviewProps) => {
  const { background_color, name, text_color } = modulePreview;
  return (
    <div
      className={`rounded-2xl flex items-center justify-center h-[40px] font-bold max-w-[400px] px-4 py-2 text-center`}
      style={{
        backgroundColor: background_color,
        color: text_color,
        border: `2px ${text_color} solid`,
      }}
    >
      {name}
    </div>
  );
};

export default ModuleStylePreview;
