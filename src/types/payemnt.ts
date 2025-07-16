import IUser from "./user";

export interface IPayment {
  message: string;
  id: number | string;
  status: "Pendente" | "Confirmado" | "Cancelado";
  createdAt: `${number}, ${string}, ${number}`;
  amount: number;
  method: "Express" | "Referência" | "Transferência";
  file: string;
}


export interface PaymentDashBoard {
  message: string;
  id: number | string;
  status: "Pendente" | "Confirmado" | "Cancelado";
  createdAt: `${number}, ${string}, ${number}`;
  amount: number;
  method: "Express" | "Referência" | "Transferência";
  file: string;
  user : IUser
}