"use client";

import logo from "@/public/queroquero.webp";
import Image from "next/image";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center">
      <Image
        src={logo}
        alt="Logo Lojas Quero-Quero"
        width={200}
        height={200}
        className="rounded-full mb-12 drop-shadow-2xl"
      />
      <h2 className="text-bold text-textColor">{error.message}</h2>

      <Link className="text-indigo-600 font-bold mt-4" href={"/"}>
        Voltar para o login
      </Link>
    </div>
  );
}
