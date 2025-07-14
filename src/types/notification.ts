export default interface INotification {
  id: number | string;
  message: string;
  date: `${number}, ${string}, ${number}`;
  type: "alert" | "message" | "payment" | "ride";
}