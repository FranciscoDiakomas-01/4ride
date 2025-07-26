"use client";
import car from "@/assets/carinit.png";
import AcountCard from "@/components/AcountCard";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import UserService from "@/services/api/user/user.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserHome() {
  const [load, setLoad] = useState(true);

  const router = useRouter();
  let servive: UserService;
  const [user, setUser] = useState({
    name: "string",
    lastname: "string",
    points: 0,
    telefone: "string",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    async function get() {
      if (!token) {
        console.log(token);
        toast.error("Você precisa estar logado");
        router.push("/");
        return;
      } else {
        servive = new UserService(token);
        const data = await servive.GetMyData();
        if (!data?.found) {
          toast.info(data?.message);
        } else {
          toast.success("Benvido " + data.name);
          setUser({
            ...data,
          });
        }
      }
    }

    get();
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);
  return (
    <main className="w-full overflow-x-hidden flex flex-col gap-3 p-4 pt-8 pb-30">
      {load ? (
        <div className="flex justify-center items-center min-h-[70dvh] w-full scale-75">
          <Loader type="Spinner" />
        </div>
      ) : (
        <>
          {" "}
          <div className="flex flex-col">
            <p className="text-md text-gray-500" data-aos="fade-left">
              Tenha um ótimo dia com a gente!
            </p>
            <h1
              className="text-4xl font-semibold text-primary text-wrap"
              data-aos="fade-right"
            >
              {user.name + " " + user.lastname}
            </h1>
          </div>
          <AcountCard amount={String(user.points)} number={user.telefone} />
          <div className="flex flex-col w-full  justify-center items-center">
            <Image
              className="h-70 w-80 lg:hidden object-contain"
              src={car}
              alt="car"
              data-aos="fade-up"
            />
            <div className="grid w-full  lg:mt-6  gap-3  ">
              <Button
                data-aos="fade-right"
                className="h-[50px] lg:w-[30%]  text-white text-md"
                onClick={() => {
                  router.push("/user/routes");
                }}
              >
                Encontrar rota
              </Button>{" "}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
