"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/constants/users";
import { ArrowLeft, PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  User2Icon,
  KeyRoundIcon,
  LogOutIcon,
  BellIcon,
  CreditCardIcon,
} from "lucide-react";
import { toast } from "sonner";
import UserService from "@/services/api/user/user.service";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
export default function Profile() {
  let servive: UserService;
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    points: 0,
    telefone: "",
  });

  const [load, setLoad] = useState(true);

  const router = useRouter();
  const routes = [
    {
      icon: <User2Icon />,
      title: "Dados Pessoais",
      description: "Altere seu nome, e-mail, telefone e outros dados pessoais.",
      to: "/admin/settings/data",
    },
    {
      icon: <PhoneCall />,
      title: "Telefone",
      description: "Atualize seu número de celular",
      to: "/admin/settings/number",
    },
    {
      icon: <KeyRoundIcon />,
      title: "Credenciais",
      description: "Atualize sua senha de e autenticação.",
      to: "/admin/settings/credential",
    },
    {
      icon: <LogOutIcon />,
      title: "Sair",
      description: "Terminar a sessão e sair da plataforma.",
      to: "/login",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function get() {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (!token || role != "ADMIN") {
        toast.info("Deves estar logado");
        router.push("/");
        return;
      } else {
        servive = new UserService(token);
        const data = await servive.GetMyData();
        if (!data?.found) {
          toast.info(data?.message);
        } else {
          setUser({
            ...data,
          });
        }

        setTimeout(() => {
          setLoad(false);
        }, 1000);
      }
    }

    get();
  }, []);

  return (
    <main className="w-full flex flex-col gap-4">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold z-[95945]">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1>Perfil</h1>
      </span>

      {load ? (
        <div className="flex justify-center items-center min-h-[70dvh] w-full scale-75">
          <Loader type="Spinner" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center pb-30 px-3">
          <article className="flex gap-9 w-full md:w-[50%] flex-col-reverse justify-center items-center">
            <span
              className="flex flex-col justify-center items-center gap-3 "
              data-aos="fade-up"
            >
              <h1 className="font-semibold text-2xl">
                {user.name + " " + user.lastname}
              </h1>
              <small className="text-sm text-gray-500 text-center">
                {user.telefone}
              </small>
            </span>

            <div className=" font-black  md:text-4xl text-3xl text-white bg-primary rounded-full md:p-4 p-2  flex justify-center items-center">
              {user.name.charAt(0) + user.lastname.charAt(0)}
            </div>
          </article>

          <span className="flex flex-col px-3 lg:w-[50%] w-full overflow-x-hidden overflow-hidden">
            <Accordion
              type="single"
              className="overflow-hidden"
              collapsible
              data-aos="fade-up"
            >
              {routes.map((item, key) => (
                <AccordionItem
                  key={key}
                  className="active:scale-100"
                  value={`value-${key}`}
                >
                  <AccordionTrigger className="active:scale-100">
                    <div className="flex flex-col gap-3 justify-center">
                      {item.icon}
                      <p>{item.title}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="active:scale-100 flex flex-col gap-3">
                    <p>{item.description}</p>
                    <Button
                      onClick={() => {
                        if (item.to && item.to?.length > 0) {
                          if (item.title == "Sair") {
                            localStorage.clear();
                            sessionStorage.clear();
                            toast.success("Sessão terminada");
                          }
                          router.push(item.to);
                        }
                      }}
                      className="md:w-[25%] w-full h-[45px]"
                    >
                      {item.title} {item.icon}{" "}
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </span>
        </div>
      )}
    </main>
  );
}
