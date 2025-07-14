"use client";
import car from "@/assets/carinit.png";
import AcountCard from "@/components/AcountCard";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserHome() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
  const router = useRouter();
  return (
    <main className="w-full flex flex-col gap-3 p-4 pt-8 pb-30">
      {load ? (
        <div className="flex justify-center items-center min-h-[70dvh] w-full scale-75">
          <Loader type="Spinner" />
        </div>
      ) : (
        <>
          {" "}
          <div className="flex flex-col">
            <p className="text-md text-gray-500">Um dia incrível pra você</p>
            <h1 className="text-4xl font-semibold text-primary">Francisco!</h1>
          </div>
          <AcountCard amount="100000" number="957777993" />
          <div className="flex flex-col w-full  justify-center items-center">
            <Image className="h-70 w-80 lg:hidden object-contain" src={car} alt="car" />
            <div className="grid w-full lg:mt-6 grid-cols-2 gap-3 items-center">
              <Button
                className="h-[50px] text-white text-md md:w-[50%] w-full "
                onClick={() => {
                  router.push("/user/routes");
                }}
              >
                Encontrar rota
              </Button>{" "}
              <Button
                onClick={() => {
                  router.push("/user/routes/myroutes");
                }}
                variant={"outline"}
                className="h-[50px] border-primary text-primary text-md md:w-[50%] w-full "
              >
                Minhas Rotas
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
