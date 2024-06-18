import profileAvatar from "@/public/profile-avatar.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import navigation from "@/src/constants/navigation";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import Navlinks from "./Navlinks";

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
      className="hidden md:flex  h-screen md:w-[220px] lg:w-[300px] bg-secondary drop-shadow-xl  flex-col items-center justify-evenly text-white fixed"
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
          <p className="font-semibold text-lg">Emanuel</p>
          <p className="text-sm font-light ">Admin</p>
        </div>
      </article>
      <div className="divider h-[1px] w-[90%] my-4 bg-white mx-auto" />

      <Navlinks />

      <div className="divider h-[1px] w-[90%] my-4 bg-white mx-auto " />
      <LogoutButton />
    </section>
  );
};

const MobileNavbar = () => {
  return (
    <section className="bg-secondary drop-shadow-xl h-[70px] w-screen fixed top-0 z-10 md:hidden flex items-center justify-between px-4">
      <div className="flex items-center justify-center">
        <Image
          priority
          className="drop-shadow-xl"
          src={profileAvatar}
          alt="Imagem de perfil do usuário"
          height={60}
        />
        <div className="text-sm text-white ml-4">
          <p className="font-bold ">Carlos Silva</p>
          <p>Administrador(a)</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu color="white" size={35} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ir para:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {navigation.map((navlink) => (
            <DropdownMenuItem key={navlink.href}>
              <Link className="flex items-center space-x-4" href={navlink.href}>
                <navlink.icon size={15} />
                <p>{navlink.name}</p>
              </Link>
            </DropdownMenuItem>
          ))}
          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default Navbar;
