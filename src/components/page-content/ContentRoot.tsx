import React, { ReactNode } from "react";

interface ContentRootProps {
  children: ReactNode;
}
const ContentRoot = ({ children }: ContentRootProps) => {
  return (
    <main className="w-full bg-white h-screen md:ml-[220px] lg:ml-[320px] mt-[100px] md:mt-6 rounded-md p-4 mx-auto overflow-x-hidden">
      {children}
    </main>
  );
};

export default ContentRoot;
