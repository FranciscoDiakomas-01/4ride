import IRoute from "@/types/route";
import { LucideLocationEdit } from "lucide-react";
import car from "@/assets/car.png";
import Image from "next/image";
import { Button } from "../ui/button";
interface props {
  item: IRoute;
}

export default function Route({ item }: props) {
  return (
    <figure className="border-green-300 border-1 rounded-md p-3 bg-green-100/50 flex flex-col gap-5">
      <span className="flex gap-4 justify-between">
        <div className="w-[80%] flex flex-col gap-4">
          <h1
            className="text-gray-900 font-medium
           text-xl"
          >
            {item.from} - {item.to}
          </h1>
          <div className="grid grid-cols-3 gap-1 text-nowrap">
            <p className="border-r-2 w-[65px]">{item.from}</p>
            <p className="border-r-2 w-[60px]">{item.to}</p>
            <p>{item.users} Pessoas</p>
          </div>
          <p className="flex gap-1 items-center text-gray-900 opacity-70 text-nowrap">
            <LucideLocationEdit size={18} />
            {item.distance} de distância ( {item.status} )
          </p>
        </div>
        <Image className="h-20 w-20 object-contain" src={car} alt="car" />
      </span>

      <figcaption className="grid grid-cols-2 gap-4">
        <Button className="w-full text-green-500 h-[45px] text-md bg-transparent border-green-500/50 border hover:bg-transparent hover:text-green-500">
          Entrar
        </Button>
        <Button className="w-full  h-[45px] text-md">Detalhes</Button>
      </figcaption>
    </figure>
  );
}
