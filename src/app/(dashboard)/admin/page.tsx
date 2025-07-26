"use client";
import {  CreditCard, Download } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/components/Loader";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { IStats } from "@/types/stats";
import { AlertCircle, ArrowDown, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { paymentDashboardMocks } from "@/constants/paymentsDashboard";
import PaymentService from "@/services/api/Payments/payments.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Payments() {
  const [stats, seTstats] = useState<IStats[]>([]);
  const router = useRouter();
  const [load, setLoad] = useState(true);
  const [payments, setPayments] = useState<any[]>(paymentDashboardMocks);
  useEffect(() => {
    seTstats([
      {
        icon: <CreditCard />,
        title: "Pagamentos",
        value: "1000",
      },
      {
        icon: <AlertCircle />,
        title: "Pagamentos Pendentes",
        value: "1000",
      },
      {
        icon: <CheckCircle />,
        title: "Pagamentos Confirmados",
        value: "1000",
      },
      {
        icon: <AlertCircle />,
        title: "Pagamentos Cancelados",
        value: "1000",
      },
    ]);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role != "ADMIN") {
      toast.info("Deves estar logado");
      router.push("/");
      return
    }
    async function get() {
      const service = new PaymentService(token ?? "s");
      const data = await service.getAllMyPayment();
      console.log(data);
      const formatted = data.payments.map((payment) => ({
        amount: payment.amount,
        telefone: payment.user?.telefone || "Não informado",
        name: payment.user?.name || "Sem nome",
        lastname: payment.user?.lastname || "Sem sobrenome",
        method: payment.method,
        id: payment.id,
        file: payment.file,
        createdAt: new Date(payment.createdAt).toLocaleString("pt-PT", {
          dateStyle: "short",
          timeStyle: "short",
        }),
        updatedAt: new Date(payment.updatedAt).toLocaleString("pt-PT", {
          dateStyle: "short",
          timeStyle: "short",
        }),
        status : payment.status
      }));

      seTstats(data.stats);
      setPayments(formatted);
    }

    get();
    const interval = setInterval(() => {
      get();
    }, 3000);

    setTimeout(() => {
      setLoad(false);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Função React para download de imagem
  function downloadImage(url: string, filename = "imagem.jpg") {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Arquivo não encontrado");
        return res.blob();
      })
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href); // limpa a memória
      })
      .catch((err) => {
        toast.error("Não foi possível baixar o arquivo.");
      });
  }

  useEffect(() => {}, [payments]);
  return (
    <main className="p-3 flex flex-col gap-5">
      {load ? (
        <div className="flex justify-center scale-70 items-center h-[80dvh] w-full">
          <Loader type="Spinner" />
        </div>
      ) : (
        <>
          <span className="grid gap-4 mt-4 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
            {Array.isArray(stats) &&
              stats.length > 0 &&
              stats.map((item, key) => (
                <Stats showBtn={false} iskz={true} stats={item} key={key} />
              ))}
          </span>

          <div data-aos="fade-up">
            <Table className="w-full">
              <TableCaption>Lista de pagamentos.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Passageiro</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Montante</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-center">Comprovante</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((pay, key) => (
                  <TableRow key={key}>
                    <TableCell>
                      <div className="flex h-9 w-9 font-black bg-primary text-white uppercase rounded-full justify-center items-center p-2">
                        {pay.name?.charAt(0)}
                        {pay.lastname?.charAt(0)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {pay.name} {pay.lastname}
                    </TableCell>
                    <TableCell>{pay.telefone}</TableCell>
                    <TableCell>
                      {Number(pay.amount).toLocaleString("pt")} kz
                    </TableCell>
                    <TableCell>{pay.method}</TableCell>
                    <TableCell>{pay.createdAt}</TableCell>
                    <TableCell>
                      <Switch
                        onCheckedChange={async (e) => {
                          const token = localStorage.getItem("token");
                          if (!token) {
                            toast.info("Deves estar logado");
                            router.push("/");
                          }
                          const status = e ? "CONFIRMATED" : "CANCELLED";
                          const service = new PaymentService(token ?? "");
                          const data = await service.Update({
                            paymentid: +pay.id,
                            status,
                          });
                          console.log(data);

                          if (data.updated) {
                            toast.success("Confirmado com sucesso!");
                            const updatedUsers = payments.map((item) => {
                              return item.id == pay.id
                                ? {
                                    ...item,
                                    status:
                                      item.status === "CONFIRMATED"
                                        ? ("CANCELLED" as "CANCELLED")
                                        : ("CONFIRMATED" as "CONFIRMATED"),
                                  }
                                : item;
                            });
                            setPayments(updatedUsers);
                            return;
                          } else {
                            toast.error(data.message ?? "Ocorreu um erro");
                          }
                        }}
                        checked={pay.status === "CONFIRMATED"}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        className="w-full"
                        onClick={() => {
                          downloadImage(pay.file);
                        }}
                      >
                        <Download />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </main>
  );
}
