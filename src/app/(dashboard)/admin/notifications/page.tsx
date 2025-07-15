"use client";

import Loader from "@/components/Loader";
import Notfound from "@/components/Notfound";
import NotificationCard from "@/components/NotificationCard";
import { mockNotifications } from "@/constants/notificatio";
import INotification from "@/types/notification";
import { useEffect, useState } from "react";

export default function Notification() {
  const [load, setLoad] = useState(true);
  const [notification, setNotification] =
    useState<INotification[]>(mockNotifications);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
  return (
    <main className="w-full flex flex-col gap-4">
      {load ? (
        <div className="flex justify-center min-h-[70dvh] items-center scale-75">
          <Loader type="Spinner" />
        </div>
      ) : (
        <>
          <h1 className="font-semibold text-xl mt-4 px-3 text-primary">Notificações</h1>
          {Array.isArray(notification) && notification.length > 0 ? (
            <aside className="flex flex-col gap-6 px-3 pb-[180px] pt-3">
              {notification.map((item, key) => (
                <NotificationCard notification={item} key={key} />
              ))}
            </aside>
          ) : (
            <Notfound message="Ainda não possuí notificações" />
          )}
        </>
      )}
    </main>
  );
}
