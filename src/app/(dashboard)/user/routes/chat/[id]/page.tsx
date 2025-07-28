"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import UserService from "@/services/api/user/user.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, LogOut } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Loader from "@/components/Loader";
import RouteService from "@/services/api/Route/route.service";
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

  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [me, setMe] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedTaxi, setSelectedTaxi] = useState("Yango");
  const [load, setLoad] = useState(true);
  const taxis = [
    {
      to: "https://yango.com/pt_ao/lp/carinvest/?gad_campaignid=22062077173",
      name: "Yango",
    },
    {
      to: "https://indrive.com/",
      name: "InDrive",
    },
    {
      to: "https://www.heetch.com/pt/pays/angola",
      name: "Heetch",
    },
    {
      to: "https://bolt.eu/pt-ao/",
      name: "Bolt",
    },
  ];

  const groupId = Number(id);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (!token || !userId) {
      toast.error("Você deve estar logado");
      localStorage.clear();
      router.push("/");
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

    const socket = io("https://rouride-backend.onrender.com/", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socketRef.current.on("connect", () => {
      socket.emit("join_group", { groupId, userId }, (response: any) => {
        console.table(response);
        setMessages(response.messages || []);
        setLoad(false);
      });
    });

    socketRef.current.on("force_disconnect", (data: any) => {
      toast.error(data.status ?? data.message ?? "Acesso negado à rota.");
      setTimeout(() => {
        router.push("/user/routes");
      }, 2000);
    });
    socket.on("new_message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("route_ended", (data: any) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      if (socketRef.current) {
        socket.disconnect();
        socketRef.current = null;
      }
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
        name: me.name,
        lastname: me.lastname,
      },
    });

    setInput("");
  };

  return (
    <div className="flex flex-col h-[85dvh]">
      {load ? (
        <div className="w-full flex flex-col justify-center items-center min-h-[50dvh] scale-75">
          <Loader type="Spinner" />
        </div>
      ) : (
        <>
          <header className="p-1 flex gap-2">
            <Button
              onClick={() => {
                router.push(`/user/routes/${id}`);
              }}
            >
              Detalhes
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"}>
                  <LogOut />
                  Sair
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>🚪 Deseja sair da rota?</DialogTitle>
                  <DialogDescription className="my-4">
                    Antes de sair, lembre-se:
                  </DialogDescription>

                  <ol className="flex flex-col gap-4 text-primary/80 text-sm text-start list-disc list-inside ">
                    <li>
                      O valor já descontado ao entrar não será reembolsado.
                    </li>
                    <li>
                      Esta ação apenas encerra sua participação na rota atual.
                    </li>
                    <li>
                      Você poderá entrar novamente, mas será descontado
                      novamente se ainda não estiver ativo na rota no momento da
                      nova entrada.
                    </li>
                  </ol>
                </DialogHeader>
                <DialogFooter className="grid-cols-2 grid gap-3 w-full">
                  <Button
                    variant={"outline"}
                    onClick={async () => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        toast.error("Você deve estar logado");
                        router.push("/");

                        return;
                      }
                      const service = new RouteService(token);
                      const res = await service.outInRoute(Number(id));
                      if (res.outed) {
                        toast.success(res.message ?? "Até breve!");
                        setTimeout(() => {
                          router.push("/user/routes");
                        }, 1000);
                        return;
                      } else {
                        toast.error(res.message ?? "Erro ao sair da rota!");
                      }
                    }}
                  >
                    Sair da rota
                  </Button>
                  <DialogClose asChild>
                    <Button className="">Cancelar</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </header>
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

              const rawDate = msg.createdAt
                ? new Date(msg.createdAt)
                : new Date();
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
          <div className="p-4 border-t bg-white  gap-2 flex md:flex-row flex-col">
            <Input
              className="flex-1 border rounded px-4 py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Digite sua mensagem..."
            />
            <div className="grid grid-cols-2 gap-2">
              <Button
                className="bg-primary w-full text-white px-4 py-2 rounded"
                onClick={sendMessage}
              >
                Enviar
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"outline"} className="w-full">
                    Chamar Táxi
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle> Escolha o serviço de táxi</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      socketRef.current &&
                        socketRef.current.emit(
                          "end_route",
                          {
                            groupId,
                            userid: me.id,
                            name: `${me.name} ${me.lastname}`,
                            taxi: selectedTaxi,
                          },
                          (response: any) => {
                            if (response.status == "Finalizada") {
                              toast.success(
                                "Você será redirecionado para o " + selectedTaxi
                              );
                              const a = document.createElement("a");
                              const activedLink = taxis.find((item) => {
                                return item && item.name == selectedTaxi;
                              });
                              setTimeout(() => {
                                if (activedLink?.to) {
                                  window.open(
                                    activedLink.to,
                                    "_blank",
                                    "noopener,noreferrer"
                                  );
                                }
                              }, 2000);
                            } else {
                              toast.error("Erro ao finalizar a Rota");
                              return;
                            }
                          }
                        );
                    }}
                  >
                    <RadioGroup
                      defaultValue={selectedTaxi}
                      onValueChange={setSelectedTaxi}
                      className="grid gap-4 grid-cols-2"
                    >
                      {taxis.map((taxi) => (
                        <label
                          key={taxi.name}
                          className="flex items-center gap-4 border p-2 rounded-xl cursor-pointer hover:shadow-md transition duration-200"
                        >
                          <RadioGroupItem value={taxi.name} id={taxi.name} />

                          <span className="font-medium">{taxi.name}</span>
                        </label>
                      ))}
                    </RadioGroup>

                    <DialogFooter className="mt-4">
                      <DialogClose asChild>
                        <Button variant="outline" type="button">
                          Cancelar
                        </Button>
                      </DialogClose>
                      <Button type="submit" disabled={processing}>
                        {processing ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>Chamar táxi</>
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
