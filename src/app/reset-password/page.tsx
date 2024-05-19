import { User } from "@/src/components/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QQ | Redefinir Senha",
};

export default function RequestPasswordReset() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <User.RequestPassword />
    </main>
  );
}
