"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserNumber() {
  const router = useRouter();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
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
              id="tel"
              name="tel"
            />{" "}
            <Label htmlFor="tel1">Novo número</Label>
            <Input
              required
              placeholder="9xx xxx xxx"
              type="tel"
              id="tel1"
              name="tel1"
            />{" "}
            <Label htmlFor="tel2">Confirma o número</Label>
            <Input
              required
              placeholder="9xx xxx xxx"
              type="tel"
              id="tel2"
              name="tel2"
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
