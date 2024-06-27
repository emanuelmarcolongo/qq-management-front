import ContentRoot from "@/src/components/page-content/ContentRoot";
import LoadingSpinner from "@/src/components/skeleton/LoaderSpinner";
import SkeletonNavbar from "@/src/components/skeleton/NavbarSkeleton";

const Loading = () => {
  return (
    <div className={`relative max-w-[100%] overflow-x-hidden text-textColor`}>
      <div className="md:flex bg-[#F8F8F8]">
        <SkeletonNavbar />
        <ContentRoot>
          <div className="w-[90vw] h-[80vh] flex items-center justify-center overflow-hidden">
            <LoadingSpinner />
          </div>
        </ContentRoot>
      </div>
    </div>
  );
};

export default Loading;
