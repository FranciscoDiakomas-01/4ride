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
              "bg-amber-200/20 border-amber-400": notification.type == "ALERT",
            },
            {
              "bg-indigo-200/20 border-indigo-400":
                notification.type == "ROUTE",
            },
            {
              "bg-blue-200/20 border-blue-400": notification.type == "PAYMENT",
            }
          )}
        >
          {notification.type == "ROUTE" ? (
            <Car className="text-indigo-800" />
          ) : notification.type == "ALERT" ? (
            <AlertCircle className="text-red-500" />
          ) : notification.type == "PAYMENT" ? (
            <CreditCard className="text-blue-500" />
          ) : null}
        </Badge>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-md font-semibold">
          {" "}
          {notification.type == "ROUTE"
            ? "Mensagem"
            : notification.type == "ALERT"
            ? "Alerta"
            : notification.type == "PAYMENT"
            ? "Pagamentos"
            : "Corrida"}
        </h1>
        <h1 className="text-xl text-gray-900 font-semibold">
          {notification.title}
        </h1>
        <p className="text-sm text-gray-500">{notification.message}</p>
        <small className="">
          {new Date(notification.createdAt).toDateString()}
        </small>
      </div>
    </figure>
  );
}
