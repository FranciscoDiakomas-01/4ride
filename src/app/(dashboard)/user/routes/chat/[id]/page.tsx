"use client";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/constants/users";
import { IChat } from "@/types/chat";
import IUser from "@/types/user";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RouteChat() {
  const [chat, setChat] = useState<IChat[]>([]);
  const [load, setLoad] = useState(true);
  const users = mockUsers as IUser[];
  const router = useRouter();
  useEffect(() => {
    setChat([
      {
        user: users[0],
        message: "Olá, tudo bem?",
        date: "2025-07-14 08:30",
        senderId: "1",
      },
      {
        user: users[1],
        message: "Sim, e contigo?",
        date: "2025-06-12 08:31",
        senderId: "2",
      },
      {
        user: users[0],
        message: "Tudo ótimo, indo para Viana agora.",
        date: "2025-07-12 08:32",
        senderId: "1",
      },
      {
        user: users[2],
        message: "Boa viagem!",
        date: "2025-07-12 08:33",
        senderId: "3",
      },
      {
        user: users[1],
        message: "Vamos nos encontrar no ponto combinado?",
        date: "2025-07-12 08:35",
        senderId: "2",
      },
      {
        user: users[0],
        message: "Sim, estarei lá às 9h.",
        date: "2025-07-12 08:36",
        senderId: "1",
      },
      {
        user: users[2],
        message: "Levo mais alguém no carro?",
        date: "2025-07-12 08:37",
        senderId: "3",
      },
      {
        user: users[1],
        message: "Pode ser, o João também vai.",
        date: "2025-07-12 08:38",
        senderId: "2",
      },
      {
        user: users[0],
        message: "Perfeito! Partimos juntos então.",
        date: "2025-07-12 08:39",
        senderId: "1",
      },
      {
        user: users[2],
        message: "Fechado!",
        date: "2025-07-12 08:40",
        senderId: "3",
      },
    ]);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
  const myId = "1";
  return (
    <main className="flex flex-col gap-4 pb-45 ">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold z-[95945]">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1>Conversas</h1>
      </span>
      <span>
        {load ? (
          <div className="w-full scale-75 flex justify-center items-center h-[80dvh]">
            <Loader type="Spinner" />
          </div>
        ) : (
          <span className="px-2 flex flex-col gap-10">
            {Array.isArray(chat) &&
              chat.length > 0 &&
              chat.map((item, index) => (
                <Message
                  message={{
                    date: item.date,
                    message: item.message,
                    type: myId == item.senderId ? "my" : "other",
                  }}
                  user={item.user}
                  key={index}
                />
              ))}
          </span>
        )}
      </span>
      <form
        action=""
        className="fixed shadow bg-white h-15 items-center overflow-hidden left-0 p-2 bottom-20 gap-2 flex z-4 w-full"
      >
        <textarea
          placeholder="Degite qualquer coisa"
          className="resize-none h-full w-full border px-4 py-1 text-primary rounded-full"
        />
        <Button>
          <Send />
        </Button>
      </form>
    </main>
  );
}
