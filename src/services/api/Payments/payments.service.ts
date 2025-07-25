import server from "../server";

export default class PaymentService {
  constructor(private readonly token: string) {}
  public async createPayment(body: { amount: number; file: string }) {
    try {
      const response = await fetch(`${server}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: this.token,
        },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as {
        created: boolean;
        message: string;
      };
      return data;
    } catch (error) {
      console.error(error);
      return {
        message: "Erro ao criar pagamento",
        created: false,
      };
    }
  }
  public async getMyPayments() {
    try {
      const response = await fetch(`${server}/payments/me`, {
        headers: {
          "Content-Type": "application/json",
          token: this.token,
        },
      });
      const data = (await response.json()) as {
        message: string;
        found: boolean;
        data: any[];
      };
      console.log(data)
      return data;

    } catch (error) {
      console.log(error);
      return {
        found: false,
        message: "Erro ao pegar seus dados!",
        data: [] as any[],
      };
    }
  }
}
