"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import UserService from "@/services/api/user/user.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Notification {
  message: string;
  timestamp: string;
}

interface Message {
  id: number;
  message: string;
  createdAt: string | Date;
  senderid: number;
  User?: {
    name: string;
    lastname: string;
  };
}

export default function GroupChat() {
  const { id } = useParams();
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [me, setMe] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const groupId = Number(id);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (!token || !userId) {
      toast.error("Você deve estar logado");
      localStorage.clear();
      router.push("/login");
      return;
    }

    const service = new UserService(token);

    async function fetchMe() {
      try {
        const user = await service.GetMyData();
        setMe(user);
      } catch (error) {
        toast.error("Erro ao buscar usuário.");
      }
    }

    fetchMe();

    if (!groupId) return;

    const socket = io("http://localhost:8080", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.emit("join_group", { groupId, userId }, (response: any) => {
      if (response.status === "joined") {
        setMessages(response.messages || []);
      }
    });

    socket.on("new_message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("notification", (data: Notification) => {
      toast.info(`📢 ${data.message}`);
    });

    socket.on("route_ended", (data: Notification) => {
      toast.info(`❌ ${data.message}`);
      socket.disconnect();
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [groupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current || !me) return;

    socketRef.current.emit("send_message", {
      groupId,
      userId: me.id,
      message: input.trim(),
      User: {
        name : me.name,
        lastname : me.lastname
      }
    });

    setInput("");
  };

  return (
    <div className="flex flex-col h-[85dvh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => {
          const key = msg?.id || `${msg?.senderid || "local"}-${index}`;
          const isMine = msg.senderid === me?.id;
          const senderName = `${msg?.User?.name ?? ""} ${
            msg?.User?.lastname ?? ""
          }`;
          const senderInitials = `${msg?.User?.name?.[0] ?? ""}${
            msg?.User?.lastname?.[0] ?? ""
          }`.toUpperCase();

          const rawDate = msg.createdAt ? new Date(msg.createdAt) : new Date();
          const formattedDate = !isNaN(rawDate.getTime())
            ? rawDate.toLocaleDateString()
            : "";
          const formattedTime = !isNaN(rawDate.getTime())
            ? rawDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return (
            <div
              key={key}
              className={`flex items-start gap-2 mb-4 ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              {!isMine && (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full font-bold text-sm">
                    {senderInitials}
                  </div>
                </div>
              )}

              <div
                className={`max-w-xs text-sm ${
                  isMine ? "text-right" : "text-left"
                }`}
              >
                {!isMine && (
                  <div className="mb-1">
                    <div className="text-xs font-semibold text-gray-700">
                      {senderName}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {formattedDate} às {formattedTime}
                    </div>
                  </div>
                )}

                <div
                  className={`p-3 rounded-lg ${
                    isMine
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.message}
                  {isMine && (
                    <div className="text-[10px] text-white opacity-70 mt-1">
                      {formattedTime}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-2 border-t bg-white flex gap-2">
        <Input
          className="flex-1 border rounded px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Digite sua mensagem..."
        />
        <div className="flex gap-3">
          <Button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={sendMessage}
          >
            Enviar
          </Button>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              router.push(`user/routes/cancel/${Number(id)}`)
            }}
          >
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  );
}
