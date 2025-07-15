"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUsers } from "@/constants/users";
import IUser from "@/types/user";
import { ArrowLeft, Camera, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserData() {
  const router = useRouter();
  const [load, setLoad] = useState(true);
  const [user, setUser] = useState<IUser>(mockUsers[0]);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
  return (
    <main className="flex flex-col gap-4 pb-30">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold z-[95945] ">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1>Perfil</h1>
      </span>

      {load ? (
        <div className="flex justify-center w-full min-h-[80dvh]  scale-75 items-center">
          <Loader type="Spinner" />
        </div>
      ) : (
        <div className="p-4 flex flex-col">
          <form
            data-aos="fade-up"
            action=""
            className="flex flex-col gap-4 border rounded-sm p-4 mt-9 md:place-self-center md:w-[50%] "
          >
            <div className="flex justify-center items-center flex-col ">
              <h1 className="text-primary text-2xl font-semibold">
                Edite os dados{" "}
              </h1>
              <p className="text-sm">da sua conta</p>
            </div>
            <Label htmlFor="name">Foto</Label>{" "}
            <div
              className="h-30 w-30 relative
             rounded-full border-3 border-double flex flex-col justify-center items-center  "
            >
              <img
                src={user.profile}
                className=" object-contain h-25 w-25 rounded-full"
              />
              <Input
                className="absolute cursor-pointer rounded-full opacity-0 h-30 w-30"
                type="file"
              />
              <div className="absolute animate-pulse text-white bg-primary p-1 rounded-sm left-1 bottom-2">
                <Camera size={18} />
              </div>
            </div>
            <Label htmlFor="name">Nome</Label>
            <Input
              required
              placeholder="seu nome"
              type="text"
              id="name"
              name="name"
            />{" "}
            <Label htmlFor="lastname">Sobrenome</Label>
            <Input
              required
              placeholder="seu sobrenome  (opcional)"
              type="text"
              id="lastname"
              name="lastname"
            />{" "}
            <Button className="text-md  h-[45px]">
              Salvar <Save />{" "}
            </Button>
          </form>
        </div>
      )}
    </main>
  );
}
