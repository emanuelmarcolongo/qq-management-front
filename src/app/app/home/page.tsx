import Content from "@/src/components/page-content";
import { getUserInfo } from "@/src/utils/cookies/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quero-Quero | Início",
};

const Page = async () => {
  const userInfo = await getUserInfo();

  if (!userInfo) {
    redirect("/");
  }

  return (
    <Content.Root>
      <Content.Title title="Minhas informações" />
      <article className="mt-10 space-y-4 p-6 border-[1px] border-[#D9D9D9] bg-white text-textColor rounded-sm">
        <div>
          <label className="block  text-sm font-bold">Nome:</label>
          <p className="text-md ">{userInfo.name}</p>
        </div>
        <div>
          <label className="block  text-sm font-bold ">Usuário:</label>
          <p className="text-md ">{userInfo.username}</p>
        </div>
        <div>
          <label className="block  text-sm font-bold ">Perfil:</label>
          <p className="text-md ">{userInfo.profile}</p>
        </div>
        <div>
          <label className="block  text-sm font-bold ">Matrícula:</label>
          <p className="text-md ">{userInfo.registration}</p>
        </div>
        <div>
          <label className="block  text-sm font-bold ">Email:</label>
          <p className="text-md ">{userInfo.email}</p>
        </div>
      </article>
    </Content.Root>
  );
};

export default Page;
