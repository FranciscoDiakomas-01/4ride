"use client";

import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowUp, Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PaymentService from "@/services/api/Payments/payments.service";
export default function CreatePayment() {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState(0);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSizeMB = 32;
    if (!allowedTypes.includes(selected.type)) {
      toast.error("Apenas arquivos JPG ou PNG são aceitos.");
      return;
    }
    if (selected.size / 1024 / 1024 > maxSizeMB) {
      toast.error("Imagem muito grande. Máximo permitido é 32MB.");
      return;
    }
    setFile(selected);
  };

  const handelOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    if (!file || !amount || amount < 50) {
      toast.error("Selecione um comprovativo antes de enviar.");
      setProcessing(false);
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token") ?? "";
      if (!token) {
        console.log(token);
        toast.error("Você precisa estar logado");
        router.push("/login");
        return;
      }
      const paymentService = new PaymentService(token);
      const uploadFile = await fetch(
        "https://api.imgbb.com/1/upload?key=ba6c1340bea57458e666eec5a6da127b",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await uploadFile.json();
      const create = await paymentService.createPayment({
        amount,
        file: data?.data?.url,
      });
      console.log(create);
      if (create?.created) {
        toast.success(
          "Estamos a validar o seu pagamento. Aguarde a confirmação."
        );
        setTimeout(() => {
          setProcessing(false);
          router.back();
        }, 1000);
      } else {
        toast.error("Erro ao enviar comprovativo. Tente novamente.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar comprovativo. Tente novamente.");
    } finally {
      setTimeout(() => {
        setProcessing(false);
      }, 1000);
    }
  };

  return (
    <main className="flex flex-col gap-4 pb-30">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold z-[95945]">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1>Pagamentos</h1>
      </span>

      <div className="w-full">
        <form
          onSubmit={handelOnSubmit}
          data-aos="fade-up"
          action=""
          className="flex flex-col gap-4 border rounded-sm p-4 mt-9 md:place-self-center md:w-[50%]"
        >
          <div className="flex justify-center items-center flex-col ">
            <h1 className="text-primary text-2xl font-semibold">Carregue </h1>
            <p className="text-sm">a sua conta</p>
          </div>
          <Label htmlFor="anmount">Valor</Label>
          <Input
            required
            placeholder="Montante"
            type="number"
            id="anmount"
            min={50}
            name="anmount"
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />{" "}
          <Label htmlFor="number">Comprovante</Label>
          <div className="border-2 p-2 rounded-sm border-dashed h-30 flex justify-center items-center overflow-hidden relative">
            <Input
              required
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
              name="file"
            />
            <div className="flex justify-center items-center flex-col gap-3 animate-pulse">
              <Upload />
              <small>
                {!file ? "Clique para enviar um arqivo" : file.name}
              </small>
            </div>
          </div>
          <div className="grid md:grid-cols-1 gap-4 ">
            <div className="w-full grid md:grid-cols-2 gap-2">
              <Button
                variant={"outline"}
                type="button"
                className="text-md  h-[45px]"
                onClick={() => {
                  navigator.clipboard.writeText("004000008281760810161");
                  toast.info("Iban copiado");
                }}
              >
                Copiar IBAN
              </Button>
              <Button
                type="button"
                variant={"outline"}
                className="text-md  h-[45px]"
                onClick={() => {
                  navigator.clipboard.writeText("937382861");
                  toast.info("Express copiado");
                }}
              >
                Copiar Express
              </Button>
            </div>
            <Button className="text-md  h-[45px]">
              {processing ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Pagar <ArrowUp className="rotate-40" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
