"use client";

import Loader from "@/components/Loader";
import Notfound from "@/components/Notfound";
import Route from "@/components/Route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RouteService from "@/services/api/Route/route.service";
import IRoute from "@/types/route";
import { ArrowLeftIcon, ArrowUp, Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Router() {
  const [load, setLoad] = useState(true);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [processing, setProcessing] = useState(false);
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const router = useRouter();

  let service: RouteService;

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
        isIn : item.isIn
      })) as IRoute[];
      console.table(formated)
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

  const filteredRoutes = routes.filter((route) => {
    const fromMatch = route.from
      .toLowerCase()
      .includes(fromFilter.toLowerCase().trim());
    const toMatch = route.to
      .toLowerCase()
      .includes(toFilter.toLowerCase().trim());
    return fromMatch && toMatch;
  });

  async function handelOnsubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formadata = new FormData(e.currentTarget);
    const from = formadata.get("from") as string;
    const to = formadata.get("to") as string;
    const token = localStorage.getItem("token");

    if (!to || !from) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (!token) {
      toast.error("Você precisa estar logado");
      router.push("/");
      return;
    }

    setProcessing(true);
    service = new RouteService(token);
    const data = await service.createRoute({ from, to });

    if (data?.creaed) {
      toast.success(data.message);
      router.push(`/user/routes/${data.routeid}`);
    } else {
      toast.error(data.message);
    }

    setTimeout(() => {
      setProcessing(false);
    }, 1000);
  }

  return (
    <main className="flex flex-col gap-9 pb-32">
      <div className="bg-white shadow p-4 py-5 sticky top-0 flex gap-3 items-center z-[95945]">
        <ArrowLeftIcon
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="font-semibold">Grupos de Rotas</p>
      </div>

      <form className="px-3 flex lg:flex-row flex-col gap-4">
        <div className="flex gap-2 border-1 p-1.5 rounded-md">
          <div className="flex justify-center items-center rounded-full bg-gray-100 p-2 text-gray-600">
            <Search size={17} />
          </div>
          <Input
            placeholder="Localização"
            name="fromFilter"
            value={fromFilter}
            onChange={(e) => setFromFilter(e.target.value)}
            className="w-full h-full border-0 shadow-none outline-0"
          />
        </div>

        <span className="flex items-center gap-4 justify-between">
          <div className="flex gap-2 border-1 p-1.5 rounded-md w-[85%]">
            <div className="flex justify-center items-center rounded-full bg-gray-100 p-2 text-gray-600">
              <Search size={17} />
            </div>
            <Input
              placeholder="Destino"
              name="toFilter"
              value={toFilter}
              onChange={(e) => setToFilter(e.target.value)}
              className="w-full h-full border-0 shadow-none outline-0"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Criar rota</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar rota</DialogTitle>
                <DialogDescription>
                  Crie rota, para que os próximos usuários com mesmo destino te
                  encontrem
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handelOnsubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="from">Distrito atual</Label>
                    <Input
                      defaultValue={fromFilter}
                      id="from"
                      name="from"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="to">Distrito de destino</Label>
                    <Input
                      id="to"
                      name="to"
                      defaultValue={toFilter}
                      onChange={(e) => setToFilter(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={processing}>
                    {processing ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        Publicar <ArrowUp className="rotate-40" />
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </span>
      </form>

      {load ? (
        <div className="scale-75 w-full h-[40dvh] flex justify-center items-center">
          <Loader type="Spinner" />
        </div>
      ) : (
        <aside className="px-3">
          {filteredRoutes.length > 0 ? (
            <div className="grid xl:grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1">
              {filteredRoutes.map((item, key) => (
                <Route item={item} key={key} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 justify-center items-center">
              <Notfound
                message="Não há rotas activas com esses critérios. Deseja criar uma?"
                onclick={() => {}}
                buttonLabel=""
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Criar rota</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Criar rota</DialogTitle>
                    <DialogDescription>
                      Crie rota, para que os próximos usuários com mesmo destino
                      te encontrem
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handelOnsubmit}>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="from">Distrito atual</Label>
                        <Input
                          id="from"
                          name="from"
                          required
                          defaultValue={fromFilter}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="to">Distrito de destino</Label>
                        <Input
                          id="to"
                          name="to"
                          required
                          defaultValue={toFilter}
                        />
                      </div>
                    </div>
                    <DialogFooter className="mt-4">
                      <DialogClose asChild>
                        <Button variant="outline" type="button">
                          Cancelar
                        </Button>
                      </DialogClose>
                      <Button type="submit" disabled={processing}>
                        {processing ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            Publicar <ArrowUp className="rotate-40" />
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </aside>
      )}
    </main>
  );
}
