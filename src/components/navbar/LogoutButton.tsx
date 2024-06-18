"use client";

import { deleteCookies } from "@/src/lib/cookies/auth";
import { LucideLogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await deleteCookies();

    router.push("/");
  };
  return (
    <div
      onClick={() => handleLogout()}
      className={`hover:cursor-pointer  flex space-x-4 text-sm w-full h-[45px] pl-12 items-center `}
    >
      <LucideLogOut />
      <p>Logout</p>
    </div>
  );
};

export const LogoutButtonMobile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await deleteCookies();

    router.push("/");
  };
  return (
    <div
      onClick={() => handleLogout()}
      className={`hover:cursor-pointer  flex space-x-4 text-sm w-full h-[30px] pl-2 hover:bg-indigo-50  items-center `}
    >
      <LucideLogOut size={15} />
      <p>Logout</p>
    </div>
  );
};
