"use client";
import { Check, ChevronsUpDown } from "lucide-react";
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
import {
  AlertCircle,
  ArrowDown,
  CheckCircle,
  Heart,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { IUSerShow } from "@/types/user";
import { mockUsers } from "@/constants/users";

export default function Users() {
  const [stats, seTstats] = useState<IStats[]>([]);
  const [load, setLoad] = useState(true);
  const [users, setUsers] = useState<IUSerShow[]>(mockUsers as IUSerShow[]);
  useEffect(() => {
    seTstats([
      {
        icon: <Heart />,
        title: "Usuários",
        value: "1000",
      },
      {
        icon: <CheckCircle />,
        title: "Usuários activos",
        value: "1000",
      },
      {
        icon: <AlertCircle />,
        title: "Usuários inadiplemtes",
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
      value: "Activo",
      label: "Activo",
    },
    {
      value: "Inadiplentes",
      label: "Inadiplentes",
    },
    {
      value: "Desactivo",
      label: "Desactivo",
    },
  ];
  useEffect(() => {}, [users]);
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

          <span className="grid gap-4 mt-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
            {Array.isArray(stats) &&
              stats.length > 0 &&
              stats.map((item, key) => (
                <Stats showBtn={false} iskz={false} stats={item} key={key} />
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
          <div className="overflow-y-hidden" data-aos="fade-up">
            <Table className="w-full">
              <TableCaption>Lista dos Passageiros.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Foto</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Créditos</TableHead>
                  <TableHead>Montante</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acção</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, key) => (
                  <TableRow key={key}>
                    <TableCell>
                      <img
                        className="h-10 w-10 rounded-full object-contain"
                        src={user.profile}
                        alt="user Profile"
                      />
                    </TableCell>
                    <TableCell>{user.fullname}</TableCell>
                    <TableCell>{user.tel}</TableCell>
                    <TableCell>{user.points}</TableCell>
                    <TableCell>
                      {Number(user.cash).toLocaleString("pt")} kz
                    </TableCell>
                    <TableCell>
                      <Switch
                        onCheckedChange={() => {
                          const updatedUsers = users.map((item) =>
                            item.id === user.id
                              ? {
                                  ...item,
                                  status:
                                    item.status === "Activo"
                                      ? ("Desactivo" as "Desactivo")
                                      : ("Activo" as "Activo"),
                                }
                              : item
                          );
                          setUsers(updatedUsers);
                        }}
                        checked={user.status === "Activo"}
                      />
                    </TableCell>
                    <TableCell>
                      <Button>
                        <Trash />
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
