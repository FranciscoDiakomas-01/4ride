export default interface INotification {
  createdAt: Date;
  id: number;
  message: string;
  read: boolean;
  title: string;
  type: "ALERT" | "PAYMENT" | "ROUTE";
  updatedAt: Date;
}