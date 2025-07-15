"use client";

import { IPayment } from "@/types/payemnt";
import clsx from "clsx";
import { AlertCircle, ArrowUp, CheckCircle, Ellipsis } from "lucide-react";

interface props {
  payment: IPayment;
}

export default function PaymentCard({ payment }: props) {
  return (
    <figure
      data-aos="fade-up"
      className="flex flex-col gap-4 p-3 border rounded-sm"
    >
      <div className="flex gap-5">
        <div
          className={clsx(
            "flex justify-center items-center w-13 h-9 p-2 rounded-md",
            {
              "bg-indigo-500/30 text-indigo-500 ": payment.status == "Pendente",
            },
            {
              "bg-green-500/30 text-green-500 ": payment.status == "Confirmado",
            },
            {
              "bg-red-500/30 text-red-500 ": payment.status == "Cancelado",
            }
          )}
        >
          {payment.status == "Confirmado" && <CheckCircle size={18} />}
          {payment.status == "Cancelado" && <AlertCircle size={18} />}
          {payment.status == "Pendente" && <Ellipsis size={18} />}
        </div>
        <span className="flex flex-col gap-2 min-w-[150px] ">
          <p>{payment.method}</p>
          <small>{payment.createdAt}</small>
        </span>
        <h1 className="w-full text-md font-semibold">
          {Number(payment.amount).toLocaleString("pt")} kz
        </h1>
      </div>
      <p
        className={clsx(
          "text-sm opacity-50 border p-2 rounded-sm",
          {
            " text-indigo-500 ": payment.status == "Pendente",
          },
          {
            " text-green-500 ": payment.status == "Confirmado",
          },
          {
            " text-red-500 ": payment.status == "Cancelado",
          }
        )}
      >
        {payment.message}
      </p>
    </figure>
  );
}
