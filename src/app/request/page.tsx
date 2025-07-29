"use client";

import "aos/dist/aos.css";
import AOS from "aos";
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
  MessageCircle,
  PhoneCall,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import UserService from "@/services/api/user/user.service";
import isValidPhone from "@/lib/isValiPhone";
import { toast } from "sonner";
import Link from "next/link";
export default function LoginForm() {
  const service = new UserService("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  async function handelOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const telefone = formdata.get("tel") as string;
    setLoading(true);
    const data = await service.RequestReset({
      telefone,
    });
    if (data?.found) {
      toast.success(data?.message);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      toast.error(data?.message);
      setLoading(false);
    }
  }
  return (
    <main className="flex flex-col gap-4  items-center min-h-screen min-w-full pb-8 overflow-hidden">
      <div
        data-aos="zoom-in"
        className="w-full  flex flex-col relative bg-red-10  "
      >
        <Image src={retangle} alt="" className="w-full max-h-[160px]" />
        <h1 className="absolute w-[60%] text-2xl left-7 top-[23%] text-white font-semibold">
          Recuperação se senha!
        </h1>
      </div>
      <form
        className="md:w-[50%] w-[85%] flex flex-col  place-self-center lg:-mt-20 lg:flex-row-reverse lg:items-center lg:h-full xl:w-[70%] lg:w-[95%] lg:pt-20"
        onSubmit={handelOnSubmit}
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
          <span className="flex flex-col gap-3" data-aos="fade-up">
            <Label className="text-md font-medium" htmlFor="tel">
              Telefone
            </Label>
            <div className="flex relative border-1 p-2 border-primary rounded-md justify-center items-center">
              <Input
                type="tel"
                name="tel"
                id="tel"
                placeholder="seu telefone"
                required
                className="border-0 w-full h-full  shadow-none outline-none placeholder:text-[#8C8C8C] p text-sm"
              />
              <PhoneCall color="#8C8C8C" size={18} />
            </div>
          </span>
          <div className="flex flex-col gap-4 mt-4" data-aos="fade-up">
            <Button
              type="submit"
              className="w-full bg-primary text-white border-0 h-[45px] text-md hover:bg-primary hover:text-white "
              variant={"outline"}
              disabled={loading}
            >
              {loading ? <LoaderIcon className="animate-spin" /> : "Recuperar"}
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
