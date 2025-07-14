import stars from "@/assets/stars.png";
import car from "@/assets/car2.png";
import Image from "next/image";
import IRoute from "@/types/route";
import { formatChatDate } from "@/services/dateformater";
import { Badge } from "../ui/badge";

interface prop {
  route: IRoute;
  status: "Concluído" | "Pendente" | "Cancelado";
}
export default function MyRoute({ route, status }: prop) {
  return (
    <figure className="flex border shadow flex-col gap-3 p-2 rounded-sm">
      <div className="flex  gap-5">
        <span className="bg-primary rounded-md flex justify-center items-center">
          <Image src={car} alt="car" />
        </span>
        <h1 className="text-xl font-semibold">
          {route.from} - {route.to}
        </h1>
      </div>
      <div className="font-semibold">{route.date}</div>

      <div className="flex gap-2  items-start h-15 overflow-hidden text-gray-600">
        <Image src={stars} alt="star" className="h-full object-contain" />
        <div className="flex justify-between flex-col h-full">
          <span>{route.users} Passageiros</span>
          <span>{route.distance}</span>
        </div>
      </div>
      <div>
        <Badge
          variant={
            status == "Cancelado"
              ? "destructive"
              : status == "Pendente"
              ? "outline"
              : "default"
          }
          className="p-1.5"
        >
          {status}
        </Badge>
      </div>
    </figure>
  );
}
