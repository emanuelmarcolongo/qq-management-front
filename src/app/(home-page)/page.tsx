import { Module } from "@/src/components/modules";
import Transaction from "@/src/components/transaction";
import { User } from "@/src/components/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QQ | Login",
};
export default function Home() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Transaction.CreateForm />
    </main>
  );
}
