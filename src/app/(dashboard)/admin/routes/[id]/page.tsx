"use client";

import Loader from "@/components/Loader";
import Map from "@/components/Map/map";
import Route from "@/components/Route";
import { Button } from "@/components/ui/button";
import UserRoute, { UserRouteAdmin } from "@/components/UserRoute";
import RouteService from "@/services/api/Route/route.service";
import IRoute from "@/types/route";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type MapRouteProps = {
  from: { lat: number; lng: number };
  to: { lat: number; lng: number };
};
export default function RouterDescription() {
  let service: RouteService;
  const { id } = useParams();

  const [coord, setCoors] = useState<MapRouteProps>({
    from: { lat: 0, lng: 0 },
    to: { lat: 0, lng: 0 },
  });
  const [route, setRoute] = useState<IRoute>({
    date: "",
    distance: "",
    from: "",
    id: 0,
    status: "",
    to: "",
    users: 0,
  });

  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const myId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    async function get() {
      if (!token || !myId) {
        toast.error("Você precisa estar logado");
        router.push("/");
        return;
      }
      service = new RouteService(token);
      const data = await service.getRouteById(Number(id));
      if (!data.founded) {
        toast.length == 0 && toast.error("Rota não encontrada");
        return;
      } else {
        const formatedRoute: IRoute = {
          date: data.route.createdAt,
          distance: data.route.way,
          from: data.route.from,
          id: data.route.id,
          status: data.route.status,
          to: data.route.to,
          users: data.route.users.length,
        };
        try {
          const x = JSON.parse(data.route.x) as {
            latitude: number;
            longitude: number;
          };
          const y = JSON.parse(data.route.x) as {
            latitude: number;
            longitude: number;
          };
          setCoors({
            from: {
              lat: x.latitude,
              lng: x.longitude,
            },
            to: {
              lat: y.latitude,
              lng: y.longitude,
            },
          });
          setRoute(formatedRoute);
          const usersWithouAdmin = data.users.filter((item) => {
            return item && item.id != myId;
          })
          setUsers(usersWithouAdmin);
        } catch (error) {
          toast.error(String(error));
        }
      }
    }
    get();
    const timeout = setTimeout(() => setLoad(false), 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <main className="flex justify-center flex-col gap-4">
      {load ? (
        <div className="scale-75 flex justify-center items-center h-screen">
          <Loader type="Spinner" />
        </div>
      ) : (
        <>
          {route ? (
            <div className="pb-30">
              <Map from={coord.from} to={coord.to} />
              <div className="flex flex-col gap-4 px-3 ">
                <h1 className="text-xl font-semibold mt-5">Detalhes</h1>
                {route && <Route isAdmin={true} showDescription={false} item={route} />}

                {Array.isArray(users) && users.length > 0 ? (
                  <>
                    <h1 className="text-xl font-semibold">Participantes</h1>
                    <span className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6">
                      {users.map((item, index) => (
                        <UserRouteAdmin
                          createdAt={new Date(route.date).toDateString()}
                          route={route}
                          user={item}
                          key={index}
                        />
                      ))}
                    </span>
                  </>
                ) : (
                  <h1 className="text-xl font-semibold">
                    Sem participantes {users.length}{" "}
                  </h1>
                )}
                <div
                  className="grid md:grid-cols-3 gap-6 grid-cols-1"
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
