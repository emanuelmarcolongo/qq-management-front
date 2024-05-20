import Forms from "@/src/components/forms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QQ | Login",
};
export default function Home() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Forms.UserLogin />
    </main>
  );
}
