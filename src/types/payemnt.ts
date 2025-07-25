import IUser from "./user";

export interface IPayment {
  message: string;
  id: number | string;
  status: string;
  createdAt: `${number}, ${string}, ${number}`;
  amount: number;
  method: string;
  file: string;
  updatedAt?: string;
}

export interface PaymentDashBoard {
  message: string;
  id: number | string;
  status: string;
  createdAt: `${number}, ${string}, ${number}`;
  amount: number;
  method: string;
  file: string;
  user: IUser;
  updatedAt?: string;
}
