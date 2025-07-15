
import bubble from "@/assets/logo.png";
import Image from "next/image";

interface props {
  number: string;
  amount: string;
}
export default function AcountCard({ amount, number }: props) {
  return (
    <div
      data-aos="fade-up"
      className="flex flex-col bg-primary text-white min-h-[180px] md:w-[400px] w-full  justify-between p-3 rounded-md gap-4"
    >
      <span className="flex justify-between">
        <div>
          <p className="text-sm">Meu saldo</p>
          <h1 className="text-xl font-semibold">
            {Number(amount).toLocaleString("pt")} kz
          </h1>
        </div>
        <div className="flex items-start justify-end">
          <Image src={bubble} alt="buble" className="h-13 w-14" />
        </div>
      </span>

      <div className="flex gap-4 font-bold text-2xl tracking-widest">
        {number}
      </div>
      <h1 className="text-[14px] text-gray-100">
        Seus créditos inicias equivalem a 12 viagens
      </h1>
    </div>
  );
}
