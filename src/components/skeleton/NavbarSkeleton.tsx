import { Menu } from "lucide-react";
import LoadingSpinner from "./LoaderSpinner";

const SkeletonNavbar = () => {
  return (
    <>
      <DesktopNavbarSkeleton />
      <MobileNavbarSkeleton />
    </>
  );
};

const DesktopNavbarSkeleton = () => {
  return (
    <section
      id="desktop-navbar"
      className="hidden md:flex  h-screen md:w-[220px] lg:w-[300px] bg-secondary drop-shadow-xl  flex-col items-center justify-evenly text-white fixed"
    >
      <article className="flex items-center justify-center flex-col">
        <div className="bg-white animate-pulse text-transparent  rounded-full w-[150px] h-[150px]  " />
      </article>
      <div className="divider h-[1px] w-[90%] my-4 bg-white mx-auto" />

      <LoadingSpinner />

      <div className="divider h-[1px] w-[90%] my-4 bg-white mx-auto " />
      <LoadingSpinner />
    </section>
  );
};

const MobileNavbarSkeleton = () => {
  return (
    <section className="bg-secondary drop-shadow-xl h-[70px] w-screen fixed top-0 z-10 md:hidden flex items-center justify-between px-4">
      <div className="flex items-center justify-center">
        <div className="drop-shadow-xl rounded-full w-[60px] h-[60px] animate-pulse bg-white"></div>
      </div>
      <Menu color="white" size={35} />
    </section>
  );
};

export default SkeletonNavbar;
