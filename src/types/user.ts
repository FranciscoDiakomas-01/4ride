
export default interface IUser {
  id: string | number
  fullname: string
  tel: string
  profile: string
  status?: "Activo" | "Desactivo" 
  points?: number
  cash ?: number
}


export type IUSerShow = Required<IUser>
