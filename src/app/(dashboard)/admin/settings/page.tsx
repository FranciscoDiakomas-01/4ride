"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/constants/users";
import {PhoneCall, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  User2Icon,
  KeyRoundIcon,
  LogOutIcon,
} from "lucide-react";
export default function Profile() {
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
  const user = mockUsers[0];
  const router = useRouter();
  return (
    <main className="w-full flex flex-col gap-4 pt-9">
      <div className="flex flex-col gap-4 justify-center items-center pb-30 px-3">
        <article className="flex gap-9 w-full md:w-[50%] flex-col-reverse justify-center items-center">
          <span
            className="flex flex-col justify-center items-center gap-3 "
            data-aos="fade-up"
          >
            <h1 className="font-semibold text-2xl">{user.fullname}</h1>
            <small className="text-sm text-gray-500 text-center">
              {user.tel}
            </small>
          </span>
          <img
            className="h-30 w-30 rounded-full"
            src={user.profile}
            data-aos="fade-up"
          />
        </article>

        <span className="flex flex-col px-3 lg:w-[70%] w-full overflow-x-hidden overflow-hidden">
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
