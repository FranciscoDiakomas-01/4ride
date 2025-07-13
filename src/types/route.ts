export default interface IRoute {
  id: number | string;
  from: string;
  to: string;
  users: number;
  distance: string;
  date: `${number} , ${string} , ${number}`
  status : "Aberta" | "Fechada" | "Cancelada"
}
