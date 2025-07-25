"use client";
import car from "@/assets/carinit.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function InitialScreen() {
  const router = useRouter();
  return (
    <main className="h-screen px-4 w-screen flex flex-col justify-center items-center">
      <article className="flex flex-col gap-3 md:gap-5 justify-center items-center">
        <Image data-aos="zoom-in" src={car} alt="Carro" />
        <h1 className="text-primary font-bold text-2xl" data-aos="fade-up">
          Bem-vindo ao 4Ride
        </h1>
        <small
          data-aos="fade-up"
          className="text-[#8C8C8C] text-center text-sm"
        >
          Encontre pessoas próximas de ti e dividam o táxi pagando menos
        </small>
        <div className="flex md:w-[60%] justify-center  w-full md:flex-row flex-col gap-4">
          <Button
            variant={"outline"}
            data-aos="fade-right"
            className="text-white border-0 h-[45px] font-semibold bg-primary rounded-[8px] w-full hover:bg-primary hover:text-white"
            onClick={() => {
              router.push("/signin");
            }}
          >
            Criar conta
          </Button>{" "}
          <Button
            variant={"outline"}
            data-aos="fade-left"
            className="text-primary  h-[45px] border-primary font-semibold bg-white w-full rounded-[8px]"
            onClick={() => {
              router.push("/");
            }}
          >
            Acessar conta
          </Button>
        </div>
      </article>
    </main>
  );
}
