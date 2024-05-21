"use client";

import React, { Dispatch, ReactNode, SetStateAction } from "react";

interface ModalRootProps {
  children: ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const ModalRoot = ({ children, setShowModal }: ModalRootProps) => {
  return (
    <section
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#ccc] bg-opacity-40"
      id="modalRoot"
      onClick={() => setShowModal(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </section>
  );
};

export default ModalRoot;
