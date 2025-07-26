"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUsers } from "@/constants/users";
import UserService from "@/services/api/user/user.service";
import { ArrowLeft,  Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserData() {
  const router = useRouter();

  let servive: UserService;
  
  const [reload, setReload] = useState(false);
  const [load, setLoad] = useState(true);
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    points: 0,
    telefone: "",
  });
  const [processing, setProceccing] = useState(false);
  useEffect(() => {

    setLoad(true)
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role != "ADMIN") {
      toast.info("Deves estar logado");
      router.push("/");
      return;
    }
    async function get() {
      if (!token) {
        console.log(token);
        toast.error("Você precisa estar logado");
        router.push("/");
        return;
      } else {
        servive = new UserService(token);
        const data = await servive.GetMyData();
        if (!data?.found) {
          toast.info(data?.message);
        } else {
          setUser({
            ...data,
          });
        }
        
    setTimeout(() => {
      setLoad(false);
    }, 1000);
      }
    }

    get();
  }, [reload]);

  async function handelOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formata = new FormData(e.currentTarget);
    const name = formata.get("name") as string;
    const lastname = formata.get("lastname") as string;
    if (!name || !lastname) {
      toast.error("Preenche Todos os campos");
      return;
    } else {
      if (lastname == user.lastname && name == user.name) {
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) {
        console.log(token);
        toast.error("Você precisa estar logado");
        router.push("/");
        return;
      } else {
        setProceccing(true);
        servive = new UserService(token);
        const data = await servive.updateProfile({
          name,
          lastname,
        });
        if (data.updated) {
          toast.success(data.message);
          setReload((prev) => !prev);
        } else {
          toast.error(data.message);
        }

        setTimeout(() => {
          setProceccing(false);
        }, 2000);

        return;
      }
    }
  }
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
            onSubmit={handelOnSubmit}
            data-aos="fade-up"
            action=""
            className="flex flex-col gap-4 border rounded-sm p-4 mt-9 md:place-self-center md:w-[50%] "
          >
            <div className="flex justify-center items-center flex-col ">
              <h1 className="text-primary text-2xl font-semibold">
                Edite os dados{" "}
              </h1>
              <p className="text-sm">do seu perfil</p>
            </div>
            <div className=" font-black  md:text-4xl text-3xl text-white bg-primary rounded-full md:p-4 p-2 max-w-20 place-self-center max-h-20  flex justify-center items-center">
              {user.name.charAt(0) + user.lastname.charAt(0)}
            </div>
            <Label htmlFor="name">Nome</Label>
            <Input
              required
              placeholder="seu nome"
              type="text"
              id="name"
              defaultValue={user.name}
              name="name"
            />{" "}
            <Label htmlFor="lastname">Sobrenome</Label>
            <Input
              required
              placeholder="seu sobrenome  (opcional)"
              type="text"
              id="lastname"
              defaultValue={user.lastname}
              name="lastname"
            />{" "}
            <Button type="submit" className="text-md  h-[45px]">
              {processing ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {" "}
                  Salvar <Save />
                </>
              )}
            </Button>
          </form>
        </div>
      )}
    </main>
  );
}
