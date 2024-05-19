"use client";

import navigation from "@/src/constants/navigation";
import React from "react";
import profileAvatar from "@/public/profile-avatar.png";
import Image from "next/image";
import mockUsers from "@/src/data/datamock";
import { LucideLogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <section className="h-screen w-[300px] bg-secondary drop-shadow-xl flex flex-col items-center justify-evenly text-white fixed">
      <article className="flex items-center justify-center flex-col">
        <Image
          className="drop-shadow-xl"
          src={profileAvatar}
          alt="Imagem de perfil do usuário"
          height={150}
        />
        <div className="flex flex-col items-center justify-center text-white">
          <p className="font-semibold text-lg">{mockUsers[0].name}</p>
          <p className="text-sm font-light ">{mockUsers[0].profile}</p>
        </div>
      </article>
      <div className="divider h-[1px] w-[90%] my-4 bg-white mx-auto" />

      <nav
        id="navlinks"
        className="flex flex-col items-center justify-center w-full"
      >
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex space-x-4 text-sm w-full h-[45px] pl-12 items-center ${
              pathname === item.href ? "bg-white text-secondary font-bold " : ""
            }`}
          >
            <item.icon></item.icon>
            <p>{item.name}</p>
          </Link>
        ))}
      </nav>

      <div className="divider h-[1px] w-[90%] my-4 bg-white mx-auto " />
      <Link
        href={"/"}
        className={`flex space-x-4 text-sm w-full h-[45px] pl-12 items-center `}
      >
        <LucideLogOut />
        <p>Logout</p>
      </Link>
    </section>
  );
};

export default Navbar;
