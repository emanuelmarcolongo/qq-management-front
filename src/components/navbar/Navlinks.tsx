"use client";

import navigation from "@/src/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navlinks = () => {
  const pathname = usePathname();
  return (
    <nav
      id="navlinks"
      className="flex flex-col items-center justify-center w-full"
    >
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex space-x-4 text-sm w-full h-[45px] pl-12 items-center ${
            pathname.includes(item.href)
              ? "bg-white text-secondary font-bold "
              : ""
          }`}
        >
          <item.icon></item.icon>
          <p>{item.name}</p>
        </Link>
      ))}
    </nav>
  );
};

export default Navlinks;
