import logo from "@/public/queroquero.webp";
import Forms from "@/src/components/forms";
import authService from "@/src/services/AuthService";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "QQ | Redefinir Senha",
};

type ResetPasswordPagePageProps = {
  params: {
    slug: string;
  };
};

const ResetPasswordPage = async ({ params }: ResetPasswordPagePageProps) => {
  const token = params.slug[0];
  try {
    const validateToken = await authService.validatePasswordReset(token);
  } catch (e) {
    return <InvalidToken />;
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <Image
        src={logo}
        alt="Logo Lojas Quero-Quero"
        width={200}
        height={200}
        className="rounded-full mb-12 drop-shadow-2xl"
      />
      <Forms.PasswordReset token={token} />
    </main>
  );
};

export default ResetPasswordPage;

const InvalidToken = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <Image
        src={logo}
        alt="Logo Lojas Quero-Quero"
        width={200}
        height={200}
        className="rounded-full mb-12 drop-shadow-2xl"
      />
      <h1 className="font-bold text-white">Token inválido ou expirado!</h1>
      <Link
        className="font-bold text-sm text-indigo-700 mt-10 hover:text-textColor hover:cursor-pointer"
        href={"/"}
      >
        Voltar para o login
      </Link>
    </main>
  );
};
