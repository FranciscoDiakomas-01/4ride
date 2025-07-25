"use client";
import IRoute from "@/types/route";
import { LucideLocationEdit } from "lucide-react";
import car from "@/assets/car.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import clsx from "clsx";
interface props {
  item: IRoute;
  showDescription?: boolean;
}

export default function Route({ item, showDescription = true }: props) {
  const router = useRouter();
  return (
    <figure
      data-aos="fade-up"
      className="border-green-300 border-1 rounded-md p-3 bg-green-100/50 flex flex-col gap-5 overflow-hidden"
    >
      <span className="flex gap-4 justify-between">
        <div className="w-[80%] flex flex-col gap-4">
          <h1
            className="text-gray-900 font-medium
           text-xl"
          >
            {item.from} - {item.to}
          </h1>
          <div className="grid grid-cols-3 gap-1 text-nowrap">
            <p className="border-r-2 ">{item.from}</p>
            <p className="border-r-2">{item.to}</p>
            <p>{item.users} Pessoas</p>
          </div>
          <p className="flex gap-1 items-center text-gray-900 opacity-70 text-nowrap">
            <LucideLocationEdit size={18} />
            {item.distance} ( {item.status == "OPEN" ? "aberta" : "fechada"} )
          </p>
        </div>
        <Image className="h-13 w-13 object-contain" src={car} alt="car" />
      </span>

      <figcaption className="grid grid-cols-2 gap-4">
        <Button
          variant={"outline"}
          className={clsx("w-full  h-[45px] text-md border-0 ", {
            "text-green-500 bg-transparent border-green-500/50 border hover:bg-transparent hover:text-green-500":
              showDescription,
          })}
          onClick={() => {
            const myId = localStorage.getItem("id");
            if (!myId) {
              toast.error("Você deve estar logado");
            } else {
              toast.success("Bem vindo á rota!");
              router.push(`/user/routes/chat/${item.id}`);
            }
          }}
        >
          Entrar no chat
        </Button>
        {showDescription && (
          <Button
            className="w-full  h-[45px] text-md"
            onClick={() => {
              router.push(`/user/routes/${item.id}`);
            }}
          >
            Detalhes
          </Button>
        )}
      </figcaption>
    </figure>
  );
}

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";
export function RouteAdmin({ item, showDescription = true }: props) {
  const [rout, setRout] = useState(item);
  const router = useRouter();
  return (
    <figure
      data-aos="fade-up"
      className=" border-1 rounded-md p-3 flex flex-col gap-5 overflow-hidden"
    >
      <span className="flex gap-4 justify-between">
        <div className="w-[80%] flex flex-col gap-4">
          <h1
            className="text-gray-900 font-medium
           text-xl"
          >
            {rout.from} - {rout.to}
          </h1>
          <div className="grid grid-cols-3 gap-1 text-nowrap">
            <p className="border-r-2 ">{rout.from}</p>
            <p className="border-r-2">{rout.to}</p>
            <p>{rout.users} Pessoas</p>
          </div>
          <p className="flex gap-1 items-center text-gray-900 opacity-70 text-nowrap">
            <LucideLocationEdit size={18} />
            {rout.distance} de distância ( {rout.status} )
          </p>
        </div>
        <Image className="h-13 w-13 object-contain" src={car} alt="car" />
      </span>

      {showDescription && (
        <Button
          className="lg:w-[40%] w-full  h-[45px] text-md"
          onClick={() => {
            router.push(`/admin/routes/${rout.id}`);
          }}
        >
          Detalhes
        </Button>
      )}
      {!showDescription && (
        <Switch
          onCheckedChange={() => {
            setRout((prev) => ({
              ...prev,
              status: prev.status == "Aberta" ? "Fechada" : "Aberta",
            }));
          }}
          checked={rout.status == "Aberta"}
        />
      )}
    </figure>
  );
}
