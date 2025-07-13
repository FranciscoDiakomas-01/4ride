import chip from "@/assets/chip.png";
import bubble from "@/assets/buble.png";
import Image from "next/image";

interface props {
  number: string;
  amount: string;
}
export default function AcountCard({ amount, number }: props) {
  return (
    <div className="flex flex-col bg-primary text-white h-[200px] md:w-[400px] w-full  justify-between p-3 rounded-md gap-4">
      <span className="flex justify-between">
        <div>
          <h1>Meu saldo</h1>
          <h1 className="text-2xl font-semibold">
            {Number(amount).toLocaleString("pt")} kz
          </h1>
        </div>
        <div>
          <Image src={bubble} alt="buble" />
        </div>
      </span>

      <div className="flex gap-4">
        <Image src={chip} alt="chip" />
        <h1 className="text-xl font-semibold flex items-center gap-3">
          <div className="h-3 w-3 bg-gray-100 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-100 rounded-full"></div>{" "}
          <div className="h-3 w-3 bg-gray-100 rounded-full"></div>{" "}
          <div className="h-3 w-3 bg-gray-100 rounded-full"></div>{" "}
          <div className="h-3 w-3 bg-gray-100 rounded-full"></div>{" "}
          <div className="h-3 w-3 bg-gray-100 rounded-full"></div>
          <p> {number[6]}</p>
          <p> {number[7]}</p>
          <p> {number[8]}</p>
        </h1>
      </div>
      <h1 className="text-[14px] text-gray-50 opacity-40">
        Seus créditos inicias equivalem a 12 viagens
      </h1>
    </div>
  );
}
