import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className="w-full">
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
