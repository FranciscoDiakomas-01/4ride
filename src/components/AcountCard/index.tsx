import chip from "@/assets/chip.png";
import bubble from "@/assets/buble.png";
import Image from "next/image";

interface props {
  number: string;
  amount: string;
}
export default function AcountCard({ amount, number }: props) {
  return (
    <div className="flex flex-col bg-primary text-white h-[180px] md:w-[400px] w-full  justify-between p-3 rounded-md gap-4">
      <span className="flex justify-between">
        <div>
          <p className="text-sm">Meu saldo</p>
          <h1 className="text-xl font-semibold">
            {Number(amount).toLocaleString("pt")} kz
          </h1>
        </div>
        <div>
          <Image src={bubble} alt="buble" />
        </div>
      </span>

      <div className="flex gap-4 font-bold text-2xl tracking-widest">{number}</div>
      <h1 className="text-[14px] text-gray-50 opacity-40">
        Seus créditos inicias equivalem a 12 viagens
      </h1>
    </div>
  );
}
