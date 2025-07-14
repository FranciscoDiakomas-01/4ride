import IUser from "./user";

export interface IChat {
  user: IUser;
  message: string;
  date: string;
  senderId: string;
}

export interface IMessage {
  message: string;
  date: string;
  type: "my" | "other";
}
