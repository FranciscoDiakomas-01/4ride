
export default interface IUser {
  id: string | number;
  name: string;
  lastname: string;
  telefone: string;
  points?: number;
}


export type IUSerShow = Required<IUser>
