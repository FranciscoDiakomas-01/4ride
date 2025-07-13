"use client";
import car from "@/assets/carinit.png";
import AcountCard from "@/components/AcountCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function UserHome() {
  return (
    <main className="w-full flex flex-col gap-3 p-4 pt-8">
      <div className="flex flex-col">
        <p className="text-md text-gray-500">Um dia incrível pra você</p>
        <h1 className="text-4xl font-semibold text-primary">Francisco!</h1>
      </div>
      <AcountCard amount="100000" number="957777993" />
      <div className="flex flex-col w-full justify-center items-center">
        <Image className="h-70 w-80 object-contain" src={car} alt="car" />
        <Button className="h-[50px] text-md md:w-[50%] w-full ">
          Encontar uma rota
        </Button>
      </div>
    </main>
  );
}
