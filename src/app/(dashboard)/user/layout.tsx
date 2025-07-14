"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Bell, Car, CreditCard, Home, User2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      title: "Inicial",
      icon: <Home size={18} />,
      to: "/user",
    },
    {
      title: "Rotas",
      icon: <Car size={18} />,
      to: "/user/routes",
    },
    {
      title: "Pagamentos",
      icon: <CreditCard size={18} />,
      to: "/user/payments",
    },
    {
      title: "Perfil",
      icon: <User2Icon size={18} />,
      to: "/user/profile",
    },
  ];
  const [active, setACtive] = useState(0);
  const router = useRouter();
  return (
    <main>
      <Button
        onClick={() => {
          router.push("/user/notifications");
        }}
        className="fixed right-2 top-4 z-[99999999999]"
      >
        <Bell />
      </Button>
      {children}

      <span
        id="bottomTabs"
        className="fex fixed bottom-0 z-67 left-0 bg-white  px-2 py-4 grid grid-cols-4 w-full gap-4 shadow border-t"
      >
        {tabs.map((item, key) => (
          <Link
            className={clsx(
              "flex flex-col justify-center items-center transition-all p-1.5 px-2 rounded-sm hover:bg-gray-100",

              {
                "text-primary  bg-green-100/50": active == key,
              },
              {
                "text-gray-700": active != key,
              }
            )}
            onClick={() => {
              setACtive(key);
            }}
            href={item.to}
            key={key}
          >
            {item.icon}
            <p className="transition-all text-sm">{item.title}</p>
          </Link>
        ))}
      </span>
    </main>
  );
}
