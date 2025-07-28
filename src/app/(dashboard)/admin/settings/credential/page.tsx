"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import isValidPhone from "@/lib/isValiPhone";
import UserService from "@/services/api/user/user.service";
import { ArrowLeft, Eye, EyeClosed, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserNumber() {
  const router = useRouter();
  const [load, setLoad] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  let servive: UserService;
  const [processing, setProceccing] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role != "ADMIN") {
      toast.info("Deves estar logado");
      router.push("/");
      return;
    }
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);

  async function handelOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formata = new FormData(e.currentTarget);
    const password = formata.get("password") as string;
    const npassword = formata.get("npassword") as string;

    if (!password || !npassword) {
      toast.error("Preenche Todos os campos");
      return;
    } else {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log(token);
        toast.error("Você precisa estar logado");
        router.push("/");
        return;
      } else {
        setProceccing(true);
        servive = new UserService(token);
        const data = await servive.updatePassword({
          oldPassword: password,
          newPassword: npassword,
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
  return (
    <main className="flex flex-col gap-4 pb-30">
    
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
                Edite as Crendênciais{" "}
              </h1>
              <p className="text-sm">da sua conta</p>
            </div>
            <span className="flex flex-col gap-3">
              <Label className="text-md font-medium" htmlFor="password">
                Senha actual
              </Label>
              <div className="flex relative  items-center gap-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="*******"
                  required
                  className="w-full   placeholder:text-[#8C8C8C] p text-sm"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-2"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <Eye color="#8C8C8C" size={18} />
                  ) : (
                    <EyeClosed color="#8C8C8C" size={18} />
                  )}
                </button>
              </div>
            </span>
            <span className="flex flex-col gap-3">
              <Label className="text-md font-medium" htmlFor="npassword">
                Nova senha
              </Label>
              <div className="flex relative  items-center gap-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="npassword"
                  id="npassword"
                  placeholder="*******"
                  required
                  minLength={8}
                  className="w-full   placeholder:text-[#8C8C8C] p text-sm"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-2"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <Eye color="#8C8C8C" size={18} />
                  ) : (
                    <EyeClosed color="#8C8C8C" size={18} />
                  )}
                </button>
              </div>
            </span>

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
