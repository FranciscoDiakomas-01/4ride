"use client";

import Loader from "@/components/Loader";
import Notfound from "@/components/Notfound";
import NotificationCard from "@/components/NotificationCard";
import { mockNotifications } from "@/constants/notificatio";
import INotification from "@/types/notification";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Notification() {
  const [load, setLoad] = useState(true);
  const [notification, setNotification] =
    useState<INotification[]>(mockNotifications);

  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
  return (
    <main className="w-full flex flex-col gap-4">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold z-[95945]">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1>Notificações</h1>
      </span>

      {load ? (
        <div className="flex justify-center min-h-[70dvh] items-center scale-75">
          <Loader type="Spinner" />
        </div>
      ) : (
        <>
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
