import INotification from "@/types/notification";

export const mockNotifications: INotification[] = [
  {
    id: 1,
    message: "Seu pagamento foi processado com sucesso.",
    date: "12, Julho, 2025",
    type: "payment",
  },
  {
    id: 2,
    message: "Nova mensagem de Paulo Matias.",
    date: "12, Julho, 2025",
    type: "message",
  },
  {
    id: 3,
    message: "Sua corrida foi concluída.",
    date: "11, Julho, 2025",
    type: "ride",
  },
  {
    id: 4,
    message: "Saldo insuficiente para iniciar nova rota.",
    date: "11, Julho, 2025",
    type: "alert",
  },
  {
    id: 5,
    message: "Mensagem de suporte recebida.",
    date: "10, Julho, 2025",
    type: "message",
  },
  {
    id: 6,
    message: "Rota agendada para amanhã às 8h.",
    date: "10, Julho, 2025",
    type: "ride",
  },
  {
    id: 7,
    message: "Pagamento pendente detectado.",
    date: "9, Julho, 2025",
    type: "alert",
  },
  {
    id: 8,
    message: "Você recebeu um reembolso.",
    date: "9, Julho, 2025",
    type: "payment",
  },
  {
    id: 9,
    message: "Corrida cancelada pelo motorista.",
    date: "8, Julho, 2025",
    type: "ride",
  },
  {
    id: 10,
    message: "Bem-vindo à plataforma 4Ride!",
    date: "7, Julho, 2025",
    type: "alert",
  },
];
