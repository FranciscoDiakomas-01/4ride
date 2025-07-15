"use client";

import Loader from "@/components/Loader";
import Route from "@/components/Route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockRoutes } from "@/constants/routes.mock";
import IRoute from "@/types/route";
import { ArrowLeftIcon, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Router() {
  const [load, setLoad] = useState(true);
  const [routes, setRoutes] = useState<IRoute[]>(mockRoutes);

  useEffect(() => {
    setLoad(true);

    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
  const router = useRouter();
  return (
    <main className="flex flex-col gap-9 ">
      <div className="bg-white shadow p-4 py-5 sticky top-0 flex gap-3 items-center z-[95945]">
        <ArrowLeftIcon
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <p className="font-semibold">Grupos de Rotas</p>
      </div>
      <form action="" className="px-3 flex flex-col gap-4">
        <div
          className="flex gap-2 border-1 p-1.5 rounded-md"
          data-aos="fade-right"
        >
          <div
            className="flex justify-center items-center rounded-full
            bg-gray-100 p-2 text-gray-600"
          >
            <Search size={17} />
          </div>
          <Input
            placeholder="Localização"
            id="location"
            name="location"
            type="text"
            className="w-full h-full border-0 shadow-none outline-0 outline-none"
          />
        </div>
        <span
          data-aos="fade-right"
          className="flex items-center gap-4 justify-between"
        >
          <div className="flex gap-2 border-1 p-1.5 rounded-md w-[85%]">
            <div
              className="flex justify-center items-center rounded-full
            bg-gray-100 p-2 text-gray-600"
            >
              <Search size={17} />
            </div>

            <Input
              placeholder="Localização"
              id="location"
              name="location"
              type="text"
              className="w-full h-full border-0 shadow-none outline-0 outline-none"
            />
          </div>
          <Button className="w-[15%]">
            <Search />
          </Button>
        </span>
      </form>

      {load ? (
        <div className="scale-75 w-full h-[40dvh] flex justify-center items-center">
          <Loader type="Spinner" />
        </div>
      ) : (
        <aside className="px-3">
          {Array.isArray(routes) && routes.length > 0 ? (
            <div className="grid xl:grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 mb-30 ">
              {routes.map((item, key) => (
                <Route item={item} key={key} />
              ))}
            </div>
          ) : (
            <></>
          )}
        </aside>
      )}
    </main>
  );
}
