import Forms from "@/src/components/forms";
import { Metadata } from "next";
import Image from "next/image";
import logo from "@/public/queroquero.webp";
export const metadata: Metadata = {
  title: "QQ | Redefinir Senha",
};

export default function RequestPasswordReset() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <Image
        src={logo}
        alt="Logo Lojas Quero-Quero"
        width={200}
        height={200}
        className="rounded-full mb-12 drop-shadow-2xl"
      />
      <Forms.RequestPasswordReset />
    </main>
  );
}
