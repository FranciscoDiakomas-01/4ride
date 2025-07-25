import IRoute from "@/types/route";
import Image from "next/image";
import stars from "@/assets/stars.png";
import { Button } from "../ui/button";
import { Trash, Verified } from "lucide-react";

interface IUser {
  id: string;
  lastname: string;
  name: string;
  points: string;
  telefone: string;
  role: string;
}
interface prop {
  user: IUser;
  route: IRoute;
  createdAt: string;
}
export default function UserRoute({ user, route, createdAt }: prop) {
  return (
    <figure
      data-aos="fade-up"
      data-aos-duration="1000"
      className="flex flex-col gap-3 border border-primary p-3 rounded-md"
    >
      <span className="flex gap-2">
        <div className="flex justify-center items-center p-2  bg-primary uppercase  text-white font-black rounded-full">
          {user.name?.charAt(0)} {user.lastname?.charAt(0)}
        </div>
        <span className="flex flex-col">
          <h1 className="text-md font-semibold">
            {user.name} {user.lastname}
          </h1>
        </span>
      </span>

      <div className="flex gap-2  items-start h-15 overflow-hidden text-gray-600">
        <Image src={stars} alt="stars" className="h-full object-contain" />
        <div className="flex justify-between flex-col h-full">
          <p>{user.telefone}</p>
          <p>{route.from + " - " + route.to}</p>
        </div>
      </div>
    </figure>
  );
}

export function UserRouteAdmin({ user, route, createdAt }: prop) {
  return (
    <figure
      id={`user-${user.id}`}
      data-aos="fade-up"
      data-aos-duration="1000"
      className="flex flex-col gap-3 border border-primary p-3 rounded-md"
    >
      <span className="flex gap-2">
        <img
          width={60}
          height={60}
          className="rounded-md"
          src={user.profile}
          alt={user.fullname}
        />
        <span className="flex flex-col">
          <h1 className="text-md font-semibold">{user.fullname}</h1>
          <small className="text-sm text-gray-500">{user.tel}</small>
          {user.status == "Activo" && (
            <div className="flex justify-center items-center p-1 rounded-sm text-[12px] bg-primary text-white w-4.5 h-4.5">
              <Verified size={15} />
            </div>
          )}
        </span>
      </span>

      <div className="flex gap-2  items-start h-15 overflow-hidden text-gray-600">
        <Image src={stars} alt="stars" className="h-full object-contain" />
        <div className="flex justify-between flex-col h-full">
          <p>{createdAt}</p>
          <p>{route.from + " - " + route.to}</p>
        </div>
      </div>

      <div className="flex gap-2 -mt-2 items-start h-15 overflow-hidden text-gray-600">
        <Image src={stars} alt="stars" className="h-full object-contain" />
        <div className="flex justify-between flex-col h-full">
          <p>{Number(user.cash).toLocaleString("pt")} kz de crédito</p>
          <p>{user.points} Pontos</p>
        </div>
      </div>

      <Button
        variant={"outline"}
        className="text-primary font-normal lg:w-[50%] w-full"
        onClick={() => {
          const id = `user-${user.id}`;

          const element = document.getElementById(id);

          if (element) {
            element.style.display = "none";
          }
        }}
      >
        Remover da rota
        <Trash />
      </Button>
    </figure>
  );
}
