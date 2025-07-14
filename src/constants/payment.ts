export default interface IPaymnt {
  id: number | string;
  status: "Pendente" | "Confirmado" | "Cancelado";
  date: string,
  amount: string
  method : "Express" | "Referência"
}
