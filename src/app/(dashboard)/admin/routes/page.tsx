"use client";
import Loader from "@/components/Loader";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { IStats } from "@/types/stats";
import {
  AlertCircle,
  ArrowDown,
  CheckCircle,
  Heart,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import IRoute from "@/types/route";
import { mockRoutes } from "@/constants/routes.mock";
import { RouteAdmin } from "@/components/Route";
import Notfound from "@/components/Notfound";
import RouteService from "@/services/api/Route/route.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Users() {
  const [stats, seTstats] = useState<IStats[]>([]);
  const [load, setLoad] = useState(true);

  const [routes, setRoutes] = useState<IRoute[]>([]);
  const router = useRouter();

  let service: RouteService;

  useEffect(() => {
    const myId = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    async function get() {
      if (!token || role != "ADMIN" || !myId) {
        toast.info("Deves estar logado");
        router.push("/");
        return;
      }

      service = new RouteService(token);
      const data = await service.getAllActivesRoute();

      if (!data.fouded) {
        toast.error(data.message);
        return;
      }

      const formated = data.routes.map((item) => ({
        date: item.createdAt,
        distance: item.way,
        from: item.from,
        to: item.to,
        id: item.id,
        status: item.status,
        users: item.users.length,
      })) as IRoute[];

      setRoutes(formated);
    }

    get();
    const interval = setInterval(get, 3000);
    const timeout = setTimeout(() => setLoad(false), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="p-3 flex flex-col gap-5">
      <span className="grid gap-4 mt-4 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
        {Array.isArray(stats) &&
          stats.length > 0 &&
          stats.map((item, key) => (
            <Stats showBtn={false} iskz={false} stats={item} key={key} />
          ))}
      </span>
      {load ? (
        <div className="flex w-full justify-center items-center scale-75 min-h-[50dvh]">
          <Loader type="Spinner" />
        </div>
      ) : (
        <>
          {Array.isArray(routes) && routes.length > 0 ? (
            <aside className="grid grid-cols-1  md:grid-cols-2 gap-6 mt-3 mb-30">
              {routes.map((route, index) => (
                <RouteAdmin item={route} key={index} />
              ))}
            </aside>
          ) : (
            <></>
          )}
        </>
      )}
    </main>
  );
}
