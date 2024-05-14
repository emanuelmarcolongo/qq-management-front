import { User } from "@/src/components/user";

export default function Home() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <User.CreateForm />
    </main>
  );
}
