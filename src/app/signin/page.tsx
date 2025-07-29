"use client";
import retangle from "@/assets/retangle.png";
import women from "@/assets/acess.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Eye,
  EyeClosed,
  LoaderIcon,
  MessageCircleCode,
  PhoneCall,
  User,
} from "lucide-react";
import UserService from "@/services/api/user/user.service";
import isValidPhone from "@/lib/isValiPhone";
import { toast } from "sonner";

import "aos/dist/aos.css";
import AOS from "aos";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
export default function SignInForm() {
  const service = new UserService("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const togglePassword = () => setShowPassword((prev) => !prev);
  async function handelOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const telefone = formdata.get("tel") as string;
    const password = formdata.get("password") as string;
    const name = formdata.get("name") as string;
    const lastname = formdata.get("lastname") as string;
    const email = formdata.get("email") as string;
    const ValidNumber = isValidPhone(telefone);
    if (!ValidNumber) {
      toast.error("Número inválido");
      return;
    } else if (!name || !password || !lastname) {
      toast.error("Preencha todos os campos");
      return;
    } else {
      setLoading(true);
      const data = await service.createAccount({
        password,
        telefone: ValidNumber,
        name,
        lastname,
        email,
      });
      if (data?.token && data.token.length > 0 && data.role.length > 0) {
        toast.success(data?.message);
        setTimeout(() => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          localStorage.setItem("id", String(data.id));
          router.push("/user");
          setLoading(false);
        }, 1000);
      } else {
        toast.error(data?.message);
        setLoading(false);
      }
    }
  }
  return (
    <main className="flex flex-col gap-4  items-center min-h-screen min-w-full pb-8 overflow-hidden">
      <div
        data-aos="zoom-in"
        className="w-full flex flex-col relative bg-red-10  "
      >
        <Image src={retangle} alt="" className="w-full max-h-[160px]" />
        <h1 className="absolute w-[60%] text-2xl left-7 top-[23%] text-white font-semibold">
          Olá ! Cadastre-se para começar
        </h1>
      </div>
      <form
        onSubmit={handelOnSubmit}
        data-aos="zoom-in"
        className="md:w-[50%] w-[85%] flex flex-col  place-self-center lg:-mt-20 lg:flex-row-reverse lg:items-center lg:h-full xl:w-[70%] lg:w-[95%] lg:pt-20"
      >
        <Image
          data-aos="zoom-in-down"
          src={women}
          alt=""
          className="object-cover -mt-3"
        />
        <div
          data-aos="zoom-in-left"
          className="flex flex-col gap-4 -mt-10 w-full"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <span data-aos="fade-up" className="flex flex-col gap-3">
              <Label className="text-md font-medium">Nome</Label>
              <div className="flex relative border-1 p-2 border-primary rounded-md justify-center items-center">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Seu nome"
                  minLength={2}
                  maxLength={15}
                  required
                  className="border-0 w-full h-full  shadow-none outline-none placeholder:text-[#8C8C8C] p text-sm"
                />
                <User color="#8C8C8C" size={18} />
              </div>
            </span>
            <span data-aos="fade-up" className="flex flex-col gap-3">
              <Label className="text-md font-medium">Sobrenome</Label>
              <div className="flex relative border-1 p-2 border-primary rounded-md justify-center items-center">
                <Input
                  type="text"
                  name="lastname"
                  id="lastname"
                  minLength={2}
                  maxLength={15}
                  placeholder="Seu sobrenome"
                  required
                  className="border-0 w-full h-full  shadow-none outline-none placeholder:text-[#8C8C8C] p text-sm"
                />
                <User color="#8C8C8C" size={18} />
              </div>
            </span>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <span data-aos="fade-up" className="flex flex-col gap-3">
              <Label className="text-md font-medium" htmlFor="tel">
                Telefone
              </Label>
              <div className="flex relative border-1 p-2 border-primary rounded-md justify-center items-center">
                <Input
                  type="tel"
                  name="tel"
                  id="tel"
                  placeholder="Número de telefone"
                  required
                  className="border-0 w-full h-full  shadow-none outline-none placeholder:text-[#8C8C8C] p text-sm"
                />
                <PhoneCall color="#8C8C8C" size={18} />
              </div>
            </span>
            <span data-aos="fade-up" className="flex flex-col gap-3">
              <Label className="text-md font-medium" htmlFor="tel">
                Email
              </Label>
              <div className="flex relative border-1 p-2 border-primary rounded-md justify-center items-center">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Seu email"
                  required
                  className="border-0 w-full h-full  shadow-none outline-none placeholder:text-[#8C8C8C] p text-sm"
                />
                <MessageCircleCode color="#8C8C8C" size={18} />
              </div>
            </span>
          </div>

          <span data-aos="fade-up" className="flex flex-col gap-3">
            <Label className="text-md font-medium" htmlFor="password">
              Senha
            </Label>
            <div className="flex relative border-1 p-2 border-primary rounded-md justify-center items-center">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="*******"
                required
                className="border-0 w-full h-full  shadow-none outline-none placeholder:text-[#8C8C8C] p text-sm"
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

          <div data-aos="fade-up" className="flex flex-col gap-4 mt-4">
            <Button
              type="submit"
              className="w-full bg-primary text-white border-0 h-[45px] text-md hover:bg-primary hover:text-white "
              variant={"outline"}
              disabled={loading}
            >
              {loading ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                "Criar conta"
              )}
            </Button>
            <Button
              variant="outline"
              type="reset"
              className="w-full bg-white text-primary border-1 border-primary h-[45px] text-md "
              onClick={() => {
                router.back();
              }}
            >
              Voltar
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
