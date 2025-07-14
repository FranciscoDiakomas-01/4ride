export interface IPayment {
  message: string;
  id: number | string;
  status: "Pendente" | "Confirmado" | "Cancelado";
  createdAt: `${number}, ${string}, ${number}`;
  amount: number
  method : "Express"| "Referência" | "Transferência"
}
