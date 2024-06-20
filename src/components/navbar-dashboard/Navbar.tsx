import profileAvatar from "@/public/profile-avatar.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { DashboardNavigation } from "@/src/constants/navigation";
import { getUserInfo } from "@/src/lib/cookies/auth";
import { UserSignInInfo } from "@/src/models/types/Auth";
import { Menu, View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton, LogoutButtonMobile } from "./LogoutButton";
import Navlinks from "./Navlinks";

const Navbar = async () => {
  const userInfo = await getUserInfo();

  if (!userInfo) redirect("/");
  return (
    <>
      <DesktopNavbar userInfo={userInfo} />
      <MobileNavbar userInfo={userInfo} />
    </>
  );
};

interface NavbarProps {
  userInfo: UserSignInInfo;
}

const DesktopNavbar = ({ userInfo }: NavbarProps) => {
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
          <p className="font-semibold text-lg">{userInfo.name}</p>
          <p className="text-sm font-light ">{userInfo.profile}</p>
        </div>
      </article>
      <div className="divider h-[1px] w-[90%] my-4 bg-white mx-auto" />

      <Navlinks is_admin={userInfo.is_admin} />

      <div className="divider h-[1px] w-[90%] my-4 bg-white mx-auto " />
      <LogoutButton />
    </section>
  );
};

const MobileNavbar = ({ userInfo }: NavbarProps) => {
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
          <p className="font-bold ">{userInfo.name}</p>
          <p>{userInfo.profile}</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu color="white" size={35} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ir para:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {DashboardNavigation.map((navlink) => (
            <DropdownMenuItem key={navlink.href}>
              <Link className="flex items-center space-x-4" href={navlink.href}>
                <navlink.icon size={15} />
                <p>{navlink.name}</p>
              </Link>
            </DropdownMenuItem>
          ))}
          {userInfo.is_admin && (
            <DropdownMenuItem>
              <Link className="flex items-center space-x-4" href={`/app/home`}>
                <View size={15} />
                <p>Visão usuário</p>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <LogoutButtonMobile />
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default Navbar;
