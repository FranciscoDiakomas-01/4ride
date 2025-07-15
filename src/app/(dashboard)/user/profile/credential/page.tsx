"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, EyeClosed, Save } from "lucide-react";
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
    <main className="flex flex-col gap-4">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold ">
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
            action=""
            className="flex flex-col gap-4 border rounded-sm p-4 mt-9 md:place-self-center md:w-[50%] "
          >
            <div className="flex justify-center items-center flex-col ">
              <h1 className="text-primary text-2xl font-semibold">
                Edite as credencias{" "}
              </h1>
              <p className="text-sm">da sua conta</p>
            </div>
            <span className="flex flex-col gap-3">
              <Label className="text-md font-medium" htmlFor="password">
                Senha actual
              </Label>
              <div className="flex relative  items-center gap-2">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*******"
                  required
                  className="w-full   placeholder:text-[#8C8C8C] p text-sm"
                />
                <EyeClosed color="#8C8C8C" size={18} />
              </div>
            </span>
            <span className="flex flex-col gap-3">
              <Label className="text-md font-medium" htmlFor="npassword">
                Nova senha
              </Label>
              <div className="flex relative  items-center gap-2">
                <Input
                  type="password"
                  name="npassword"
                  id="npassword"
                  placeholder="*******"
                  required
                  className="w-full   placeholder:text-[#8C8C8C] p text-sm"
                />
                <EyeClosed color="#8C8C8C" size={18} />
              </div>
            </span>
            <span className="flex flex-col gap-3">
              <Label className="text-md font-medium" htmlFor="vpassword">
                Cofirme a senha
              </Label>
              <div className="flex relative  items-center gap-2">
                <Input
                  type="password"
                  name="vpassword"
                  id="vpassword"
                  placeholder="*******"
                  required
                  className="w-full   placeholder:text-[#8C8C8C] p text-sm"
                />
                <EyeClosed color="#8C8C8C" size={18} />
              </div>
            </span>
            <Button className="text-md  h-[45px]">
              Salvar <Save />{" "}
            </Button>
          </form>
        </div>
      )}
    </main>
  );
}
