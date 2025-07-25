"use client";
import { Check, ChevronsUpDown, CreditCard, Download } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
import { AlertCircle, ArrowDown, CheckCircle, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { IUSerShow } from "@/types/user";
import { PaymentDashBoard } from "@/types/payemnt";
import { paymentDashboardMocks } from "@/constants/paymentsDashboard";

export default function Payments() {
  const [stats, seTstats] = useState<IStats[]>([]);
  const [load, setLoad] = useState(true);
  const [payments, setPayments] = useState<PaymentDashBoard[]>(
    paymentDashboardMocks
  );
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

    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const status = [
    {
      value: "Confirmado",
      label: "Confirmado",
    },
    {
      value: "Pendetes",
      label: "Pendetes",
    },
    {
      value: "Cancelados",
      label: "Cancelados",
    },
    {
      value: "",
      label: "Todos",
    },
  ];
  useEffect(() => {}, [payments]);
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
                <Stats showBtn={false} iskz={true} stats={item} key={key} />
              ))}
          </span>

          <div data-aos="fade-up" className="mt-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[300px] justify-between"
                >
                  {value
                    ? status.find((status) => status.value === value)?.label
                    : "Filtre por estado..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Filtre por estado..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {status.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {framework.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div data-aos="fade-up">
            <Table className="w-full">
              <TableCaption>Lista de pagamentos.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Foto</TableHead>
                  <TableHead>Nome</TableHead>
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
                      
                    </TableCell>
                    <TableCell>{pay?.user?.tel}</TableCell>
                    <TableCell>
                      {Number(pay.amount).toLocaleString("pt")} kz
                    </TableCell>
                    <TableCell>{pay.method}</TableCell>
                    <TableCell>{pay.createdAt}</TableCell>
                    <TableCell>
                      <Switch
                        onCheckedChange={() => {
                          const updatedUsers = payments.map((item) =>
                            item.id === pay.id
                              ? {
                                  ...item,
                                  status:
                                    item.status === "Confirmado"
                                      ? ("Cancelado" as "Cancelado")
                                      : ("Confirmado" as "Confirmado"),
                                }
                              : item
                          );
                          setPayments(updatedUsers);
                        }}
                        checked={pay.status === "Confirmado"}
                      />
                    </TableCell>
                    <TableCell>
                      <Button className="w-full">
                        <Download />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <span>
            <Pagination data-aos="fade-up">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </span>
        </>
      )}
    </main>
  );
}
