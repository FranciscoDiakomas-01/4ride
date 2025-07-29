import server from "../server";

export default class NotifiCationService {
  constructor(private readonly token: string) {}
  public async getMyNotifications() {
     try {
       const response = await fetch(`${server}/notifications`, {
         headers: {
           "Content-Type": "application/json",
           token: this.token,
         },
       });
       const data = (await response.json()) as { notifications: [] };
       return data?.notifications ?? [];
     } catch (error) {
       return []
     }
  }
  public async getMyotificationCouter() {
    try {
      const response = await fetch(`${server}/notifications/counter`, {
        headers: {
          "Content-Type": "application/json",
          token: this.token,
        },
      });
      const data = (await response.json()) as { notifications: number };
      return data?.notifications ?? 0;
    } catch (error) {
      return 0;
    }
  }
}
