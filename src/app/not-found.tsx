"use client";
import woman from "@/assets/acess.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  return (
    <main className="w-full h-screen flex justify-center items-center  px-3">
      <div className="flex flex-col justify-center items-center md:w-[40%] gap-5 w-full">
        <Image className="h-50 w-50 " src={woman} alt="woman" />
        <h1 className="text-2xl font-semibold">Essa página não existe</h1>
        <Button
          onClick={() => {
            router.push("/");
          }}
          className="h-[45px] w-full object-contain "
        >
          Voltar
        </Button>
      </div>
    </main>
  );
}
