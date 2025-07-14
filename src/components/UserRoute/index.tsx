
import IRoute from "@/types/route";
import IUser from "@/types/user";
import Image from "next/image";
import stars from "@/assets/stars.png";
interface prop {
  user: IUser;
  route: IRoute;
  createdAt: string;
}
export default function UserRoute({ user, route, createdAt }: prop) {
  return (
    <figure className="flex flex-col gap-3 border border-primary p-3 rounded-md">
      <span className="flex gap-2">
        <img width={60} height={60} className="rounded-md" src={user.profile} alt={user.fullname} />
        <span className="flex flex-col">
          <h1 className="text-md font-semibold">{user.fullname}</h1>
          <small className="text-sm text-gray-500">{user.tel}</small>
        </span>
      </span>

      <div className="flex gap-2  items-start h-15 overflow-hidden text-gray-600">
        <Image src={stars} alt="stars" className="h-full object-contain" />
        <div className="flex justify-between flex-col h-full">
          <p>{createdAt}</p>
          <p>{route.from + " - " + route.to}</p>
        </div>
      </div>
    </figure>
  );
}
