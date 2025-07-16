"use client";
import map from "@/assets/map.png";
import Loader from "@/components/Loader";
import { RouteAdmin } from "@/components/Route";
import { Button } from "@/components/ui/button";
import  { UserRouteAdmin } from "@/components/UserRoute";
import { mockRoutes } from "@/constants/routes.mock";
import { mockUsers } from "@/constants/users";
import IUser from "@/types/user";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RouterDescription() {
  const { id } = useParams();
  const route = mockRoutes.find((item) => {
    
    return item && item.id == id;
  });
  const [users, setUsers] = useState<IUser[]>([]);
  const router = useRouter();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setUsers(mockUsers);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
  return (
    <main className="flex flex-col gap-5">
      {load ? (
        <div className="scale-75 flex justify-center items-center h-screen">
          <Loader type="Spinner" />
        </div>
      ) : (
        <>
          {route ? (
            <div className="pb-30">
              <Image
                data-aos="fade"
                src={map}
                alt="map"
                className="w-full object-contain md:object-cover md:h-[300px]"
              />
              <div className="flex flex-col gap-4 px-3 ">
                <h1 className="text-xl font-semibold mt-5">Detalhes</h1>
                <div className="md:w-[50%] w-full">
                  {route && <RouteAdmin showDescription={false} item={route} />}
                  </div>
                

                {Array.isArray(users) && users.length > 0 ? (
                  <>
                    <h1 className="text-xl font-semibold">Participantes</h1>
                    <span className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6">
                      {users.map((item, index) => (
                        <UserRouteAdmin
                          createdAt="Desde as 14 horas e 5 min"
                          route={route}
                          user={item}
                          key={index}
                        />
                      ))}
                    </span>
                  </>
                ) : (
                  <h1 className="text-xl font-semibold">Sem participantes</h1>
                )}
                <div
                  className="grid lg:w-[40%] w-full md:grid-cols-2 gap-6 grid-cols-1"
                  data-aos="fade"
                >
                  <Button
                    onClick={() => {
                      router.back();
                    }}
                    className="h-[45px] text-md"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={() => {
                    }}
                    className="h-[45px] text-md bg-red-500 hover:bg-red-500"
                  >
                    Cancelar rota  <LogOut />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 justify-center items-center h-screen">
              <h1 className="text-xl font-semibold">Rota não encontrada</h1>
              <Button
                onClick={() => {
                  router.back();
                }}
                className="h-[45px] text-md"
              >
                Voltar
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
