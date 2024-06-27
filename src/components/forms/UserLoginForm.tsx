"use client";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useToast } from "@/src/components/ui/use-toast";
import { userLoginSchema } from "@/src/models/validation";
import authService from "@/src/services/AuthService";
import { setCookies } from "@/src/utils/cookies/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserLoginForm = () => {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: z.infer<typeof userLoginSchema>) => {
    try {
      const userLogin = await authService.userLogin(data);
      await setCookies(userLogin);

      toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Login efetuado com sucesso!</p>
          </div>
        ),
      });

      if (userLogin.userInfo.is_admin) {
        router.push("/dashboard/users");
      } else {
        router.push("/app/home");
      }
    } catch (error) {
      let message = "Erro ao realizar login";
      if (error instanceof Error) {
        message = error.message;
      }

      const { id } = toast({
        variant: "destructive",
        description: (
          <div className="flex space-x-4 font-bold">
            <AlertCircle color="white" />
            <p>{message}</p>
          </div>
        ),
      });
    }
  };

  return (
    <main className="flex flex-col items-center ">
      <section className="w-[400px] border border-secondary p-8 rounded-md shadow-2xl flex flex-col items-center jusitfy-center bg-white">
        <h1 className="self-start font-bold text-textColor mb-6 text-xl">
          Acesse sua conta
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário ou e-mail</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} className="w-full" type="submit">
              {isSubmitting && (
                <LoaderCircle className="animate-spin self-center align-middle mr-4" />
              )}
              Entrar
            </Button>
          </form>
        </Form>
        <Link
          href={"/reset-password"}
          className="font-bold text-sm text-indigo-700 mt-10 self-start hover:text-textColor hover:cursor-pointer"
        >
          Esqueceu sua senha?
        </Link>
      </section>
    </main>
  );
};

export default UserLoginForm;
