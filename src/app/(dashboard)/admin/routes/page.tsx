"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import  { RouteAdmin } from "@/components/Route";
import Notfound from "@/components/Notfound";

export default function Users() {
  const [stats, seTstats] = useState<IStats[]>([]);
  const [load, setLoad] = useState(true);

  const [myroutes, setMyroutes] = useState<IRoute[]>([...mockRoutes]);
  const [active, setACtive] = useState("1");
  useEffect(() => {
    seTstats([
      {
        icon: <Heart />,
        title: "Rotas",
        value: "1000",
      },
      {
        icon: <CheckCircle />,
        title: "Pendentes",
        value: "1000",
      },
      {
        icon: <AlertCircle />,
        title: "Concluídas",
        value: "1000",
      },
      {
        icon: <AlertCircle />,
        title: "Canceladas",
        value: "1000",
      },
    ]);

    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);

   useEffect(() => {
     setLoad(true);
     setTimeout(() => {
       setLoad(false);
     }, 1000);
   }, [active]);
  return (
    <main className="p-3 flex flex-col gap-5">
      <header
        data-aos="fade-up"
        className="flex md:flex-row flex-col justify-end gap-5 md:items-center w-full"
      >
        <Button>
          Exportar dados <ArrowDown />
        </Button>
      </header>

      <span className="grid gap-4 mt-4 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
        {Array.isArray(stats) &&
          stats.length > 0 &&
          stats.map((item, key) => (
            <Stats showBtn={false} iskz={false} stats={item} key={key} />
          ))}
      </span>
      <>
        <Tabs defaultValue="1" className="w-full px-2">
          <TabsList className="lg:w-[50%] w-full h-12  bg-white gap-2">
            <TabsTrigger
              value="1"
              onClick={() => {
                setLoad(true);
                setACtive("1");
              }}
            >
              Concluídas
            </TabsTrigger>
            <TabsTrigger
              value="2"
              onClick={() => {
                setLoad(true);
                setACtive("2");
              }}
            >
              Pendentes
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setLoad(true);
                setACtive("3");
              }}
              value="3"
            >
              Canceladas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="1">
            {load ? (
              <div className="flex w-full justify-center items-center scale-75 min-h-[50dvh]">
                <Loader type="Spinner" />
              </div>
            ) : (
              <>
                {Array.isArray(myroutes) && myroutes.length > 0 ? (
                  <aside className="grid grid-cols-1  md:grid-cols-2 gap-6 mt-3 mb-30">
                    {myroutes.map((route, index) => (
                      <RouteAdmin item={route} key={index} />
                    ))}
                  </aside>
                ) : (
                  <></>
                )}
              </>
            )}
          </TabsContent>
          <TabsContent value="2">
            {load ? (
              <div className="flex w-full justify-center items-center scale-75 min-h-[50dvh]">
                <Loader type="Spinner" />
              </div>
            ) : (
              <>
                {Array.isArray(myroutes) && myroutes.length > 0 ? (
                  <aside className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3 mb-30">
                    {myroutes.map((route, index) => (
                      <RouteAdmin item={route} key={index} />
                    ))}
                  </aside>
                ) : (
                  <></>
                )}
              </>
            )}
          </TabsContent>
          <TabsContent value="3">
            {load ? (
              <div className="flex w-full justify-center items-center scale-75 min-h-[50dvh]">
                <Loader type="Spinner" />
              </div>
            ) : (
              <>
                {Array.isArray(myroutes) && myroutes.length > 0 ? (
                  <aside className="grid grid-cols-1  md:grid-cols-2 gap-6 mt-3 mb-30">
                    {myroutes.map((route, index) => (
                      <RouteAdmin item={route} key={index} />
                    ))}
                  </aside>
                ) : (
                  <Notfound message="Ainda não tem nenhum registro" />
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </>
    </main>
  );
}
