"use client";
import Loader from "@/components/Loader";
import Notfound from "@/components/Notfound";
import MyRoute from "@/components/Route/myRoute";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRoutes } from "@/constants/routes.mock";
import IRoute from "@/types/route";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyRoutes() {
  const router = useRouter();
  const [load, setLoad] = useState(true);
  const [active, setACtive] = useState("1");
  const [myroutes, setMyroutes] = useState<IRoute[]>([...mockRoutes]);
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, [active]);
  return (
    <main className="flex flex-col gap-4">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold z-[95945]">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1>Minhas rotas</h1>
      </span>
      <Tabs defaultValue="1" className="w-full px-2">
        <TabsList className="w-full h-12  bg-white gap-2">
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
                <aside className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3 mb-30">
                  {myroutes.map((route, index) => (
                    <MyRoute route={route} key={index} status="Concluído" />
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
                <aside className="grid grid-cols-1 gap-6 mt-3 mb-30">
                  {myroutes.map((route, index) => (
                    <MyRoute route={route} key={index} status="Pendente" />
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
              {Array.isArray(myroutes) && myroutes.length == 0 ? (
                <aside className="grid grid-cols-1 gap-6 mt-3 mb-30">
                  {myroutes.map((route, index) => (
                    <MyRoute route={route} key={index} status="Cancelado" />
                  ))}
                </aside>
              ) : (
                <Notfound
                  message="Ainda não tem nenhum registro"
                  buttonLabel="Criar"
                  onclick={() => {
                    alert("ola");
                  }}
                />
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
