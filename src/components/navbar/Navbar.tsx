import React from "react";
import profileAvatar from "@/public/profile-avatar.png";
import Image from "next/image";
import mockUsers from "@/src/data/datamock";
import { LucideLogOut, Menu } from "lucide-react";
import Link from "next/link";
import Navlinks from "./Navlinks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import navigation from "@/src/constants/navigation";

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

const DesktopNavbar = () => {
  return (
    <section
      id="desktop-navbar"
      className="hidden md:flex  h-screen w-[300px] bg-secondary drop-shadow-xl  flex-col items-center justify-evenly text-white fixed"
    >
      <article className="flex items-center justify-center flex-col">
        <Image
          priority
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

      <Navlinks />

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

const MobileNavbar = () => {
  return (
    <section className="bg-secondary drop-shadow-xl h-[70px] w-screen fixed top-0 z-10 md:hidden flex items-center justify-between px-4">
      <div>
        <Image
          priority
          className="drop-shadow-xl"
          src={profileAvatar}
          alt="Imagem de perfil do usuário"
          height={60}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu color="white" size={35} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ir para:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {navigation.map((navlink) => (
            <DropdownMenuItem>
              <Link className="flex items-center space-x-4" href={navlink.href}>
                <navlink.icon size={15} />
                <p>{navlink.name}</p>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default Navbar;
