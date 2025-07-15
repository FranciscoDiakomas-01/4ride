"use client";

import "aos/dist/aos.css";
import AOS from "aos";
import retangle from "@/assets/retangle.png";
import women from "@/assets/acess.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { EyeClosed, PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function LoginForm() {
  const router = useRouter();

    useEffect(() => {
      AOS.init({
        duration: 800,
        once: true,
      });
    }, []);
  return (
    <main className="flex flex-col gap-4  items-center min-h-screen min-w-full pb-8 overflow-hidden">
      <div
        data-aos="zoom-in"
        className="w-full  flex flex-col relative bg-red-10  "
      >
        <Image src={retangle} alt="" className="w-full max-h-[160px]" />
        <h1 className="absolute w-[60%] text-2xl left-7 top-[23%] text-white font-semibold">
          Olá! Faça login para começar
        </h1>
      </div>
      <form className="md:w-[50%] w-[85%] flex flex-col  place-self-center lg:-mt-20 lg:flex-row-reverse lg:items-center lg:h-full xl:w-[70%] lg:w-[95%] lg:pt-20">
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
          <span className="flex flex-col gap-3" data-aos="fade-up">
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
          <span className="flex flex-col gap-3" data-aos="fade-up">
            <Label className="text-md font-medium" htmlFor="password">
              Senha
            </Label>
            <div className="flex relative border-1 p-2 border-primary rounded-md justify-center items-center">
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                required
                className="border-0 w-full h-full  shadow-none outline-none placeholder:text-[#8C8C8C] p text-sm"
              />
              <EyeClosed color="#8C8C8C" size={18} />
            </div>
          </span>

          <div className="flex flex-col gap-4 mt-4" data-aos="fade-up">
            <Button
              data-aos="fade-right"
              type="submit"
              className="w-full bg-primary text-white border-0 h-[45px] text-md hover:bg-primary hover:text-white "
              variant={"outline"}
            >
              Acessar conta
            </Button>
            <Button
              data-aos="fade-left"
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
