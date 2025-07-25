export default interface INotification {
  createdAt: Date;
  id: number;
  message: string;
  read: boolean;
  title: string;
  type: string;
  updatedAt: Date;
  date ?: string
}