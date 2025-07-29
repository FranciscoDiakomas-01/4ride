"use client";
import "aos/dist/aos.css";
import AOS from "aos";
import retangle from "@/assets/retangle.png";
import women from "@/assets/acess.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Eye, EyeClosed, LoaderIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import UserService from "@/services/api/user/user.service";
import { toast } from "sonner";
export default function LoginForm() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenData = urlParams.get("token");
    if (!tokenData) {
      router.push("/");
    } else {
      setToken(tokenData);
    }
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  async function handelOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const password = formdata.get("password") as string;
    const password2 = formdata.get("password2") as string;
    if (password.length > 0 && password2.length > 0 && password == password2) {
      setLoading(true);
      const service = new UserService("");
      const updated = await service.ResetPassword({
        password,
        token: String(token),
      });
      if (updated.founded) {
        toast.success(updated.message ?? "Senha redefinida");
      } else {
        toast.error(updated.message ?? "Erro ao redefinir a senha!");
      }
      setTimeout(() => {
        setLoading(false);
        router.push("/login");
      }, 1500);
      return;
    } else {
      toast.error("As senhas devem ser iguais");
      return;
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
          Redefini a sua senha
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
            <Label className="text-md font-medium" htmlFor="password">
              Nova senha
            </Label>
            <div className="flex relative border-1 p-2 border-primary rounded-md justify-center items-center">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="*******"
                minLength={8}
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
          <span className="flex flex-col gap-3" data-aos="fade-up">
            <Label className="text-md font-medium" htmlFor="password">
              Confirma a senha
            </Label>
            <div className="flex relative border-1 p-2 border-primary rounded-md justify-center items-center">
              <Input
                type={showPassword ? "text" : "password"}
                name="password2"
                id="password2"
                placeholder="*******"
                minLength={8}
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

          <div className="flex flex-col gap-4 mt-4" data-aos="fade-up">
            <Button
              type="submit"
              className="w-full bg-primary text-white border-0 h-[45px] text-md hover:bg-primary hover:text-white "
              variant={"outline"}
              disabled={loading}
            >
              {loading ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                "Redefinir senha"
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
