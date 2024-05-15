import { Module } from "@/src/components/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QQ | Login",
};
export default function Home() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Module.CreateForm />
    </main>
  );
}
