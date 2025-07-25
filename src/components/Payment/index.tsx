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
              "bg-indigo-500/30 text-indigo-500 ": payment.status == "PENDING",
            },
            {
              "bg-green-500/30 text-green-500 ":
                payment.status == "CONFIRMATED",
            },
            {
              "bg-red-500/30 text-red-500 ": payment.status == "CANCELLED",
            }
          )}
        >
          {payment.status == "CONFIRMATED" && <CheckCircle size={18} />}
          {payment.status == "CANCELLED" && <AlertCircle size={18} />}
          {payment.status == "PENDING" && <Ellipsis size={18} />}
        </div>
        <span className="flex flex-col gap-2 min-w-[150px] ">
          <p>{payment.method}</p>
          <small>{new Date(payment.createdAt).toDateString()}</small>{" "}
          <small>
            {payment.status == "CONFIRMATED" &&
              payment.updatedAt &&
              new Date(payment.updatedAt).toDateString()}
          </small>
        </span>
        <h1 className="w-full text-md font-semibold">
          {Number(payment.amount).toLocaleString("pt")} kz
        </h1>
      </div>
      <p className={clsx("text-sm  p-2")}>
        {payment.status == "PENDING"
          ? "Pagamento pendente , aguarde a verificação"
          : payment.status == "CONFIRMATED"
          ? "Pagamento confirmado som sucesso"
          : "Pagamento cancelado"}
      </p>
    </figure>
  );
}
