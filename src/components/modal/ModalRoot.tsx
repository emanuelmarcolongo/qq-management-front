"use client";

import React, { Dispatch, ReactNode, SetStateAction } from "react";

interface ModalRootProps {
  children: ReactNode;
}

const ModalRoot = ({ children }: ModalRootProps) => {
  return (
    <section
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#ccc] bg-opacity-40"
      id="modalRoot"
    >
      {children}
    </section>
  );
};

export default ModalRoot;
