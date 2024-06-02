"use client";

import React, { Suspense, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useToast } from "@/src/components/ui/use-toast";
import { registerUserSchema } from "../../../../models/validation";
import { Input } from "@/src/components/ui/input";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { Profile } from "@/src/models/types/Profiles";
import ProfilesService from "@/src/services/ProfileService";
import UserService from "@/src/services/UserService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserWithProfile } from "@/src/models/types/User";

type UpdateUserFormProps = {
  userInfo: UserWithProfile;
};

const UpdateUserForm = ({ userInfo }: UpdateUserFormProps) => {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: userInfo.email,
      name: userInfo.name,
      registration: userInfo.registration,
      profile_id: userInfo.profile.id,
      username: userInfo.username,
    },
  });

  const onSubmit = async (data: z.infer<typeof registerUserSchema>) => {
    try {
      const updatedUser = await UserService.updateUser(userInfo.id, data);
      const { id } = toast({
        description: (
          <div className="flex space-x-4">
            <CheckCircle color="#11945A" />
            <p>Usuário editado com sucesso!</p>
          </div>
        ),
      });
      router.refresh();
    } catch (error) {
      let message = "Erro ao editar usuário";
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

  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fetchedProfiles = await ProfilesService.getProfiles();
        if (fetchedProfiles) setProfiles(fetchedProfiles);
      } catch (error) {
        const { id } = toast({
          variant: "destructive",
          description: (
            <div className="flex space-x-4 font-bold">
              <AlertCircle color="white" />
              <p>Erro ao carregar perfis</p>
            </div>
          ),
        });
      }
    };

    fetchProfiles();
  }, []);

  return (
    <section className="w-[400px] max-h-[700px] h-full border border-inputBorder p-8 rounded-md shadow-2xl flex flex-col items-center jusitfy-center bg-white overflow-y-auto text-sm">
      <div className="flex justify-between w-full">
        <h1 className="self-start font-bold  text-textColor mb-6 text-xl">
          Editar Usuário
        </h1>
        <Link href={"/dashboard/users"}>
          <X />
        </Link>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  * Essa será a credencial de acesso ao sistema.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matrícula</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Suspense fallback={<p>Carregando...</p>}>
            <FormField
              control={form.control}
              name="profile_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perfil do colaborador(a)</FormLabel>

                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={userInfo.profile.name} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {profiles.length > 0 &&
                        profiles.map((profile) => (
                          <SelectItem
                            key={profile.id}
                            value={profile.id.toString()}
                          >
                            {profile.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </Suspense>
          <Button className="w-full" type="submit">
            Atualizar
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default UpdateUserForm;
