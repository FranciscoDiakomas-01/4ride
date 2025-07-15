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
  ShieldCheckIcon,
} from "lucide-react";
export default function Profile() {
  const routes = [
    {
      icon: <User2Icon />,
      title: "Dados Pessoais",
      description: "Altere seu nome, e-mail, telefone e outros dados pessoais.",
      to: "/user/profile/data",
    },
    {
      icon: <PhoneCall />,
      title: "Telefone",
      description: "Atualize seu número de celular",
      to: "/user/profile/number",
    },
    {
      icon: <KeyRoundIcon />,
      title: "Credenciais",
      description: "Atualize sua senha de e autenticação.",
      to: "/user/profile/credential",
    },
    {
      icon: <BellIcon />,
      title: "Notificações",
      description: "Veja todas as suas notificações",
      to: "/user/notifications",
    },
    {
      icon: <CreditCardIcon />,
      title: "Pagamentos",
      description: "Histórico de transações e métodos de pagamento.",
      to: "/user/payments",
    },
    {
      icon: <LogOutIcon />,
      title: "Sair",
      description: "Terminar a sessão e sair da plataforma.",
      to: "/login",
    },
  ];
  const user = mockUsers[0];
  const router = useRouter();
  return (
    <main className="w-full flex flex-col gap-4">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1>Perfil</h1>
      </span>

      <div className="flex flex-col gap-4 justify-center items-center pb-30 px-3">
        <article className="flex gap-9 w-full md:w-[50%] flex-col-reverse justify-center items-center">
          <span className="flex flex-col justify-center items-center gap-3">
            <h1 className="font-semibold text-2xl">{user.fullname}</h1>
            <small className="text-sm text-gray-500 text-center">
              {user.tel}
            </small>
          </span>
          <img className="h-30 w-30 rounded-full" src={user.profile} />
        </article>

        <span className="flex flex-col px-3 lg:w-[50%] w-full overflow-x-hidden">
          <Accordion type="single" collapsible>
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
    </main>
  );
}
