import { httpClient } from './httpClient';

interface IOrder {
  id: string;
  orderNumber: string;
  date: number;
}

export class OrdersService {
  static async getOrders() {
    const { data } = await httpClient.get<{ orders: IOrder[] }>('/orders');
    return data.orders;
  }
}
