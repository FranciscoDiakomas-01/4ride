import server from "../server";

interface Route {
  id: string;
  createdAt: string;
  updatedAt: string;
  expiredAt: string;
  from: string;
  to: string;
  x: any;
  y: any;
  status: string;
  users: string;
  way: string;
}
export default class RouteService {
  constructor(private readonly token: string) {}
  public async getAllActivesRoute() {
    try {
      const response = await fetch(`${server}/routes`, {
        headers: {
          "Content-Type": "application/json",
          token: this.token,
        },
      });
      const data = (await response.json()) as {
        message: string;
        fouded: boolean;
        routes: Route[];
      };
      return data;
    } catch (error) {
      console.log(error);
      return {
        fouded: false,
        message: "Erro ao pegar as rotas!",
        routes: [] as Route[],
      };
    }
  }
  public async createRoute(body: { from: string; to: string }) {
    try {
      const response = await fetch(`${server}/routes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: this.token,
        },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as {
        message: string;
        creaed: boolean;
        routeid: number;
      };
      return data;
    } catch (error) {
      console.log(error);
      return {
        creaed: false,
        message: "Erro ao pegar as rotas!",
        routeid: 0,
      };
    }
  }
  public async getRouteById(id: number) {
    try {
      const response = await fetch(`${server}/routes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token: this.token,
        },
      });
      const data = (await response.json()) as {
        message: string;
        founded: boolean;
        route: Route;
        users: any[];
      };
      return data;
    } catch (error) {
      return {
        founded: false,
        message: "Erro ao pegar as rotas!",
        route: {} as Route,
        users: [] as any[],
      };
    }
  }
  public async outInRoute(id: number) {
    try {
      const response = await fetch(`${server}/routes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: this.token,
        },
      });
      const data = (await response.json()) as {
        message: string;
        outed: boolean;
      };
      return data;
    } catch (error) {
      console.log(error)
      return {
        outed: false,
        message: "Erro ao sair da rotas!",
      };
    }
  }
}
