export interface ILogin {
  telefone: string;
  password: string;
}

export interface IRequestReset {
  telefone: string;
}

export interface IResetPassword {
  token: string;
  password: string;
}