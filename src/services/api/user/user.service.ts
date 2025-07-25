import server from "../server";
import ICreateUser from "./dto/create-user.dto";
import { ILogin } from "./dto/login-user.dto";

export default class UserService {
  constructor(private readonly token: string) {}
  public async createAccount(body: ICreateUser) {
    try {
      const response = await fetch(`${server}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as {
        created: boolean;
        message: string;
        token: string;
        id: number;
        error: string;
        statusCode: number;
        role: string;
      };
      return data;
    } catch (error) {
      return {
        created: false,
        message: "Erro ao criar conta",
        token: "",
        role: "",
        id: "",
      };
    }
  }
  public async Login(body: ILogin) {
    try {
      const response = await fetch(`${server}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as {
        logged: boolean;
        message: string;
        token: string;
        id: number;
        role: string;
      };
      return data;
    } catch (error) {
      console.log(error);
      return {
        logged: false,
        message: "Erro ao criar conta",
        token: "",
        role: "",
        id: "",
      };
    }
  }
  public async GetMyData() {
    try {
      const response = await fetch(`${server}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          token: this.token,
        },
      });
      const data = (await response.json()) as {
        message: string;
        name: string;
        lastname: string;
        points: number;
        found: boolean;
        telefone: string;
      };
      return data;
    } catch (error) {
      console.log(error);
      return {
        name: "",
        lastname: "",
        telefone: "",
        points: 0,
        found: false,
        message: "Erro ao pegar seus dados!",
      };
    }
  }

  public async getAllUsers() {
    try {
      const response = await fetch(`${server}/users`, {
        headers: {
          "Content-Type": "application/json",
          token: this.token,
        },
      });
      const data = (await response.json()) as {
        message: string;
        users: any[];
        total: string
        confirmated: string
        pendings: string
      };
      return data;
    } catch (error) {
      console.log(error);
      return {
        message: "Erro ao pegar seus dados!",
        users: [] as any[],
        total: "0",
        confirmated: "0",
        pendings : "0"
      };
    }
  }
  public async updateProfile(body: { name: string; lastname: string }) {
    try {
      const response = await fetch(`${server}/users/name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: this.token,
        },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as {
        updated: boolean;
        message: string;
      };
      return data;
    } catch (error) {
      console.log(error);
      return {
        updated: false,
        message: "Erro ao actualizar os dados",
      };
    }
  }
  public async updateTelefone(body: { oldPhone: string; newPhone: string }) {
    try {
      const response = await fetch(`${server}/users/phone`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: this.token,
        },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as {
        updated: boolean;
        message: string;
      };
      return data;
    } catch (error) {
      console.log(error);
      return {
        updated: false,
        message: "Erro ao actualizar os dados",
      };
    }
  }
  public async updatePassword(body: {
    oldPassword: string;
    newPassword: string;
  }) {
    try {
      const response = await fetch(`${server}/users/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: this.token,
        },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as {
        updated: boolean;
        message: string;
      };
      return data;
    } catch (error) {
      console.log(error);
      return {
        updated: false,
        message: "Erro ao actualizar os dados",
      };
    }
  }
}
