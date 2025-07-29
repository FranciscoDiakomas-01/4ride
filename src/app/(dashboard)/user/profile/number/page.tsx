"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import isValidPhone from "@/lib/isValiPhone";
import UserService from "@/services/api/user/user.service";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserNumber() {
  const router = useRouter();
  const [load, setLoad] = useState(true);

  let servive: UserService;
  const [processing, setProceccing] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);

  async function handelOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formata = new FormData(e.currentTarget);
    const oldPhone = formata.get("oldPhone") as string;
    const newPhone = formata.get("newPhone") as string;

    if (!oldPhone || !newPhone) {
      toast.error("Preenche Todos os campos");
      return;
    } else {
      if (isValidPhone(oldPhone) && isValidPhone(newPhone)) {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Você precisa estar logado");
          router.push("/");
          return;
        } else {
          setProceccing(true);
          servive = new UserService(token);
          const data = await servive.updateTelefone({
            oldPhone: String(isValidPhone(oldPhone)),
            newPhone: String(isValidPhone(newPhone)),
          });
          if (data.updated) {
            toast.success(data.message);
            setTimeout(() => {
              location.reload();
            }, 3000);
          } else {
            toast.error(data.message);
          }

          setTimeout(() => {
            setProceccing(false);
          }, 2000);
        }
      }
    }
  }
  return (
    <main className="flex flex-col gap-4 pb-30">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold z-[95945]">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1>Número</h1>
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
                Edite o número{" "}
              </h1>
              <p className="text-sm">da sua conta</p>
            </div>
            <Label htmlFor="tel">Número actual</Label>
            <Input
              required
              placeholder="9xx xxx xxx"
              type="tel"
              id="oldPhone"
              name="oldPhone"
            />{" "}
            <Label htmlFor="tel1">Novo número</Label>
            <Input
              required
              placeholder="9xx xxx xxx"
              type="tel"
              id="newPhone"
              name="newPhone"
            />{" "}
            <Button className="text-md  h-[45px]">
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
