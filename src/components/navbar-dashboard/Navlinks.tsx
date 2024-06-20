"use client";

import { DashboardNavigation } from "@/src/constants/navigation";
import { View } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavlinksProps {
  is_admin: Boolean;
}

const Navlinks = ({ is_admin }: NavlinksProps) => {
  const pathname = usePathname();
  return (
    <nav
      id="navlinks"
      className="flex flex-col items-center justify-center w-full"
    >
      {DashboardNavigation.map((item) => (
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
      {is_admin && (
        <Link
          href={`/app/home`}
          className={`flex space-x-4 text-sm w-full h-[45px] pl-12 items-center `}
        >
          <View />
          <p>Visão do usuário</p>
        </Link>
      )}
    </nav>
  );
};

export default Navlinks;
