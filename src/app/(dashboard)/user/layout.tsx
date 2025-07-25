"use client";
import "aos/dist/aos.css";
import AOS from "aos";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Bell, Car, CreditCard, Home, User2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TokenMonitor from "@/components/TokenMonitor";
import NotifiCationService from "@/services/api/Notification/notification.service";
import { toast } from "sonner";
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

  const [notification, setNotification] = useState(0);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  const [active, setACtive] = useState(0);
  const router = useRouter();
  let service: NotifiCationService;
  useEffect(() => {
    async function get() {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }
      service = new NotifiCationService(token);
      const data = await service.getMyotificationCouter();
      setNotification(data);
    }
    get();
    const interval = setInterval(() => {
      get();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <main>
      <TokenMonitor />
      <Button
        onClick={() => {
          router.push("/user/notifications");
        }}
        className={clsx(
          "fixed right-2 top-4 z-[99999999999] shadow-none ",
          {
            "bg-primary text-white": notification > 0,
          },
          {
            "bg-gray-50 text-primary hover:text-primary hover:bg-gray-50":
              notification <= 0,
          }
        )}
      >
        <Bell />
      </Button>
      {children}

      <span
        id="bottomTabs"
        className="fixed bottom-0 z-67 left-0 bg-white  px-2 py-4 grid grid-cols-4 w-full gap-4 shadow border-t"
      >
        {tabs.map((item, key) => (
          <Link
            style={{ animation: "bounce 1s ease-in alternate 1" }}
            className={clsx(
              "flex flex-col justify-center items-center transition-all p-1.5 px-2 rounded-sm  1s hover:bg-gray-100",

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
