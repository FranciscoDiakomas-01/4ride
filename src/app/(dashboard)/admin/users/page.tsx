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
import UserService from "@/services/api/user/user.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Users() {
  const [stats, seTstats] = useState<IStats[]>([]);
  const [load, setLoad] = useState(true);
  const [users, setUsers] = useState<IUSerShow[]>(mockUsers as IUSerShow[]);
  const router = useRouter();
  useEffect(() => {
    async function get() {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (!token || role != "ADMIN") {
          toast.info("Deves estar logado");
          router.push("/");
          return;
        }
      const service = new UserService(token);
      const data = await service.getAllUsers();
      setUsers(data.users);
      seTstats([
        {
          icon: <Heart />,
          title: "Usuários",
          value: data.total,
        },
        {
          icon: <CheckCircle />,
          title: "Usuários activos",
          value: data.confirmated,
        },
        {
          icon: <AlertCircle />,
          title: "Usuários inadiplemtes",
          value: data.pendings,
        },
      ]);
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
  return (
    <main className="p-3 flex flex-col gap-5">
      {load ? (
        <div className="flex justify-center scale-70 items-center h-[80dvh] w-full">
          <Loader type="Spinner" />
        </div>
      ) : (
        <>
          <span className="grid gap-4 mt-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
            {Array.isArray(stats) &&
              stats.length > 0 &&
              stats.map((item, key) => (
                <Stats showBtn={false} iskz={false} stats={item} key={key} />
              ))}
          </span>

          <div className="overflow-y-hidden" data-aos="fade-up">
            <Table className="w-full">
              <TableCaption>Lista dos Passageiros.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Créditos</TableHead>
                  <TableHead>Montante</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, key) => (
                  <TableRow key={key}>
                    <TableCell>
                      <div className="flex h-9 w-9 font-black bg-primary text-white uppercase rounded-full justify-center items-center p-2">
                        {user.name?.charAt(0)}
                        {user.lastname?.charAt(0)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.name} {user.lastname}
                    </TableCell>
                    <TableCell>{user.telefone}</TableCell>
                    <TableCell>{Number(user.points) / 50} Pontos</TableCell>
                    <TableCell>
                      {Number(user.points).toLocaleString("pt")} kz
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
