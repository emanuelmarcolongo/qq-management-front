import Forms from "@/src/components/forms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QQ | Redefinir Senha",
};

export default function RequestPasswordReset() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Forms.RequestPasswordReset />
    </main>
  );
}
