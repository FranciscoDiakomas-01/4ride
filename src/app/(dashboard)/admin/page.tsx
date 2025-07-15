"use client";
import { Heart, CarTaxiFront, UserCheck, CreditCardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IStats } from "@/types/stats";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Stats from "@/components/Stats";
import { AdminBarCharts } from "@/components/Charts/barCharts";

export default function AdminHome() {
  const [stats, setStats] = useState<IStats[]>([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setStats([
      {
        icon: <UserCheck />,
        title: "Usuários",
        value: "1000",
      },
      {
        icon: <CarTaxiFront />,
        title: "Rotas",
        value: "1000",
      },
      {
        icon: <Heart />,
        title: "Avaliações",
        value: "1000",
      },
      {
        icon: <CreditCardIcon />,
        title: "Pagamentos",
        value: "1000",
      },
    ]);

    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);
  return (
    <main className="p-3 flex flex-col gap-5">
      {load ? (
        <div className="flex justify-center scale-70 items-center h-[80dvh] w-full">
          <Loader type="Spinner" />
        </div>
      ) : (
        <>
          <header
            data-aos="fade-up"
            className="flex md:flex-row flex-col justify-between gap-5 md:items-center w-full"
          >
            <h1 className="text-md font-semibold">Painel inicial</h1>
            <div className="grid md:grid-cols-2 gap-4">
              <Button>
                Exportar dados <ArrowDown />{" "}
              </Button>{" "}
              <Button variant={"outline"}>
                Gerar Relátorio <ArrowDown className="rotate-180" />{" "}
              </Button>
            </div>
          </header>

          <span className="grid gap-4 mt-4 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
            {Array.isArray(stats) &&
              stats.length > 0 &&
              stats.map((item, key) => (
                <Stats iskz={key == stats.length - 1} stats={item} key={key} />
              ))}
          </span>
          <AdminBarCharts />
        </>
      )}
    </main>
  );
}
