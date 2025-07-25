"use client";
import {  Inbox, Settings, Bell, User, CarTaxiFront ,  } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "../Logo";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
const items = [
  {
    title: "Pagamentos",
    url: "/admin/",
    icon: Inbox,
  },
  {
    title: "Passageiros",
    url: "/admin/users",
    icon: User,
  },
  {
    title: "Rotas",
    url: "/admin/routes",
    icon: CarTaxiFront,
  },

  {
    title: "Notificações",
    url: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "Configurações",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [active, setActive] = useState(0);
  return (
    <Sidebar>
      <SidebarContent className="bg-primary text-white ">
        <SidebarGroup className="mt-5 gap-7">
          <SidebarGroupLabel>
            <Logo h="h-30" w="w-30 my-4" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="border-y py-5 border-white/20">
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={clsx("my-1 rounded-sm p-2 h-auto", {
                      "bg-white text-primary ": active == index,
                    })}
                  >
                    <Link
                      href={item.url}
                      onClick={() => {
                        setActive(index);
                      }}
                    >
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
