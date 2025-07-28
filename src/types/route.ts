export default interface IRoute {
  id: number | string;
  from: string;
  to: string;
  users: number;
  distance: string;
  date: string;
  status: string;
  isIn ?: boolean
}
