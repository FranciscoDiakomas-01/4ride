"use client";
import "aos/dist/aos.css";
import AOS from "aos";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sideBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TokenMonitor from "@/components/TokenMonitor";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <SidebarProvider>
      <main className="w-full">
        <TokenMonitor />
        <AppSidebar />
        <SidebarTrigger
          variant={"default"}
          className=" mt-2 ml-2 z-[999999] xl:hidden flex"
        />
        <section className="lg:ml-[255px]">{children}</section>
      </main>
    </SidebarProvider>
  );
}
