import { IOrder } from '@/entities/IOrder';
import { httpClient } from './httpClient';
import { storageKeys } from '@/config/storageKeys';

export class OrdersService {
  static async getOrders() {
    const accessToken = localStorage.getItem(storageKeys.accessToken);

    const { data } = await httpClient.get<{ orders: IOrder[] }>('/orders', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    return data.orders;
  }
}
