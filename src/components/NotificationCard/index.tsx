"use client";

import INotification from "@/types/notification";
import { Badge } from "../ui/badge";
import { AlertCircle, Bell, Car, CreditCard, Send } from "lucide-react";
import clsx from "clsx";

interface prop {
  notification: INotification;
}

export default function NotificationCard({ notification }: prop) {
  return (
    <figure data-aos="zoom-in" className="flex gap-4 p-3 rounded-sm  border">
      <div>
        <Badge
          variant={"outline"}
          className={clsx(
            "w-10 h-10 rounded-full",
            {
              "bg-amber-200/20 border-amber-400":
                notification.type == "message",
            },
            {
              "bg-red-200/20 border-red-400": notification.type == "alert",
            },
            {
              "bg-indigo-200/20 border-indigo-400": notification.type == "ride",
            },
            {
              "bg-blue-200/20 border-blue-400": notification.type == "payment",
            }
          )}
        >
          {notification.type == "message" ? (
            <Send className="text-amber-400" />
          ) : notification.type == "alert" ? (
            <AlertCircle className="text-red-500" />
          ) : notification.type == "payment" ? (
            <CreditCard className="text-blue-500" />
          ) : (
            <Car className="text-indigo-800" />
          )}
        </Badge>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-md font-semibold">
          {" "}
          {notification.type == "message"
            ? "Mensagem"
            : notification.type == "alert"
            ? "Alerta"
            : notification.type == "payment"
            ? "Pagamentos"
            : "Corrida"}
        </h1>
        <p className="text-sm text-gray-500">{notification.message}</p>
        <small className="">{notification.date}</small>
      </div>
    </figure>
  );
}
