"use client";

import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowUp, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function CreatePayment() {
  const router = useRouter();
  const [load, setLoad] = useState(true);

  return (
    <main className="flex flex-col gap-4 pb-30">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1>Pagamentos</h1>
      </span>

      <Tabs defaultValue="1" className="w-full px-2">
        <TabsList className="w-full h-12  bg-white gap-2">
          <TabsTrigger value="1">Express</TabsTrigger>
          <TabsTrigger value="2">Referência</TabsTrigger>
          <TabsTrigger value="3">Transferência</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <form
            data-aos="fade-up"
            action=""
            className="flex flex-col gap-4 border rounded-sm p-4 mt-9 md:place-self-center md:w-[50%]"
          >
            <div className="flex justify-center items-center flex-col ">
              <h1 className="text-primary text-2xl font-semibold">Carregue </h1>
              <p className="text-sm">a sua conta</p>
            </div>
            <Label htmlFor="tel">Telefone</Label>
            <Input
              required
              placeholder="9xx xxx xxx"
              type="tel"
              id="tel"
              name="tel"
            />{" "}
            <Label htmlFor="number">Montante</Label>
            <Input
              required
              placeholder="934"
              type="number"
              id="number"
              name="tel"
            />
            <Button className="text-md  h-[45px]">
              Carregar <ArrowUp className="rotate-40" />{" "}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="2">
          <form
            data-aos="fade-up"
            action=""
            className="flex flex-col gap-4 border rounded-sm p-4 mt-9 md:place-self-center md:w-[50%]"
          >
            <div className="flex justify-center items-center flex-col ">
              <h1 className="text-primary text-2xl font-semibold">Carregue </h1>
              <p className="text-sm">a sua conta</p>
            </div>
            <Label htmlFor="number">Montante</Label>
            <Input
              required
              placeholder="934"
              type="number"
              id="number"
              name="tel"
            />
            <Button className="text-md  h-[45px]">
              Gerar Refência <ArrowUp className="rotate-40" />{" "}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="3">
          <form
            data-aos="fade-up"
            action=""
            className="flex flex-col gap-4 border rounded-sm p-4 mt-9 md:place-self-center md:w-[50%]"
          >
            <div className="flex justify-center items-center flex-col ">
              <h1 className="text-primary text-2xl font-semibold">Carregue </h1>
              <p className="text-sm">a sua conta</p>
            </div>
            <Label htmlFor="number">Comprovante</Label>
            <div className="border-2 p-2 rounded-sm border-dashed h-30 flex justify-center items-center overflow-hidden relative">
              <Input
                required
                placeholder="934"
                type="file"
                id="number"
                className="absolute w-full h-full opacity-0 cursor-pointer"
                name="tel"
              />
              <div className="flex justify-center items-center flex-col gap-3 animate-pulse">
                <Upload />
                <small>Clique para enviar um arqivo</small>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 ">
              <Button className="text-md  h-[45px]">
                Enviar <ArrowUp className="rotate-40" />{" "}
              </Button>
              <Button variant={"outline"} className="text-md  h-[45px]">
                Copiar IBAN
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </main>
  );
}
